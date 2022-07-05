import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import CustomerTable from "./CustomerTable";
import OrdersTable from "./OrdersTable";

const CustomerLayout = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className="relative p-0 m-0">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            className="w-full text-gray-100"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab
              label="Order Statuses"
              value="1"
              className="text-gray-900 font-bold"
            />
            <Tab
              label="Customers"
              value="2"
              className="text-gray-900 font-bold"
            />
          </TabList>
        </Box>
        <TabPanel value="1" className="p-1 m-0">
          <OrdersTable />
        </TabPanel>
        <TabPanel value="2" className="p-1 m-0">
          <CustomerTable />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default CustomerLayout;
