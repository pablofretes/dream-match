'use client';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NameChanger({ teamName, closeModal }: { teamName: string; closeModal: () => void }) {
  const router = useRouter();
  const [name, setName] = useState(teamName);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.patch(`http://localhost:3000/api/teams?name=${teamName}`, { newName: name });
    if (res.status === 200) {
      closeModal();
      router.refresh();
      //TODO - fix this hack
      location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center p-4 bg-gray-100 rounded shadow-lg">
        <input
          placeholder={teamName}
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="mb-4 px-3 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="px-4 py-2 mb-4 font-semibold text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          type="submit"
        >
          Aceptar
        </button>
      </div>
    </form>
  );
}
