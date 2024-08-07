import SearchBar from './SearchBar';
import Dropdown from './Dropdown';
import { Player } from '@/interfaces/players';
import { useState } from 'react';

interface PlayersProps {
  teamName: string;
  teamPlayers: Player[];
  closeModal: () => void;
}

export default function Players({ teamName, closeModal, teamPlayers }: PlayersProps) {
  const [players, setPlayers] = useState<Player[]>(teamPlayers);
  return (
    <div className="max-w-lg mx-auto mt-10">
      <SearchBar setPlayers={setPlayers} />
      {players.length > 0 && <Dropdown players={players} teamName={teamName} closeModal={closeModal} />}
    </div>
  );
}
