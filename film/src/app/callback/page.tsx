"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Callback: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substr(1));

    const accessToken = params.get("access_token");
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      router.push("/profile");
      console.log("Access token found");
      console.log(window.location.host);
    } else {
      router.push("/error");
      console.error("No access token found");
    }
  }, [router]);

  return <div>Logging you in...</div>;
};

export default Callback;
