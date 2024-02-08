import Image from "next/image";
interface FilmCardProps {
  title: string;
  image: string;
  description: string;
  onClick: () => void;
}

const FilmCard: React.FC<FilmCardProps> = ({
  title,
  image,
  description,
  onClick,
}) => {
  return (
    <div className="film-card" onClick={onClick}>
      <div style={{ position: "relative", width: "100%", height: "200px" }}>
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FilmCard;
