import CreateTeam from '@/components/teams/team/CreateTeam';

export default async function CreateTeamPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Ingresá el Nombre de tu Equipo para Crearlo</h1>
        <CreateTeam />
      </div>
    </div>
  );
}
