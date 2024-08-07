import { HttpStatusCode } from 'axios';
import connectMongo from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import Teams from '@/models/teams/team.model';
import { Team } from '@/interfaces/team';
import { Player } from '@/interfaces/players';

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const teams = await Teams.find({});
    const MAX_TEAMS = 2;
    if (teams.length === MAX_TEAMS)
      return NextResponse.json(
        { message: 'max amount of teams reached', success: false },
        { status: HttpStatusCode.BadRequest }
      );
    if (body.name) {
      const team = await Teams.create({ name: body.name });
      return NextResponse.json(
        { data: team, message: 'Your team has been created', success: true },
        { status: HttpStatusCode.Created }
      );
    }
    return NextResponse.json(
      { message: 'team name is missing', success: false },
      { status: HttpStatusCode.BadRequest }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'internal server error', success: false },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const { players, newName } = body;
    if (name && newName) {
      const team = await Teams.findOneAndUpdate({ name }, { $set: { name: newName } }, { new: true });
      return NextResponse.json(
        { data: team, message: 'Your team name has been updated', success: true },
        { status: HttpStatusCode.Ok }
      );
    }
    if (name && players) {
      const foundTeams = await Teams.find({});
      const foundTeam = await Teams.findOne({ name });
      const adversaryPlayers = foundTeams.find((team: Team) => team.name !== name).players;
      const idsPlayers = players.map((p: Player) => p.id.toString());
      const duplicates = adversaryPlayers.filter((p: Player) => idsPlayers.includes(p.id));
      const MAX_PLAYERS = 5;
      if (duplicates.length > 0) {
        return NextResponse.json(
          { message: 'no duplicates allowed', success: false },
          { status: HttpStatusCode.BadRequest }
        );
      }
      if (foundTeam.players.length + players.length > MAX_PLAYERS) {
        return NextResponse.json(
          { message: 'max amount of players reached', success: false },
          { status: HttpStatusCode.BadRequest }
        );
      }
      const team = await Teams.findOneAndUpdate({ name }, { $push: { players } }, { new: true });
      const MAX_TEAMS = 2;
      const adversaryAmount = foundTeams.find((team: Team) => team.name !== name).players.length;
      const areTeamsFull =
        foundTeams.length === MAX_TEAMS && adversaryAmount === MAX_PLAYERS && team.players.length === MAX_PLAYERS;
      return NextResponse.json(
        { data: team, message: 'Your player has been added to your team', success: true, areTeamsFull },
        { status: HttpStatusCode.Ok }
      );
    }
    return NextResponse.json({ message: 'missing arguments', success: false }, { status: HttpStatusCode.BadRequest });
  } catch (error) {
    return NextResponse.json(
      { message: 'internal server error', success: false },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function GET() {
  try {
    await connectMongo();
    const teams = await Teams.find({});
    return NextResponse.json({ data: teams, message: 'Teams found!', success: false }, { status: HttpStatusCode.Ok });
  } catch (error) {
    return NextResponse.json(
      { data: null, message: 'internal server error', success: false },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectMongo();
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    await Teams.deleteOne({ name: name });
    return NextResponse.json({ data: true, message: 'Teams found!', success: false }, { status: HttpStatusCode.Ok });
  } catch (error) {
    return NextResponse.json(
      { data: null, message: 'internal server error', success: false },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
