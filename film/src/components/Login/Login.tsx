import React from "react";

const handleLogin = (): void => {
  const client_id: string =
    "112265870306-9oeq4ni4useoha8ejd9lqj8qsh62p5eg.apps.googleusercontent.com";
  const redirect_uri: string = encodeURIComponent(
    "http://localhost:3000/callback",
  );
  const scope: string = encodeURIComponent(
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  );
  const prompt: string = "select_account";
  const response_type: string = "token";

  const authUrl: string = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}&prompt=${prompt}`;

  window.location.href = authUrl;
};

const Login: React.FC = () => {
  return <button onClick={handleLogin}>Login with Google</button>;
};

export default Login;
