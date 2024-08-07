import axios from 'axios';

export async function fetchPlayer(name: string) {
  try {
    if (!name || name.length < 4) {
      return [];
    }
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    const players = await axios.get(
      `https://apiv3.apifootball.com/?action=get_players&APIkey=${apikey}&player_name=${name}`
    );
    if (!players.data || players?.data?.length === 0 || players.data.error) {
      return [];
    }
    const data = players.data.map((player: any) => {
      return {
        id: player.player_key,
        name: player.player_name,
        number: player.player_number,
        img: player.player_image,
      };
    });
    const LIMIT = 25;
    data.length = LIMIT;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
