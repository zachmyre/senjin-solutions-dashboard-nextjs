import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdOutlineSpaceDashboard,
  MdCalendarToday,
  MdNoteAlt,
  MdOutlineMoreHoriz,
  MdOutlineTaskAlt,
  MdPersonOutline,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";

import ActiveLink from "./ActiveLink";

import { setLogout } from "../../utils/auth/jwt";

const SideNavbar = ({ profile }: any) => {
  return (
    <div>
      <Disclosure>
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-900 hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
      </Disclosure>
      <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:w-60 lg:left-0 peer-focus:left-0 peer:transition each-out delay-150 duration-200">
        <div className="flex flex-col justify-start items-center">
          {/* <h1 className="text-base text-center cursor-pointer  font-bold text-gray-300 border-gray-100 pb-4 w-full">
            Senjin Solutions
          </h1> */}
          {profile && (
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-gray-900 text-2xl mb-4 font-semibold">
                {profile.name}
              </h4>
              <Image
                className="rounded-full"
                src="/senjinsolutions.png"
                height="250"
                width="250"
                alt="Rounded avatar"
              />
            </div>
          )}
          <div className="my-4 border-b border-gray-100 pb-4">
            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <ActiveLink
                href="/"
                className="text-base font-semibold text-gray-800 group-hover:text-white flex space-x-4"
              >
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="group-hover:text-white">Dashboard</h3>
              </ActiveLink>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <ActiveLink
                href="/calendar"
                className="text-base font-semibold text-gray-800 group-hover:text-white flex space-x-4"
              >
                <MdCalendarToday className=" text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="group-hover:text-white">Calendar</h3>
              </ActiveLink>
            </div>
            {/* <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <ActiveLink
                href="/customers"
                className="text-base font-semibold text-gray-800 group-hover:text-white flex space-x-4"
              >
                <MdPersonOutline className=" text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="group-hover:text-white">Customers</h3>
              </ActiveLink>
            </div> */}
            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <ActiveLink
                href="/tasks"
                className="text-base font-semibold text-gray-800 group-hover:text-white flex space-x-4"
              >
                <MdOutlineTaskAlt className=" text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="group-hover:text-white">Tasks</h3>
              </ActiveLink>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <ActiveLink
                href="/notes"
                className="text-base font-semibold text-gray-800 group-hover:text-white flex space-x-4"
              >
                <MdNoteAlt className=" text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="group-hover:text-white">Notes</h3>
              </ActiveLink>
            </div>
          </div>
          <div className="my-4 border-b border-gray-100 pb-4">
            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <ActiveLink
                href="/settings"
                className="text-base font-semibold text-gray-800 group-hover:text-white flex space-x-4"
              >
                <MdOutlineSettings className=" text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="group-hover:text-white">Settings</h3>
              </ActiveLink>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineMoreHoriz className=" text-2xl text-gray-600 group-hover:text-white" />
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                More
              </h3>
            </div>
          </div>
          <div className="my-4 border-b border-gray-100 pb-4">
            <div
              onClick={(e) => setLogout(e)}
              className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
            >
              <MdOutlineLogout className=" text-2xl text-gray-600 group-hover:text-white" />
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                Logout
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
