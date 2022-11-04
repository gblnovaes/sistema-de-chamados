
import { useContext } from "react"
import { AuthContext } from '../../contexts/auth'
import { Navigate } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Title } from '../../components/Title'
import { FiPlus } from "react-icons/fi"
import { useState, useEffect } from 'react'
import './new.css'

export function New(){
    
    const [loadcustomers,setLoadCustomers] = useState(true)
    const [customer, setCustomer] = useState([])
    const [customerSelected, setCustomerSelected] = useState(0)
    
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [complemento,setComplemento] = useState('')
    const {signed, user} = useContext(AuthContext)
    
    
    useEffect(() => {
        async function loadcustomers(){
            
        }
        
        loadcustomers()
    }, []);
    
    if(!signed){
        return( <Navigate  to = '/' /> )
    }
    
    function handleRegister(e) {
        e.preventDefault()
    }
    
    function handleChangeSelect(e){
        setAssunto(e.target.value)
        console.log(assunto)
    }
    
    function handleOptionChange(e){
        setStatus(e.target.value)
      
    }
 
 
    return(
        <div>
        <Header />
        <div className='content'>
            <Title name="Novo Chamado">
                <FiPlus size={25} />
            </Title>
            
            <div className="container">
           <form className="form-profile" onSubmit={ handleRegister} >
                
            
                <label htmlFor="">Cliente</label>
                <select >
                    <option key={1} value={1}>Cliente 1</option>
                    <option>Cliente 2</option>
                    <option>Cliente 3</option>
                    <option>Cliente 4</option>
                </select>
                
                <label htmlFor="">Assunto</label>
                <select  value={assunto} onChange={ handleChangeSelect }>
                    <option key={1} value={1}>Suporte</option>
                    <option>Visita Tecnica</option>
                    <option>Financeiro</option>
                </select>
                  
                <label htmlFor="">Status</label>
                <div className="status">
                    <input type="radio"  value="Aberto" checked={status === 'Aberto' } name="radio"  onChange={  handleOptionChange }/>
                    <span>Em Aberto</span>
                    
                    <input type="radio" name="radio" value="Progresso" checked={status === 'Progresso' }   onChange={ handleOptionChange } />
                    <span>Em Progresso</span>
                    
                    <input type="radio" name="radio"  value="Atendida"   checked={status === 'Atendida' }  onChange={  handleOptionChange }/>
                    <span>Atendida</span>
                </div>
                
                <label htmlFor="">Complemento</label>
                <textarea  placeholder="Descreva seu problema(opcional) " value={complemento} onChange={(e) => setComplemento(e.target.value)}></textarea>
                <button>Registrar Chamado</button> <br />

            </form>
            
           </div>
        </div>
        
        </div>
        
     )
}