import {FC} from "react";
import Wrap from "@/layout/wrap/Wrap";
import {Transactions} from "@/layout/components/transactions/main";

const TransactionsScreen: FC = () => {
    return (
        <Wrap>
            <Transactions/>
        </Wrap>
    )
}

export default TransactionsScreen