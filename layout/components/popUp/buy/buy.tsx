"use client"

import {FC} from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {Main} from "@/layout/components/popUp/buy/main";
import styles from "@/styles/popUp/buy/buy.module.css"
import { useStoreBUY, useStoreUser} from "@/store/user";
import BuyProcess from "@/layout/components/popUp/buy/process";

export const Buy: FC = () => {
    const storeBUY = useStoreBUY()
    const storeUser = useStoreUser()
    const storeProduct = useStoreBUY()
    if (storeUser.auth && storeProduct.activeItem !== ""){
        return (
            <>
                <BuyProcess/>
                <Transition appear show={storeBUY.isOpen} as={Fragment}>
                    <Dialog as="div" className={styles.dialog} onClose={() => storeBUY.Close()}>
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
            </>
        )
    }
    else {
        return null
    }

}

export default Buy;