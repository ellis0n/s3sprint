import React, { useState, useEffect } from "react";
import axios from "axios";

//  This component is used to display the cover image of the movie. I decided to use it as an opportunity to play with the Axios library.

const Cover = ({ movieName }) => {
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		const getMovieCover = async (movieName) => {
			// const API_KEY = "b28d78f880bc5ab58070eba3767ec978"; // Todo: Put in ENV file

			const options = {
				method: "GET",
				url: `https://api.themoviedb.org/3/search/movie`,
				params: {
					query: movieName,
					api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
				},
			};

			try {
				const response = await axios(options);
				if (response.data.results[0] && response.data.results[0].poster_path) {
					setImageUrl(
						`https://image.tmdb.org/t/p/w500${response.data.results[0].poster_path}`
					);
				} else {
					setImageUrl(
						"https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
					);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getMovieCover(movieName);
	}, [movieName]);

	return (
		<div className="coverimg">
			{!imageUrl ? null : <img src={imageUrl} alt={movieName} />}
		</div>
	);
};

export default Cover;
