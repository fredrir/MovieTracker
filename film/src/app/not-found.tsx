import React from "react";
import Link from "next/link";

export default function NotFound(){
    return(
        <div className="min-h-screen bg-white text-center pt-40" >
        <h1 className=" text-black pt-4 pb-3 text-4xl" >404 - Page Not Found</h1>
        <p className="text-black pt-10 text-xl">The page you are looking for does not exist.</p>
        <div className="flex pt-5">
          <div className="w-1/2 p-1">
            <p className=" text-black float-right">
            Go back to the
            </p>
          </div>
          <div className="w-1/2 p-1">
            <Link href="/">
              <button className="bg-blue-500 border pl-2 pr-2 border-black rounded-md hover:font-bold text-white float-left" >Home Page</button>
            </Link>
          </div>
        </div>
        
      </div>
    )
}