import type { NextPage } from "next";
import { Alert } from "nmgix-components/src";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Alert type='Header' scheme='interest'>
        <>какое-тое уведомление!!!</>
      </Alert>
      <span>Helloooooo</span>
    </>
  );
};

export default Home;
