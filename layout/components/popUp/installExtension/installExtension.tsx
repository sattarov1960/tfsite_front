"use client"

import {FC} from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {Main} from "@/layout/components/popUp/installExtension/main";
import styles from "@/styles/popUp/installExtension/installExtension.module.css"
import {useStoreInstallExtension} from "@/store/user";

export const InstallExtension: FC = () => {
    const store = useStoreInstallExtension()
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
                                <Main/>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default InstallExtension;