import { Tables } from '@/types/database.types';
interface TileProps {
  word: Pick<Tables<'words'>, 'id' | 'text'>;
  onClickHandler?: () => void;
}

export default function Tile({ word, onClickHandler }: TileProps) {
  return (
    <div
      id={word.id}
      onClick={onClickHandler}
      className='px-3 py-1 h-8 bg-stone-200 border-r-2 border-b-2 border-slate-700 text-sm cursor-grab'
    >
      {word.text}
    </div>
  );
}
