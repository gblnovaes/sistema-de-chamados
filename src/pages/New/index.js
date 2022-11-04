
import { useContext } from "react"
import { AuthContext } from '../../contexts/auth'
import { Navigate } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Title } from '../../components/Title'
import { FiMessageSquare } from "react-icons/fi"
import './new.css'

export function New(){
    
    const {signed} = useContext(AuthContext)
    
    if(!signed){
        return( <Navigate  to = '/' /> )
    }
    
    function handleRegister(e) {
        e.preventDefault()
    }
    
    
    return(
        <div>
        <Header />
        <div className='content'>
            <Title name="Novo Chamado">
                <FiMessageSquare size={25} />
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
                <select >
                    <option key={1} value={1}>Suporte 1</option>
                    <option>Visita Tecnica 2</option>
                    <option>Financeiro</option>
                </select>
                  
                <label htmlFor="">Status</label>
                <div className="status">
                    <input type="radio" name="radio" value="Aberto" className="" />
                    <span>Em Aberto</span>
                    
                    <input type="radio" name="radio" value="Progresso" className="" />
                    <span>Em Progresso</span>
                    
                    <input type="radio" name="radio" value="Atendida" className="" />
                    <span>Atendida</span>
                </div>
                
                <label htmlFor="">Complemento</label>
                <textarea  cols="30" rows="10" placeholder="Descreva seu problema(opcional) "></textarea>
                <button>Registrar Chamado</button> <br />

            </form>
            
           </div>
        </div>
        
        </div>
        
     )
}