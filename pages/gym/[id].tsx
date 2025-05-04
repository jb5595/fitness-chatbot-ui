import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function UserList(){
    const router = useRouter()
    const gymPhoneNumber = router.query.id
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        if(gymPhoneNumber !== undefined){
            fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/chat-history/gym/${gymPhoneNumber}/users`)
            .then((res) => res.json())
            .then((data) => {
                setUserList(data)
            })
        }
    }, [gymPhoneNumber])

    return (      
        <div className="items-center justify-items-center p-8 pb-20 gap-16">
            <h1>Click a Customer Phone Number To See The Associated Chat History</h1>
            <ul className="p-8">
                {userList.map((user, idx) => {
                    return <li className="text-black" key={'user-' + idx}><Link href={`/chat-history/${gymPhoneNumber}?userPhoneNumber=${user}`}>{user}</Link></li>
                })}
            </ul>
        </div>
    )
}