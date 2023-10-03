import {Metadata, NextPage} from "next";
import {getTitle} from "@/utilities/Meta";
import TransactionsScreen from "@/layout/screens/transactions/Transactions";


export const metadata: Metadata = {
    title: getTitle("Transactions"),
    description: 'Transactions Page',
}

const TransactionsPage: NextPage = () => {
    return (
        <TransactionsScreen/>
    );
}

export default TransactionsPage