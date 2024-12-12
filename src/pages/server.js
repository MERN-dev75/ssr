import React from 'react'

export default function server({data}) {
  return (
    <>
      <div>server side render</div>
      <div>{data?.map(item=><h1 key={item.name}>{item.name}</h1>)}</div>
    </>
  )
}


// API call on server side 
export async function getServerSideProps(ctx){
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  console.log("Server side API call")
  const users = await res.json()
  return {
    props:{
      data: users
    }
  }
}
