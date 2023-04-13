import React, { useState } from "react";
import Results from "./Results.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login.jsx";

const Search = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [running, setRunning] = useState(false);
	const { user, isAuthenticated } = useAuth0();

	const displayError = () => {
		alert("Please sign in with your partner account to use this feature.");
	};

	const handleSubmit = async (event) => {
		if (!isAuthenticated) {
			displayError();
		} else {
			event.preventDefault();
			setRunning(true);
			// const jsonQuery = JSON.stringify({
			// 	searchTerms: query.searchTerms,
			// 	database: query.database,
			// 	user: user.email,
			// 	date: new Date().toLocaleString(),
			// });
			await fetch(
				`http://localhost:8080/movie/search/findByTitle?title=${query}`,
				{
					method: "GET",
					// headers: {
					// 	Accept: "application/json",
					// 	"Content-Type": "application/json",
					// },
					// body: jsonQuery,
				}
			)
				.then((response) => response.json())
				.then((response) => setResults(response._embedded.movie))
				// setResults(response))
				.catch((error) => console.log(error));
			setQuery("");
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
									value={query}
									onChange={(e) => setQuery(e.target.value)}
								/>
							</label>
						</div>

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
