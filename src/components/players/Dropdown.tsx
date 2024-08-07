import Select from './Select';
import { Player } from '@/interfaces/players';

interface DropdownProps {
  players: Player[];
  teamName: string;
  closeModal: () => void;
}

export default function Dropdown({ players, teamName, closeModal }: DropdownProps) {
  const options = players?.map((player: Player) => {
    return {
      value: player.name,
      label: player.name,
      img: player.img,
      id: player.id,
      number: player.id,
    };
  });
  return <>{players && <Select options={options} teamName={teamName} closeModal={closeModal} />}</>;
}
