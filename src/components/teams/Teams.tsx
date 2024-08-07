'use client';
import { Team as TeamInterface } from '@/interfaces/team';
import Team from './team/Team';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useRouter } from 'next/navigation';

export default function Teams() {
  const router = useRouter();
  const { data, error } = useSWR('/api/teams', fetcher);

  if (error) return <div>failed to load</div>;
  if (data && data?.data?.length === 0) {
    router.push('/teams/create');
  }

  return (
    <div className="flex flex-col space-y-4 p-4 max-w-2xl mx-auto">
      {data && data?.data?.length === 1 && (
        <>
          <Team
            key={data?.data[0]?.name}
            name={data?.data[0]?.name}
            players={data?.data[0]?.players}
            isLeftSide={true}
          />
          <Link
            key="Create Team"
            href="/teams/create"
            className="px-4 py-2 mb-4 font-semibold text-white bg-violet-800 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <p className="hidden md:block">Crear Equipo</p>
          </Link>
        </>
      )}
      {data &&
        data?.data?.length === 2 &&
        data?.data?.map((team: TeamInterface) => (
          <Team key={team?.name} name={team?.name} players={team?.players} isLeftSide={true} />
        ))}
    </div>
  );
}
