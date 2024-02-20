import Image from "next/image";
import { useState } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

  // Adjust the class names based on whether the image is loaded
  const imageWrapperClass = isLoaded
    ? "transition-opacity opacity-100 duration-500 ease-in-out delay-150"
    : "transition-opacity opacity-0 duration-500 ease-in-out delay-150";

  return (
    <>
      <style jsx>{`
        .imageWrapperBase {
          position: relative; // This is crucial for 'fill' layout to work
          width: 100%;
          height: 16rem;
          border-radius: 0.5rem;
          overflow: hidden;
          transition:
            transform 150ms ease-in-out,
            opacity 150ms ease-in-out;
        }
        .imageWrapperBase:hover {
          transform: rotate(1deg) scale(1.03);
        }
      `}</style>
      <div className="film-card" onClick={onClick}>
        <div
          className={`relative w-full h-64 rounded-lg overflow-hidden imageWrapperBase ${imageWrapperClass}`}
        >
          {!isLoaded && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex bg-neutral-900 justify-center items-center animate-pulse">
              {/* Placeholder */}
            </div>
          )}
          <Image
            src={image}
            alt={title}
            fill={true}
            className="w-full h-full object-cover hover:cursor-pointer hover:opacity-90"
            sizes="(max-width: 768px) 100vw, 33vw"
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </>
  );
};

export default FilmCard;
