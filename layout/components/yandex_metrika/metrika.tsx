import Image from "next/image";

const enabled = process.env.use_yandex_metrika && process.env.yandex_metrika_id

export const YandexMetrika = () => {
    if (!enabled){
        return null
    }
    return (
        <>
            <script
                dangerouslySetInnerHTML={{
                    __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                             m[i].l=1*new Date();
                             for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                             k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                             (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                             
                             ym(${process.env.yandex_metrika_id}, "init", {
                                  clickmap:true,
                                  trackLinks:true,
                                  accurateTrackBounce:true,
                                  webvisor:true
                             });`,
                }}
            />
            <noscript>
                <div>
                    <Image src="https://mc.yandex.ru/watch/12345678" style={{ position:'absolute', left:'-9999px' }} alt="" />
                </div>
            </noscript>
        </>
    )
}