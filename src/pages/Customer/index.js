import { Navigate } from 'react-router-dom'
import './customer.css'
import {useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import {Header} from '../../components/Header' 
import { Title } from '../../components/Title'
import { FiUser } from "react-icons/fi"

export function Customer(){
    const {signed} = useContext(AuthContext)
    const [nomeFantasia,setNomeFantasia] = useState('')
    const [cnpj,setCnpj] = useState('')
    const [endereco,setEndereco] = useState('')
   
    if(!signed){
        return( <Navigate  to = '/' /> )
    }
    
    function handleSave(e){
        e.preventDefault()
        
        alert(nomeFantasia,cnpj)
    }
    
    return(
    
        <div>
        <Header/>
        
        <div className="content">
            <Title name="Clientes">
                <FiUser  size={25} />
            </Title>
            
            
           <div className="container">
           <form className="form-profile" onSubmit={handleSave} >
                
            
                <label htmlFor="">Nome Fantasia</label>
                <input type="text" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} placeholder=""/> <br />
                
                <label htmlFor="">CNPJ</label>
                <input type="text"  value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder=""/> <br />
                  
                <label htmlFor="">Endereço</label>
                <input type="text"  value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder=""/> <br />
                
                <button>Salvar</button> <br />

            </form>
            
           </div>
        </div>
        
        </div>
    )
}