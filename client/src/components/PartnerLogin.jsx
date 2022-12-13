import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const PartnerLogin = () => {
  const {loginWithRedirect, isAuthenticated} = useAuth0();

  return (
    !isAuthenticated && (
    <div>
      <button onClick={()=>loginWithRedirect()}>Sign in with partner.</button>
    </div>
    )
  )
}

export default PartnerLogin