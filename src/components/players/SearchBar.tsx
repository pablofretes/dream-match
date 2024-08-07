'use client';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import { fetchPlayer } from '@/lib/data';
import { Player } from '@/interfaces/players';

interface SearchBarProps {
  setPlayers: (players: Player[]) => void;
}

export default function SearchBar({ setPlayers }: SearchBarProps) {
  function filterObjectsWithSameId(objects: Player[]): Player[] {
    const seenIds = new Set<string>();
    const uniqueObjects: Player[] = [];

    objects.forEach((obj) => {
      if (!seenIds.has(obj.id)) {
        seenIds.add(obj.id);
        uniqueObjects.push(obj);
      }
    });

    return uniqueObjects;
  }

  const handleSearch = useCallback(
    debounce(async (searchName: string) => {
      const results = await fetchPlayer(searchName);
      const players = filterObjectsWithSameId(results);
      setPlayers(players);
    }, 500),
    [fetchPlayer]
  );

  return (
    <input
      type="text"
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Buscar..."
      className="p-2 border rounded w-full"
    />
  );
}
