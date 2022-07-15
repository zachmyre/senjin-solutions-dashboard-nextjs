import type { NextPage } from "next";
import Head from "next/head";

import SideNavbar from "../components/shared/SideNavbar";
import PageContainer from "../components/shared/PageContainer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAppCookies, verifyToken } from "../utils/auth/jwt";
import TasksLayout from "../components/tasks/TasksLayout";

const Tasks: NextPage = (props: any) => {
  const router = useRouter();

  useEffect(() => {
    if (!props.profile) {
      router.push("/login");
    }
  });
  return (
    <div>
      <Head>
        <title>Senjin Solutions - Tasks</title>
        <meta
          name="description"
          content="Tasks and todo list for Senjin Solutions."
        />
        <link rel="icon" href="" />
      </Head>
      <SideNavbar profile={props.profile} />
      <PageContainer>
        <TasksLayout />
      </PageContainer>
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

export default Tasks;
