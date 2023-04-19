import React, { useState } from "react";
import Results from "./Results.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login.jsx";

const Search = () => {
	const [query, setQuery] = useState({
		searchType: "all",
		searchTerms: "",
	});
	const [results, setResults] = useState([]);
	const [running, setRunning] = useState(false);
	const { isAuthenticated } = useAuth0();

	const handleSubmit = async (event) => {
		const { searchType, searchTerms } = query;
		let url;
		event.preventDefault();
		setRunning(true);
		switch (searchType) {
			case "all":
				url = `http://movieapibackend-env-1.eba-xiae5zzh.us-east-1.elasticbeanstalk.com/movie/search/findByAllContaining?searchTerm=${searchTerms}`;
				break;
			case "title":
				url = `http://movieapibackend-env-1.eba-xiae5zzh.us-east-1.elasticbeanstalk.com/movie/search/findByTitleContaining?title=${searchTerms}`;
				break;
			case "genre":
				url = `http://movieapibackend-env-1.eba-xiae5zzh.us-east-1.elasticbeanstalk.com/movie/search/findByGenreContaining?genre=${searchTerms}`;
				break;
			case "review":
				url = `http://movieapibackend-env-1.eba-xiae5zzh.us-east-1.elasticbeanstalk.com/movie/search/findByReview?review=${searchTerms}`;
				break;
			default:
				url = `http://movieapibackend-env-1.eba-xiae5zzh.us-east-1.elasticbeanstalk.com/movie/search/findByAllContaining?searchTerm=${searchTerms}`;
		}

		// const jsonQuery = JSON.stringify({
		// 	searchTerms: query.searchTerms,
		// 	database: query.database,
		// 	user: user.email,
		// 	date: new Date().toLocaleString(),
		// });

		if (searchType === "review") {
			console.log(typeof searchTerms);
			if (
				searchTerms === "1" ||
				searchTerms === "2" ||
				searchTerms === "3" ||
				searchTerms === "4" ||
				searchTerms === "5"
			) {
				url = `http://movieapibackend-env-1.eba-xiae5zzh.us-east-1.elasticbeanstalk.com/movie/search/findByReview?review=${searchTerms}`;
			} else {
				alert("Please enter a number between 1 and 5.");
				return;
			}
		}
		console.log(url);
		await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => setResults(response._embedded.movie))
			// setResults(response))
			.catch((error) => console.log(error));
	};

	return (
		<>
			<div className="search">
				<form onSubmit={handleSubmit}>
					<div className="input">
						<label>
							Query:
							<input
								type="text"
								placeholder="&#x1F50D; Title, Genre, Rating(1-5)..."
								pattern="^[ ,a-zA-Z1234567890]+$"
								title="No special characters"
								required
								onChange={(e) =>
									setQuery({
										searchType: query.searchType,
										searchTerms: e.target.value,
									})
								}
							/>
						</label>
					</div>
					<label>
						<select
							type="radio"
							value={query.searchType}
							checked={query.searchType === "all"}
							onChange={(e) =>
								setQuery({
									searchType: e.target.value,
									searchTerms: query.searchTerms,
								})
							}
						>
							<option value="all">Search All</option>
							<option value="title">Search Title</option>
							<option value="genre">Search Genre</option>
							<option value="review">Search Review</option>
						</select>
					</label>

					<input type="submit" value="Search" />

					{running ? (
						<div className="resultNum">
							<p>{results.length} results.</p>
						</div>
					) : null}
				</form>
			</div>
			{running ? <Results results={results} /> : null}
		</>
	);
};

export default Search;
