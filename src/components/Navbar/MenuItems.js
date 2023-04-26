import { FaUserFriends } from "react-icons/fa";
import { HiPuzzle, HiDocumentReport } from "react-icons/hi";
import { DiGoogleAnalytics } from "react-icons/di";
import { BsFillBarChartFill } from "react-icons/bs";
import { AiFillTool } from "react-icons/ai";
import { SvgIcon } from "@mui/material";

export const MenuItems = [
  {
    label: "Dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <BsFillBarChartFill />
      </SvgIcon>
    ),
    link: "/",
  },
  {
    label: "Subscribers",
    icon: (
      <SvgIcon fontSize="small">
        <FaUserFriends />
      </SvgIcon>
    ),
    link: "/Subscribers",
  },
  {
    label: "Genre",
    icon: (
      <SvgIcon fontSize="small">
        <HiPuzzle />
      </SvgIcon>
    ),

    children: [
      
      {
        label: "View Genre",

        link: "/ViewGenre",
      },
    ],
  },
  {
    label: "Games & Portal",
    icon: (
      <SvgIcon fontSize="small">
        <HiPuzzle />
      </SvgIcon>
    ),

    children: [
      {
        label: "Add new Game",

        link: "/AddGame",
      },
      {
        label: "View Games",

        link: "/ViewGame",
      },
      {
        label: "View Domain",

        link: "/ViewDomain",
      },
      {
        label: "Mapping",

        
        link: "/Mapping",
      },
    ],
  },

  {
    label: "Reports & Logs",
    icon: (
      <SvgIcon fontSize="small">
        <HiDocumentReport />
      </SvgIcon>
    ),
    link: "/Logs",
  },
  {
    label: "Analytics",
    icon: (
      <SvgIcon fontSize="small">
        <DiGoogleAnalytics />
      </SvgIcon>
    ),

    children: [
      {
        label: "Geographic",

        link: "/Geographic",
      },
      {
        label: "Gender",

        link: "/Gender",
      },
      {
        label: "Age",

        link: "/Age",
      },
    ],
  },
  {
    label: "Tools",
    icon: (
      <SvgIcon fontSize="small">
        <AiFillTool />
      </SvgIcon>
    ),

    children: [
      {
        label: "Send Notification",

        link: "/SendNotification",
      },
    ],
  },
  // Add more menu items as needed
];
