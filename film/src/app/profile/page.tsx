"use client";

import React, { useState, useEffect } from "react";
import RootLayout from "@/app/layout";

export default function ProfilePage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchDb(userID: string) {
      const url = `/api/db/user-register?name=${"lol"}?id=${userID}`;
      const response = await fetch(url);
    }

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          console.log(localStorage.getItem("access_token"));
          throw new Error("Failed to fetch user information");
        }

        const data = await response.json();
        setUserName(data.name);

        localStorage.setItem("userId", data.id);
        fetchDb(data.id);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <RootLayout>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-bold text-center">
          {userName ? `Welcome, ${userName}!` : "Loading..."}
        </h1>
      </div>
    </RootLayout>
  );
}
