import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PartnerLogin from "./PartnerLogin";
import PartnerLogout from "./PartnerLogout";
import { useEffect } from "react";

const Login = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const handleClick = async (e) => {
		e.preventDefault();
		setIsLoggedIn(true);
	};

	return (
		<div className="search">
			<form onSubmit={handleClick}>
				{/* <div className = "input-wrapper">
                    <label>
                        Username:
                        <input
                        type="text"
                        value={credentials.username}
                        onChange={(e) => setCredentials({username: e.target.value, password: credentials.password})}
                        />
                    </label>
                </div>
                <div className = "input-wrapper">
                    <label>
                        Password:
                        <input
                        type="text"
                        value={credentials.password}
                        onChange={(e) => setCredentials({username: credentials.username, password: e.target.value})}
                        />
                    </label>
                </div>
                    <input type="submit" id = "submit" value="Login"/> 
                    <p>OR</p> */}
				<PartnerLogin />
			</form>
		</div>
	);
};

export default Login;
