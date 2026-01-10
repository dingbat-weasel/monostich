'use client';
import type { Tables } from '@/types/database.types';
import { useState } from 'react';
import Tile from './Tile';

type tile = Pick<Tables<'tiles'>, 'id' | 'text'>;

interface PoemCreatorProps {
  tiles: tile[];
}

export default function PoemCreator({ tiles }: PoemCreatorProps) {
  const [tilesOnFridge, setTilesOnFridge] = useState<tile[]>(tiles);
  const [selectedTiles, setSelectedTiles] = useState<tile[]>([]);

  function handleAddtile(tile: tile) {
    // remove from fridge
    const updatedTilesOnFridge = tilesOnFridge.filter(
      (tileOnFridge) => tileOnFridge.id !== tile.id
    );
    setTilesOnFridge(updatedTilesOnFridge);

    // add to staging
    setSelectedTiles([...selectedTiles, tile]);
  }

  function handleRemovetile(tile: tile) {
    // remove from staging
    const updatedSelectedTiles = selectedTiles.filter(
      (selectedTile) => selectedTile.id !== tile.id
    );
    setSelectedTiles(updatedSelectedTiles);

    // return to fridge
    setTilesOnFridge([...tilesOnFridge, tile]);
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
          {selectedTiles.map((selectedTile) => (
            <Tile
              key={selectedTile.id}
              tile={selectedTile}
              onClickHandler={() => handleRemovetile(selectedTile)}
            />
          ))}
        </div>
        <div className='flex flex-wrap p-4 gap-2 bg-slate-300 min-h-72 rounded-lg'>
          Fridge
          {tilesOnFridge?.map((tile) => (
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
