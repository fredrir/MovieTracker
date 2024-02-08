import { useRouter } from "next/router";
import { use } from "react";

const FilmInfo: React.FC = () => {
    const router=useRouter();

    return (
        <div>
            {/*movie details content*/}
            <button onClick={()=>router.push('/')}>Go back</button>
        </div>
    );
};
export default FilmInfo;