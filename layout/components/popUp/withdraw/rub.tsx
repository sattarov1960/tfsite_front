"use client"

import {FC, Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useStoreErrorBalanceWithdraw, useStoreWithdrawRUB} from "@/store/user";
import styles from "@/styles/popUp/withdraw/popUp.module.css"
import {RUBMain} from "@/layout/components/popUp/withdraw/rub_main";

export const RUB: FC = () => {
    const store = useStoreWithdrawRUB()
    const store_balance_error = useStoreErrorBalanceWithdraw()
    return (
        <Transition appear show={store.isOpen} as={Fragment}>
            <Dialog as="div" className={styles.dialog} onClose={() => store_balance_error.isOpen ? null : store.Close()}>
                <div className={styles.dialog_div_wrap}>
                    <div className={styles.dialog_div}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel>
                            <RUBMain/>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
</Transition>
)
}
export default RUB