'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface DeleteTeamProps {
  teamName: string;
}

export default function DeleteTeam({ teamName }: DeleteTeamProps) {
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.delete(`/api/teams?name=${teamName}`);
    if (res.status === 200) {
      router.refresh();
      //TODO - fix this hack
      location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        className="px-4 py-2 mb-4 font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        type="submit"
      >
        Eliminar Equipo
      </button>
    </form>
  );
}
