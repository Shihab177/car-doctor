
import MyAllBookingTable from '@/components/public/MyAllBookingTable'
import { headers } from 'next/headers';
  const fetchMyBookings = async ()=>{
            const res =await fetch("http://localhost:3000/api/service",{
                headers:await headers()
            });
            const d =await res.json()
             return d
        }
export default async function Page() {
  const data =await fetchMyBookings()
  return (
    <div className='py-12 max-w-[1536px] mx-auto'>
        <MyAllBookingTable data={data}/>
    </div>
  )
}
