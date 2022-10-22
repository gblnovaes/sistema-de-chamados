import firebase from '../../services/firebase.config'
import { Navigate,useNavigate } from 'react-router-dom'

import {useContext} from 'react'
import { AuthContext } from '../../contexts/auth'

export function Dashboard(){
    const {signed} = useContext(AuthContext)
    const navigate = useNavigate()
   
    async function handleDeslogar(){
        await firebase.auth().signOut()
    .then((response) =>{

      console.log("Deslogado " )
      localStorage.clear()
     navigate('/')
    })
    .catch((error) => {
      
    })
    }
    
    if(!signed){
        return(
            <Navigate  to = '/' />
        )
    }else{
        
        return(
        
            <div>
                <div>Page Dashboard</div>
            
                <button onClick={handleDeslogar}>Deslogar</button>
            </div>
        )
        
    }
    
  
}