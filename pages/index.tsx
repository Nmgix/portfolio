import type { NextPage } from "next";
import { Alert } from "nmgix-components/src";
import React from "react";

const Home: NextPage = () => {
  return (
    <div>
      <Alert type='Header' scheme='Interest'>
        <>какое-тое уведомление!!!</>
      </Alert>
      <span>Helloooooo</span>
    </div>
  );
};

export default Home;
