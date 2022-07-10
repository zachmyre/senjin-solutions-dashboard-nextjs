import type { NextPage } from "next";
import Head from "next/head";
import CalendarLayout from "../components/calendar/CalendarLayout";
import SideNavbar from "../components/shared/SideNavbar";
import PageContainer from "../components/shared/PageContainer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAppCookies, verifyToken } from "../utils/auth/jwt";
import { getCalendarEvents } from "../utils/http/events";

const Customers: NextPage = (props: any) => {
  const router = useRouter();
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    if (!props.profile) {
      router.push("/login");
      return;
    }
    const getData = async () => {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
      console.log(events);
      return;
    }
    getData();
  }, []);

  const getEvents = async () => {
    if (props.profile._id) {
      const fetchedEvents = await getCalendarEvents(props.profile._id);
      return fetchedEvents;
    }
    return null;
  }
  return (
    <div>
      <Head>
        <title>Senjin Solutions - Calendar</title>
        <meta name="description" content="Calendar for Senjin Solutions." />
        <link rel="icon" href="" />
      </Head>
      <SideNavbar profile={props.profile} />
      <PageContainer>
        <CalendarLayout profile={props.profile} events={events} />
      </PageContainer>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { req } = context;
  const { token } = getAppCookies(req);
  const profile: any = token ? verifyToken(token) : "";

  return {
    props: {
      profile,
    },
  };
}

export default Customers;
