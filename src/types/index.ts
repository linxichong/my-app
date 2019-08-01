export interface Novel {
  id: string;
  title: string;
  author: string;
  summary: string;
}

import { NavLinkProps } from "react-router-dom";

export interface LayoutProps {
  isSideBarOpened: boolean;
  toggleSideBar: () => void;
  location: NavLinkProps["location"];
}

export interface Language {
  key: string;
  lable: string;
}
