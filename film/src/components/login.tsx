import React from "react";

const handleLogin = (): void => {
  console.log(window.location.host);
  const client_id: string =
    "112265870306-9oeq4ni4useoha8ejd9lqj8qsh62p5eg.apps.googleusercontent.com";
  const redirect_uri: string = encodeURIComponent(
    `${location.protocol}//${window.location.host}/callback`,
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
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <img
          src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
          alt="Sign in with Google"
          className="mr-2"
        />
        Login with Google
      </button>
    </div>
  );
};

export default Login;
