"use client"

import {FC} from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {Main} from "@/layout/components/popUp/engineeringWorks/main";
import styles from "@/styles/popUp/engineeringWorks/engineeringWorks.module.css"
import {useStoreEngineeringWorks} from "@/store/user";

export const EngineeringWorks: FC = () => {
    const store = useStoreEngineeringWorks()
    return (
        <Transition appear show={store.isOpen} as={Fragment}>
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
    )
}

export default EngineeringWorks;