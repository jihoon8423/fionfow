import { Fragment } from "react";
import { ChangeUsername } from "./ChangeUsername";
import { ChangePassword } from "./ChangePassword";



const ProfilePage = () => {
  return (
    <Fragment>
      <ChangePassword />
      <ChangeUsername />
    </Fragment>
  );
};

export default ProfilePage;