import type { NextPage } from "next";
import Head from "next/head";
import CalendarLayout from "../components/calendar/CalendarLayout";
import SideNavbar from "../components/shared/SideNavbar";
import PageContainer from "../components/shared/PageContainer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAppCookies, verifyToken } from "../utils/auth/jwt";
import { getCalendarEvents } from "../utils/http/events";

const Customers: NextPage = (props: any) => {
  const router = useRouter();

  useEffect(() => {
    if (!props.profile) {
      router.push("/login");
    }
  });
  return (
    <div>
      <Head>
        <title>Senjin Solutions - Calendar</title>
        <meta name="description" content="Calendar for Senjin Solutions." />
        <link rel="icon" href="" />
      </Head>
      <SideNavbar profile={props.profile} />
      <PageContainer>
        <CalendarLayout profile={props.profile} events={props.events} />
      </PageContainer>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { req } = context;
  const { token } = getAppCookies(req);
  const profile: any = token ? verifyToken(token) : "";
  let events;
  if (profile._id) {
    events = await getCalendarEvents(profile._id);
  }
  return {
    props: {
      profile,
      events,
    },
  };
}

export default Customers;
