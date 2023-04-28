import { FC, ReactNode } from "react";
import { NavBar, SideBar } from "../ui";

interface Props {
  children?: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <SideBar keepOpen={false} />
      {children}
    </div>
  );
};
