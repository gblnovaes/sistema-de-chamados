import { Navigate } from 'react-router-dom'
import './dashboard.css'
import {useContext} from 'react'
import { AuthContext } from '../../contexts/auth'
import {Header} from '../../components/Header' 

export function Dashboard(){
    const {signed,signOut} = useContext(AuthContext)
   
    if(!signed){
        return( <Navigate  to = '/' /> )
    }
    
    return(
    
        <div>
        <Header/>
        <br /><br /><br /><br />
            <div>Page Dashboard</div>
        
            <button onClick={() => signOut()}>Deslogar</button>
        </div>
    )
}