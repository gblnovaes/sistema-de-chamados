import './header.css'
import avatar from '../../assets/avatar.png'

import {useContext} from 'react'
import { AuthContext } from '../../contexts/auth'

export function Header(){
    const {user} = useContext(AuthContext)
    
     
    return(
        
        <div>
        <h1>Header Menu Vertical</h1>
        <span>{user.email}</span>
        <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Avatar" />
        </div>
    )
}