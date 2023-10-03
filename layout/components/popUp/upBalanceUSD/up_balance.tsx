"use client"

import {FC} from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {Main} from "@/layout/components/popUp/upBalanceRUB/main";
import styles from "@/styles/popUp/upBalanceRUB/up_balance.module.css"
import {useStoreUpBalance, useStoreUser} from "@/store/user";

export const UpBalance: FC = () => {
    const storeUpBalance = useStoreUpBalance()
    const storeUser = useStoreUser()
    if (storeUser.auth){
        return (
            <Transition appear show={storeUpBalance.isOpen} as={Fragment}>
                <Dialog as="div" className={styles.dialog} onClose={() => storeUpBalance.Close()}>
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
                                    <Main/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        )
    }
    else {
        return <h1>Пользователь не авторизован</h1>
    }

}

export default UpBalance;