import css from "./VideoItem.module.css";

interface VideoItemProps {
  name: string;
  url: string;
  onSelect: (url: string) => void;
}

export default function VideoItem({ name, url, onSelect }: VideoItemProps) {
  return (
    <div className={css.videoItem} onClick={() => onSelect(url)}>
      <p>{name}</p>
    </div>
  );
}
