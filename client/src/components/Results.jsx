import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Cover from "./Cover.jsx";


const Results = (props) => {

  const renderStars = (rating) => {
      let stars = []  
      for (let i = 0; i < rating; i++) {
          stars.push(<FontAwesomeIcon key= {i} icon={faStar} color="gold"/>)
      } 
      return stars
  }

  return (
    <div className = "result-wrapper">
        {props.results.map((result) => (
            <div key={result.id} className="result">
                <h3>{result.title}</h3>

                <Cover movieName = {result.title}/>
                <div className = "stars">{renderStars(result.review)}</div>
                <p>{result.review} Stars </p>
                {result.genre.split("|").map((genre, index) => (
                    <div key = {index}>{genre}</div>
                ))}
                <p>{result.year}</p>

            </div>))}
    </div>
  )
}


export default Results