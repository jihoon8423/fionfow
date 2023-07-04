import React from "react";
import { Fragment } from "react";
import Navigation from "./MainNavigation";

type Props = {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
    </Fragment>
  )
};

export default Layout;
