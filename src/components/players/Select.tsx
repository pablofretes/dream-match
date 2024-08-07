'use client';
import Image from 'next/image';
import placeholderImage from './assets/placeholder.jpg';
import axios from 'axios';
import { useState } from 'react';
import { Player } from '@/interfaces/players';
import { useRouter } from 'next/navigation';

interface Option {
  value: string;
  label: string;
  img: string;
  id: string;
}

interface SelectProps {
  options: Option[];
  teamName: string;
  closeModal: () => void;
}

export default function Select({ options, teamName, closeModal }: SelectProps) {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);

  const handleCheckboxChange = (option: Option) => {
    const MAX_PLAYERS = 5;
    if (players.length === MAX_PLAYERS) return;
    if (players.length + 1 > 6) return;
    setPlayers((prevPlayers) => {
      if (prevPlayers.find((player) => player.id === option.id)) {
        return prevPlayers.filter((player) => player.id !== option.id);
      } else {
        return [...prevPlayers, { name: option.label, id: option.id, img: option.img }];
      }
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const MAX_PLAYERS = 5;
    const MIN_PLAYERS = 1;
    if (players.length < MIN_PLAYERS) return;
    if (players.length > MAX_PLAYERS) return;
    const res = await axios.patch(`/api/teams?name=${teamName}`, { players });
    if (res.status === 200) {
      if (res.data.areTeamsFull) {
        router.push('/congratulations');
      } else {
        closeModal();
        router.refresh();
        //TODO - fix this hack
        location.reload();
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <ul
          id="select"
          className="block max-h-48 overflow-y-auto w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          {options.map((option) => (
            <li
              key={option.id}
              value={option.value}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(option)}
                className="mr-2"
                checked={players.some((player) => player.id === option.id)}
              />
              <Image
                src={option?.img || placeholderImage}
                width={20}
                height={20}
                alt={''}
                className="w-6 h-6 rounded-full mr-2"
              />
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Guardar
      </button>
    </form>
  );
}
