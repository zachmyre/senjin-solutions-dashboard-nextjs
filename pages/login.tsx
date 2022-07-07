import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";

export interface LoginForm {
  email: string;
  password: string;
}

const Login: any = (event: any) => {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const loginErrorHandler = () => {
    setError("");
    if (loginForm.password == "" || loginForm.email == "") {
      setError("All fields must be filled in.");
      return false;
    }
    return true;
  };

  const login = async (event: any) => {
    event.preventDefault();
    if (!loginErrorHandler()) {
      return;
    }
    await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    })
      .then(async (res: any) => {
        if (res.status != 200) {
          let response = await res.json();
          setError(response.message);
        } else {
          let response = await res.json();
          if (response.message) Cookies.set("token", response.message);
          router.replace("/");
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Senjin Solutions - Login</title>
        <meta
          name="description"
          content="An administrator tool for Senjin Solutions."
        />
      </Head>
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <div className="flex justify-center">
          <Image
            className="rounded-full"
            src="/senjinsolutions.png"
            height="250"
            width="250"
            alt="Rounded avatar"
          />
        </div>
        <h3 className="text-2xl font-bold text-center my-4">Login</h3>
        <form action="">
          <div className="mt-4">
            {error && <Alert severity="error">{error}</Alert>}
            <div className="mt-4">
              <label className="block">Email</label>
              <input
                onChange={(event) =>
                  setLoginForm({
                    ...loginForm,
                    email: event.target.value,
                  })
                }
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                onChange={(event) =>
                  setLoginForm({
                    ...loginForm,
                    password: event.target.value,
                  })
                }
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex">
              <button
                onClick={(event) => login(event)}
                className="w-full px-6 py-2 mt-4 text-white bg-primary rounded-lg hover:bg-gray-300"
              >
                Login
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              {"Don't have an account? "}
              <Link href="/register">
                <a className="text-primary font-bold hover:underline">
                  Sign up
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
