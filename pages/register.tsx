import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
}

const Register: any = (event: any) => {
  const router = useRouter();
  const [userRegistration, setUserRegistration] = useState<UserRegistration>({
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const [error, setError] = useState("");

  const registerErrorHandler = () => {
    setError("");
    if (userRegistration.password != userRegistration.verifyPassword) {
      setError("Passwords must match!");
      return false;
    }
    return true;
  };

  const signUp = async (event: any) => {
    event.preventDefault();
    if (!registerErrorHandler()) {
      return;
    }
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegistration),
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
        <title>Senjin Solutions - Sign Up</title>
        <meta
          name="description"
          content="An administrator tool for Senjin Solutions."
        />
        <link rel="icon" href="" />
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
        <h3 className="text-2xl font-bold text-center my-4">Register</h3>
        <form action="">
          <div className="mt-4">
            {error && <Alert severity="error">{error}</Alert>}
            <div>
              <label className="block">Name</label>
              <input
                onChange={(event) =>
                  setUserRegistration({
                    ...userRegistration,
                    name: event.target.value,
                  })
                }
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="mt-4">
              <label className="block">Email</label>
              <input
                onChange={(event) =>
                  setUserRegistration({
                    ...userRegistration,
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
                  setUserRegistration({
                    ...userRegistration,
                    password: event.target.value,
                  })
                }
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="mt-4">
              <label className="block">Confirm Password</label>
              <input
                onChange={(event) =>
                  setUserRegistration({
                    ...userRegistration,
                    verifyPassword: event.target.value,
                  })
                }
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            {userRegistration.password != userRegistration.verifyPassword && (
              <span className="text-xs text-red-400">
                Password must be same!
              </span>
            )}

            <div className="flex">
              <button
                onClick={(event) => signUp(event)}
                className="w-full px-6 py-2 mt-4 text-white bg-primary rounded-lg hover:bg-blue-900"
              >
                Create Account
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              {"Already have an account? "}
              <Link href="/login">
                <a className="text-primary font-bold hover:underline">Login</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
