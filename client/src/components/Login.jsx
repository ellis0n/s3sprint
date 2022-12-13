import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import PartnerLogin from './PartnerLogin'
import PartnerLogout from './PartnerLogout'

const Login = ({handleLogin}) => {


    
    const [credentials, setCredentials] = useState({username: undefined, password:undefined})

    const handleClick=async(e)=>{
        e.preventDefault()
        console.log(typeof(toggle))
        await handleLogin(credentials);

    }




    return (


        <div className = "search">
            <form onSubmit={handleClick}>
                <div>
                    <label>
                        Username:
                        <input
                        type="text"
                        value={credentials.username}
                        onChange={(e) => setCredentials({username: e.target.value, password: credentials.password})}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                        type="text"
                        value={credentials.password}
                        onChange={(e) => setCredentials({username: credentials.username, password: e.target.value})}
                        />
                    </label>
                </div>
                    <input type="submit" value="Login" />
            </form>
            <PartnerLogin/>
            <PartnerLogout className="login-button"/>
        </div>
    )
}

export default Login