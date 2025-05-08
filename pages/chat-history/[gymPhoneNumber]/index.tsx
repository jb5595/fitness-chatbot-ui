import { useRouter } from "next/router";
import ChatHistoryComponent from "../../../components/ChatHistoryComponent/ChatHistoryComponent";

export default function Chathistory(){
    const router = useRouter()
    const gymPhoneNumber = router.query.gymPhoneNumber
    const clientPhoneNumber = router.query.clientPhoneNumber
    return (      
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 sm:items-start">
            <ChatHistoryComponent gymPhoneNumber={`${gymPhoneNumber}`} clientPhoneNumber={`${clientPhoneNumber}`}></ChatHistoryComponent>
            </main>
        </div>
    )
}