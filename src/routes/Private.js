
import {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';
import {useContext} from  'react'
 
export function Private({children}){
     
const [signed,setSigned] = useState(false)
 const user = useContext(AuthContext);
    
    
    console.log(!user.signed)
    
    if(!user.signed){
        return <Navigate to='/' />
    } 
    
    return children

    
    
    
}