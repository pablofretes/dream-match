'use client';
import React, { useState } from 'react';
import NameChanger from './NameChanger';

export default function NameChangeModal({ teamName }: { teamName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Cambiar Nombre
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Cambiar Nombre</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <NameChanger teamName={teamName} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
