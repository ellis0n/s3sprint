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
                <div className="title"><h3>{result.title}</h3></div>

                <div className = "coverimg-wrapper">
                    <Cover movieName = {result.title}/>
                </div>

                <div className = "stars">   {renderStars(result.review)}
                  <p>{result.review} Stars </p>
                </div>

                <div className ="genre-wrapper">
                {result.genre.split("|").map((genre, index) => (
                    <div className= "genre" key = {index}>{genre}</div>
                ))}
                </div>

            </div>))}
    </div>
  )
}


export default Results