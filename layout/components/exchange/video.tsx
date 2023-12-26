"use client"

import styles from "@/styles/exchange/video.module.css"

export function Video() {
    return (
        <section className={styles.video_wrap}>
            <iframe className={styles.iframe} width="1720" height="968" src="https://www.youtube.com/embed/b5XZah5bVpk?si=OyLvPEwkIsy46mkm"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
        </section>
    )
}