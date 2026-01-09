import { Tables } from '@/types/database.types';
interface TileProps {
  tile: Pick<Tables<'tiles'>, 'id' | 'text'>;
  onClickHandler?: () => void;
}

export default function Tile({ tile, onClickHandler }: TileProps) {
  return (
    <div
      id={tile.id}
      onClick={onClickHandler}
      className='px-3 py-1 h-8 bg-stone-200 border-r-2 border-b-2 border-slate-700 text-sm cursor-grab'
    >
      {tile.text}
    </div>
  );
}
