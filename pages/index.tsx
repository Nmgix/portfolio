import type { NextPage } from "next";
import { Alert, CellGroup } from "nmgix-components/src";
import React from "react";
import { dataExample } from "nmgix-components/src/components/CellsComponentsGroup/example-data/ExampleData";

const Home: NextPage = () => {
  return <CellGroup data={dataExample} />;
};

export default Home;
