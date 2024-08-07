'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export default function CreateTeam() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:3000/api/teams', { name });
    if (res.status === 201) {
      const MAX_TEAMS = 2;
      if (res.data.items === MAX_TEAMS) {
        router.push('/congratulations');
      } else {
        router.push('/teams');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center p-4 bg-white-100 rounded rounded">
        <input
          placeholder={name}
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="mb-4 px-3 py-2 w-1/2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="px-4 py-2 mb-4 font-semibold text-white bg-violet-800 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          type="submit"
        >
          Crear Equipo
        </button>
      </div>
    </form>
  );
}
