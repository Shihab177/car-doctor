"use client"
import { METHODS } from 'http';
import { useRouter } from 'next/navigation';
import { MdDelete } from 'react-icons/md'
interface DeleteBookingButtonProps {
  id: string;
}
export default function DeleteBookingButton({id}:DeleteBookingButtonProps) {
    const router = useRouter() 
    const handelDelete = async ()=>{
        const res = await fetch(`http://localhost:3000/api/service/${id}`,
            {
                method:"DELETE"
            }
        )
        const data =await res.json()
        router.refresh()
    }

  return (
    <><MdDelete className="cursor-pointer" size={24} onClick={handelDelete}/></>
  )
}
