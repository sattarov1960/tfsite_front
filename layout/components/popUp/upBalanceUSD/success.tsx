"use client"

import {FC} from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "@/styles/popUp/upBalanceUSD/up_balance.module.css"
import {useStoreUpBalanceUSD, useStoreUser} from "@/store/user";
import {Success} from "@/layout/components/popUp/upBalanceUSD/main_success";

export const SuccessUpBalanceUSD: FC = () => {
    const storeUpBalance = useStoreUpBalanceUSD()
    const storeUser = useStoreUser()
    if (storeUser.auth){
        return (
            <Transition appear show={storeUpBalance.openSuccess} as={Fragment}>
                <Dialog as="div" className={styles.dialog} onClose={() => storeUpBalance.setOpenSuccess(false)}>
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
                                    <Success/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        )
    }
    else {
        return null
    }

}

export default SuccessUpBalanceUSD;