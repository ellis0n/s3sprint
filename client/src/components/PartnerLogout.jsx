import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const PartnerLogout = ({className}) => {
    const {logout, isAuthenticated} = useAuth0();

    return (
    isAuthenticated &&
        <div >
            <button className = {className} onClick={()=>logout()}>Log out.</button>
        </div>
    )
}

export default PartnerLogout