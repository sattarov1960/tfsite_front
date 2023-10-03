"use client"

import {FC} from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "@/styles/popUp/sell/sell.module.css"
import {useStoreSELL, useStoreUser} from "@/store/user";
import {Process} from "@/layout/components/popUp/sell/processMain";

export const SellProcess: FC = () => {
    const storeSell = useStoreSELL()
    const storeUser = useStoreUser()
    if (storeUser.auth){
        return (
            <Transition appear show={storeSell.isOpenTradeOffer} as={Fragment}>
        <Dialog as="div" className={styles.dialog} onClose={() => storeSell.finish ? storeSell.setIsOpenTradeOffer(false) : null}>
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

export default SellProcess;