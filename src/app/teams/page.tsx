import Teams from '@/components/teams/Teams';
import TeamsSkeleton from '@/components/teams/TeamsSkeleton';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function TeamsPage() {
  return (
    <div>
      {/* <Suspense fallback={<TeamsSkeleton />}> */}
      <Teams />
      {/* </Suspense> */}
    </div>
  );
}
