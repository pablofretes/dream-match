import Image from 'next/image';
import React from 'react';

export default function CongratulationsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center text-black">
        <h1 className="text-4xl font-bold mb-4">¡Felicitaciones!</h1>
        <p className="text-2xl">Creaste tus Equipos Soñados!</p>
        <div className="mt-6">
          <Image
            width={350}
            height={350}
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnd2MWcyM3A3OTBvaGJvaHhqbmZkcjRnaXAyY3A1aDZrcG5oMGI4bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2SqiOMQxG82Gto4M/giphy.gif"
            alt="Confetti GIF"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
