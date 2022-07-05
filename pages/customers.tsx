import type { NextPage } from "next";
import Head from "next/head";

import SideNavbar from "../components/shared/SideNavbar";
import PageContainer from "../components/shared/PageContainer";
import CustomerLayout from "../components/customers/CustomerLayout";

const Customers: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Senjin Solutions - Customers</title>
        <meta
          name="description"
          content="Customer base for Senjin Solutions."
        />
        <link rel="icon" href="" />
      </Head>
      <SideNavbar />
      <PageContainer>
        <CustomerLayout />
      </PageContainer>
    </div>
  );
};

export default Customers;
