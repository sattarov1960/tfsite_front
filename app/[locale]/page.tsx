import {Metadata, NextPage} from "next";
import HomeScreen from "@/layout/screens/home/Home";
import {getTitle} from "@/utilities/Meta";

export const metadata: Metadata = {
  title: getTitle("Home"),
  description: 'Home page',
}

const HomePage: NextPage = () => {
  return (
        <HomeScreen/>
  );
}


export default HomePage