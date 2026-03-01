import CheckoutForm from '@/components/public/CheckoutForm';
import React from 'react'

export default async function page({ params }: { params: { id: string } }) {
    const {id} = await params;
    console.log("dsjkfdks",id)
    const res = await fetch(`http://localhost:3000/api/service/${id}`)
    const data =await res.json()
  return (
    <div className='p-12'>
      <CheckoutForm data ={data}/>
    </div>
  )
}
