
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';
import {useContext} from  'react'
 
export function Private({children}){
     
const {signed} = useContext(AuthContext);
 const navigate = useNavigate();
    
    if(!signed){
         navigate('/')
    } 
    
    return children

}