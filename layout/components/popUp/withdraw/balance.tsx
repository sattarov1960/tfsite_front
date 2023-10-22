"use client"

import {FC, Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useStoreErrorBalanceWithdraw} from "@/store/user";
import styles from "@/styles/popUp/withdraw/popUp.module.css"
import {BalanceMain} from "@/layout/components/popUp/withdraw/balanceMain";

export const BalancePaymentSystem: FC = () => {
    const store = useStoreErrorBalanceWithdraw()
    return (
        <Transition appear show={store.isOpen} as={Fragment}>
            <Dialog as="div" className={styles.dialog} onClose={() => store.Close()}>
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
                                <BalanceMain/>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
)
}

export default Error