import type { NextPage } from "next";
import Marketplace from "@/views/marketplace";
import Poems from "../mockups/poems.json";

const Home: NextPage = () => {
  return <Marketplace poems={Poems} />;
};

export default Home;
