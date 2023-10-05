import {Metadata, NextPage} from "next";
import HomeScreen from "@/layout/screens/home/Home";
import {getTitle} from "@/utilities/Meta";

export const metadata: Metadata = {
  title: getTitle("автоматическая покупка и продажа ключей TF2."),
  description: 'Сайт для покупки и продажи ключей TF2 по самой выгодной цене. Принимаем и переводим на QiWi, банковские карты и USDT. Быстро, легко, надёжно. Поддержка работает 24 на 7.',
}

const HomePage: NextPage = () => {
  return (
        <HomeScreen/>
  );
}


export default HomePage