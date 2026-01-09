'use client';
import type { Tables } from '@/types/database.types';
import { useState } from 'react';
import Tile from './Tile';

type tile = Pick<Tables<'tiles'>, 'id' | 'text'>;

interface PoemCreatorProps {
  tiles: tile[];
}

export default function PoemCreator({ tiles }: PoemCreatorProps) {
  const [selectedtiles, setSelectedtiles] = useState<tile[]>([]);

  function handleAddtile(tile: tile) {
    setSelectedtiles([...selectedtiles, tile]);
  }

  function handleRemovetile(tile: tile) {
    // const updatedSelectedtileIds = selectedtileIds.filter()
    // setSelectedtileIds(selectedtileIds);
  }

  return (
    <>
      <p className='text-muted-foreground'>
        Database connection successful. Found {tiles?.length} tiles:
      </p>
      <div className='flex flex-wrap gap-2'></div>
      <div className='grid grid-cols-1 gap-6'>
        <div className='min-h-20 bg-slate-300 border flex flex-wrap gap-2 p-4 rounded-lg'>
          Staging
          {selectedtiles.map((selectedtile) => (
            <Tile key={selectedtile.id} tile={selectedtile} />
          ))}
        </div>
        <div className='flex flex-wrap p-4 gap-2 bg-slate-300 min-h-72 rounded-lg'>
          Fridge
          {tiles?.map((tile) => (
            <Tile
              tile={tile}
              key={tile.id}
              onClickHandler={() => handleAddtile(tile)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
