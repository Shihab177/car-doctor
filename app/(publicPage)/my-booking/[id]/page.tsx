import BookingUpdateForm from '@/components/public/BookingUpdateForm';
import { headers } from 'next/headers';
import React from 'react'

export default async function page({ params }: { params: { id: string } }) {
    const {id} = await params;
    const res =await await fetch(`http://localhost:3000/api/my-bookings/${id}`,{
       headers:await headers()
    })
    const data = await res.json()
  return (
    <div className='py-12'>
      <BookingUpdateForm data ={data}/>
    </div>
  )
}
