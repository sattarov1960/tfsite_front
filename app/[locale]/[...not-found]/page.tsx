import NotFoundScreen from "@/layout/screens/notFound/notFound";
import {Metadata} from "next";
import {getTitle} from "@/utilities/Meta";

export const metadata: Metadata = {
    title: getTitle("Не найдено"),
    description: 'Эта страница не существует, попробуйте перейти на основную. 404 error',
}

function Page() {
    return (
        <NotFoundScreen/>
)
}
export default Page