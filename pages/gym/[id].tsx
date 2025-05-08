import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function GymClientList(){
    const router = useRouter()
    const gymPhoneNumber = router.query.id
    const [clientList, setClientList] = useState([]);

    useEffect(() => {
        if(gymPhoneNumber !== undefined){
            fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/chat-history/gym/${gymPhoneNumber}/clients`)
            .then((res) => res.json())
            .then((data) => {
                setClientList(data)
            })
        }
    }, [gymPhoneNumber])

    return (      
        <div className="items-center justify-items-center p-8 pb-20 gap-16">
            <h1>Click a Customer Phone Number To See The Associated Chat History</h1>
            <ul className="p-8">
                {clientList.map((client, idx) => {
                    return <li className="text-black" key={'client-' + idx}><Link href={`/chat-history/${gymPhoneNumber}?clientPhoneNumber=${client}`}>{client}</Link></li>
                })}
            </ul>
        </div>
    )
}