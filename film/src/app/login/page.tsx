"use client";

import React from "react";
import RootLayout from "@/app/layout";
import Login from "../../components/login";

const LoginPage: React.FC = () => {
  return (
    <RootLayout>
      <Login />
    </RootLayout>
  );
};

export default LoginPage;
