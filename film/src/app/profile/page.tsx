"use client";

import React, { useState, useEffect } from "react";
import RootLayout from "@/app/layout";

export default function ProfilePage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <RootLayout>
      <div className="">
        <h1>{userName ? `Welcome, ${userName}!` : "Loading..."}</h1>
        <p></p>
      </div>
    </RootLayout>
  );
}
