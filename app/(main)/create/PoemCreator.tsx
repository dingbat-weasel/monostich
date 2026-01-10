'use client';
import type { Tables } from '@/types/database.types';
import { useState } from 'react';
import Tile from './Tile';
import { Button } from '@/components/ui/button';

type Tile = Pick<Tables<'tiles'>, 'id' | 'text'>;

interface PoemCreatorProps {
  tiles: Tile[];
}

export default function PoemCreator({ tiles }: PoemCreatorProps) {
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);

  // whats in selectedTiles? everything else on the fridge
  const tilesOnFridge = tiles.filter(
    (tile) => !selectedTiles.some((selected) => selected.id === tile.id)
  );

  function handleAddTile(tile: Tile) {
    setSelectedTiles([...selectedTiles, tile]);
  }

  function handleRemoveTile(tile: Tile) {
    setSelectedTiles(selectedTiles.filter((t) => t.id !== tile.id));
  }

  function handleReset() {
    setSelectedTiles([]);
  }

  function handleSubmit() {
    const payload = selectedTiles;
    console.log(payload);
  }

  return (
    <>
      <p className='text-muted-foreground'>
        Database connection successful. Found {tiles?.length} tiles:
      </p>
      <div className='grid grid-cols-1 gap-6'>
        <div className='grid grid-cols-1 gap-4 min-h-20 bg-slate-300 border p-4 rounded-lg'>
          <div className='flex flex-wrap gap-2 border rounded-2xl items-center p-4 min-h-15'>
            {selectedTiles.map((selectedTile) => (
              <Tile
                key={selectedTile.id}
                tile={selectedTile}
                onClickHandler={() => handleRemoveTile(selectedTile)}
              />
            ))}
          </div>
          <div className='flex justify-between px-2'>
            <Button onClick={handleReset} variant={'destructive'}>
              Reset
            </Button>
            <Button onClick={handleSubmit} variant={'default'}>
              Submit
            </Button>
          </div>
        </div>
        <div className='flex flex-wrap p-4 gap-2 bg-slate-300 min-h-72 rounded-lg'>
          {tilesOnFridge?.map((tile) => (
            <Tile
              tile={tile}
              key={tile.id}
              onClickHandler={() => handleAddTile(tile)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
