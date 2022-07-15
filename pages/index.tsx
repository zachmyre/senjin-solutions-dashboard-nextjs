import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SideNavbar from "../components/shared/SideNavbar";
import { getAppCookies, verifyToken } from "../utils/auth/jwt";
import { getWeather } from "../utils/http/weather";
import PageContainer from "../components/shared/PageContainer";
import WeatherCard from "../components/dashboard/WeatherCard";
import CalendarCard from "../components/dashboard/CalendarCard";

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
      <PageContainer>
        <WeatherCard
          weather={props.weather}
          className="w-full lg:w-1/5 h-1/3 mx-2 p-2"
        />
        <CalendarCard
          profile={props.profile}
          className="w-full lg:w-1/5 h-1/3 mx-2 p-2"
        />
      </PageContainer>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { req } = context;
  const weather = await getWeather();
  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token) : "";
  return {
    props: {
      profile,
      weather,
    },
  };
}

export default Home;
