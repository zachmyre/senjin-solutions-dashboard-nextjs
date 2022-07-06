import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import Cookies from "js-cookie";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-center">Join us</h3>
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
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Create Account
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              {"Already have an account?"}
              <a className="text-blue-600 hover:underline" href="#">
                Log in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
