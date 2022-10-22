import { Navigate } from 'react-router-dom'

import {useContext} from 'react'
import { AuthContext } from '../../contexts/auth'

export function Dashboard(){
    const {signed,signOut} = useContext(AuthContext)
   
    if(!signed){
        return( <Navigate  to = '/' /> )
    }
    
    return(
    
        <div>
            <div>Page Dashboard</div>
        
            <button onClick={() => signOut()}>Deslogar</button>
        </div>
    )
}