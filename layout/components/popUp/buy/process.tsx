"use client"

import {FC} from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "@/styles/popUp/buy/buy.module.css"
import {useStoreBUY, useStoreUser} from "@/store/user";
import {Process} from "@/layout/components/popUp/buy/processMain";

export const BuyProcess: FC = () => {
    const storeBuy = useStoreBUY()
    const storeUser = useStoreUser()
    if (storeUser.auth){
        return (
            <Transition appear show={storeBuy.isOpenTradeOffer} as={Fragment}>
                <Dialog as="div" className={styles.dialog} onClose={() => storeBuy.finish ? storeBuy.reset() : null}>
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
                                    <Process/>
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

export default BuyProcess;