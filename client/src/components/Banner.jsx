import React from 'react'
import { useEffect, useState } from 'react'

const Banner = ({username}) => {
  const [total, setTotal] = useState(null)

  useEffect(() => {
    const updateTotal = async () => {
      await fetch("http://localhost:3500/movies", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) =>
          setTotal(response.total),
        );
    };
    updateTotal();
  }, []);
  return (
    <div className='banner'>
      <h1>movieAPI</h1>
        <p id="slogan">{`Over ${total-1} movies you've never heard of.`}</p>
        <div className='user-wrapper'>
          <p>{username}</p>
        </div>
    </div>
  )
}

export default Banner