import type { NextPage } from "next";
import Head from "next/head";
import SideNavbar from "../components/shared/SideNavbar";

const Home: NextPage = () => {

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
      <SideNavbar />
    </div>
  );
};



export default Home;
