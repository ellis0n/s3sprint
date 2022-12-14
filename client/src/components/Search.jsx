import React, { useState } from "react";
import Results from "./Results.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login.jsx";

const Search = () => {
  const [query, setQuery] = useState({
    searchTerms: "",
    database: "searchall",
  });
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
      // console.log(query);
      event.preventDefault();
      setRunning(true);
      const jsonQuery = JSON.stringify({
        searchTerms: query.searchTerms,
        database: query.database,
        user: user.email,
        date: new Date().toLocaleString(),
      });
      await fetch("http://localhost:3500/query", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: jsonQuery,
      })
        .then((response) => response.json())
        .then((response) => setResults(response))
        .catch((error) => console.log(error));
      setQuery({ searchTerms: "", database: "searchall" });
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
                Database:
                <select
                  value={query.database}
                  onChange={(e) =>
                    setQuery({
                      searchTerms: query.searchTerms,
                      database: e.target.value,
                    })
                  }
                >
                  <option value="searchall">Search All</option>
                  <option value="mongo">MongoDB</option>
                  <option value="postgres">PostgreSQL</option>
                </select>
              </label>
            </div>
            <div className="input">
              <label>
                Query:
                <input
                  type="text"
                  value={query.searchTerms}
                  onChange={(e) =>
                    setQuery({
                      searchTerms: e.target.value,
                      database: query.database,
                    })
                  }
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
