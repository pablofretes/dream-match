import NameChangeModal from './NameChangeModal';
import DeleteTeam from './DeleteTeam';
import { Player } from '@/interfaces/players';
import Image from 'next/image';
import AddPlayerModal from '@/components/players/AddPlayerModal';
import placeholderImage from '@/components/players/assets/placeholder.jpg';

interface TeamProps {
  name: string;
  players: Player[];
  isLeftSide: boolean;
}

export default function Team({ name, players, isLeftSide }: TeamProps) {
  const MAX_PLAYERS = 5;
  const MIN_PLAYERS = 1;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <div className={`team ${isLeftSide ? 'left-team' : 'right-team'} p-4 bg-gray-100 rounded-lg shadow-md`}>
        <h2 className="text-xl font-semibold mb-3">{name}</h2>
        <div className="players space-y-2">
          {players.length >= MIN_PLAYERS &&
            players.map((player, index) => (
              <div key={index} className="player flex items-center space-x-2">
                <Image
                  width={20}
                  height={20}
                  src={player?.img || placeholderImage}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-base">{player.name}</p>
              </div>
            ))}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {players.length < MAX_PLAYERS && <AddPlayerModal teamName={name} players={players} />}
          <NameChangeModal teamName={name} />
          <DeleteTeam teamName={name} />
        </div>
      </div>
    </div>
  );
}
