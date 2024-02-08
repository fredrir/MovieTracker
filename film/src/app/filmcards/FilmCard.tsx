interface FilmCardProps {
    title: string;
    image: string;
    description: string;
    onClick: () => void;
  }
  
  const FilmCard: React.FC<FilmCardProps> = ({ title, image, description, onClick }) => {
    return (
      <div className="film-card" onClick={onClick}>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  };
  
  export default FilmCard;
  