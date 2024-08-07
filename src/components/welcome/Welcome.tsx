import Link from 'next/link';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white text-center flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">¡Bienvenido a ATC Dream Match!</h1>
      <p className="text-lg md:text-xl lg:text-2xl text-black mb-6">
        Crea el partido de tus sueños con tus jugadores favoritos
      </p>
      <Link
        key="Teams"
        href="/teams"
        className="px-6 py-3 font-semibold text-white bg-violet-800 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Ve a tus Equipos
      </Link>
    </div>
  );
}
