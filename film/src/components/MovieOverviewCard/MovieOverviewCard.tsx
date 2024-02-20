import Image from "next/image";

export type MovieOverviewCardProps = {
  movie_title: string;
  movie_image: string;
  movie_description: string;
};

export const MovieOverviewCard: React.FC<MovieOverviewCardProps> = ({
  movie_title,
  movie_image,
  movie_description,
}) => {
  return (
    <div className="grid grid-cols-1 items-center w-1/3">
      <h1 className="text-center text-xl mt-5 mb-5">{movie_title}</h1>
      <Image
        alt="movie backdrop"
        src={"https://image.tmdb.org/t/p/original/" + movie_image}
        className="width-100"
        width={500}
        height={700}
      />
      <h2 className="mt-5"><b>Description:</b></h2>
      <h2>{movie_description}</h2>
      <div className="flex justify-start mb-10">
        <button className="outline mt-3 p-1 rounded hover:bg-slate-700">Add to favorites🌟</button>
        <button className="outline ml-4 mt-3 p-1 rounded hover:bg-slate-700">Mark as watched</button>
      </div>
    </div>
  );
};
