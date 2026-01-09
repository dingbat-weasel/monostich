'use client';
import type { Tables } from '@/types/database.types';
import { useState } from 'react';
import Tile from './Tile';

type Word = Pick<Tables<'words'>, 'id' | 'text'>;

interface PoemCreatorProps {
  words: Word[];
}

export default function PoemCreator({ words }: PoemCreatorProps) {
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);

  function handleAddWord(word: Word) {
    setSelectedWords([...selectedWords, word]);
  }

  function handleRemoveWord(word: Word) {
    // const updatedSelectedWordIds = selectedWordIds.filter()
    // setSelectedWordIds(selectedWordIds);
  }

  return (
    <>
      <p className='text-muted-foreground'>
        Database connection successful. Found {words?.length} words:
      </p>
      <div className='flex flex-wrap gap-2'></div>
      <div className='grid grid-cols-1 gap-6'>
        <div className='min-h-20 bg-slate-300 border flex flex-wrap gap-2 p-4 rounded-lg'>
          Staging
          {selectedWords.map((selectedWord) => (
            <Tile key={selectedWord.id} word={selectedWord} />
          ))}
        </div>
        <div className='flex flex-wrap p-4 gap-2 bg-slate-300 min-h-72 rounded-lg'>
          Fridge
          {words?.map((word) => (
            <Tile
              word={word}
              key={word.id}
              onClickHandler={() => handleAddWord(word.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
