import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SideNavbar from "../components/shared/SideNavbar";
import { getAppCookies, verifyToken } from "../utils/auth/jwt";

const Home: NextPage = (props: any) => {
  const router = useRouter();

  useEffect(() => {
    if (!props.profile) {
      router.push("/login");
    }
  });

  return (
    <div>
      <Head>
        <title>Senjin Solutions - Admin</title>
        <meta
          name="description"
          content="An administrator tool for Senjin Solutions."
        />
        <link rel="icon" href="" />
      </Head>
      <SideNavbar profile={props.profile} />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { req } = context;

  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token) : "";
  return {
    props: {
      profile,
    },
  };
}

export default Home;
