import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import PartnerLogout from './PartnerLogout';

const Profile = ({style}) => {
    const {user, isAuthenticated} = useAuth0();


  return (
    isAuthenticated && (
    <div className = "banner-user">
        {user?.picture && 
        <div className="banner-profile" style={style}>
            <img src={user.picture} alt={user?.name} /> 
            <PartnerLogout className = "banner-button"/>
        </div>}
    </div>
    )
  )
}

export default Profile