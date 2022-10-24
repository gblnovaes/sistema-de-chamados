import './header.css'
import avatar from '../../assets/avatar.png'
import { FiHome,FiUser,FiSettings } from "react-icons/fi";


import {useContext} from 'react'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom';

export function Header(){
    const {user} = useContext(AuthContext)
    
     
    return(
        
        <div className='sidebar'>
        
        <div>
            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Avatar" />    
        </div>
        
        <Link to='/dashboard' >
            <FiHome  size={24} color="#fff"/>
            Chamados
        </Link>
        
        <Link to='/customers' >
            <FiUser  size={24} color="#fff"/>
            Clientes
        </Link>
        
        <Link to='/profile' >
            <FiSettings  size={24} color="#fff"/>
            Configurações
        </Link>
        
    
        </div>
    )
}