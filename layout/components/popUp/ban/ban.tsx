"use client"

import {FC} from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "@/styles/popUp/ban/ban.module.css"
import Main from "@/layout/components/popUp/ban/main";
import {useStoreUser} from "@/store/user";

export const Ban: FC = () => {
    const userStore = useStoreUser()
    return <Transition appear show={userStore.is_banned} as={Fragment}>
        <Dialog as="div" className={styles.dialog} onClose={() => null}>
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

}

export default Ban;