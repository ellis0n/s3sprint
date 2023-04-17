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

	const displayError = () => {
		alert("Please sign in with your partner account to use this feature.");
	};

	const handleSubmit = async (event) => {
		const { searchType, searchTerms } = query;
		let url;
		if (!isAuthenticated) {
			displayError();
		} else {
			event.preventDefault();
			setRunning(true);
			switch (searchType) {
				case "all":
					url = `http://localhost:8080/movie/search/findByAllContaining?searchTerm=${searchTerms}`;
					break;
				case "title":
					url = `http://localhost:8080/movie/search/findByTitleContaining?title=${searchTerms}`;
					break;
				case "genre":
					url = `http://localhost:8080/movie/search/findByGenreContaining?genre=${searchTerms}`;
					break;
				case "review":
					url = `http://localhost:8080/movie/search/findByReview?review=${parseInt(
						searchTerms
					)}`;
					break;
				default:
					url = `http://localhost:8080/movie/search/findByAllContaining?searchTerm=${searchTerms}`;
			}

			// const jsonQuery = JSON.stringify({
			// 	searchTerms: query.searchTerms,
			// 	database: query.database,
			// 	user: user.email,
			// 	date: new Date().toLocaleString(),
			// });
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
		}
	};

	return (
		<>
			<div className="search">
				{!isAuthenticated ? (
					<div>
						<h4>Please log in to access movieAPI.</h4>
						<Login />
					</div>
				) : (
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
				)}
			</div>
			{running ? <Results results={results} /> : null}
		</>
	);
};

export default Search;
