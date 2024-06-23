import React from "react";
import Header from "../components/Header";
import Registration from "../components/Registration";
import UserOptions from "../components/UserOptions";


export default function RegistrationPage() {
  return (
    <>
      <Header />
      {/* <UserOptions className="relative top-7 left-[45%]"/> */}
      <UserOptions />
      <Registration />
    </>
  );
}
