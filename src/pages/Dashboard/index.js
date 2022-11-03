import { Link, Navigate } from 'react-router-dom'
import './dashboard.css'
import { useContext,useState} from 'react'
import { AuthContext } from '../../contexts/auth'
import { Header} from '../../components/Header' 
import { Title} from '../../components/Title' 
import { FiMessageSquare, FiPlus,FiSearch,FiEdit2 } from "react-icons/fi"

export function Dashboard(){
    const {signed} = useContext(AuthContext)
    const [chamados,setChamados] = useState([1])
    
    if(!signed){
        return( <Navigate  to = '/' /> )
    }
    
    return(
    
        <div>
        <Header/>
        <div className='content'>
            <Title name="Atendimentos">
                <FiMessageSquare size={25} />
            </Title>
            
           {
            chamados.length === 0 ? (
                <div className="container dashboard">
                <span>Nenhum chamado registrado...</span>
                <Link to='/new' className='new'>
                    <FiPlus size={25} color='#fff'/>
                    Novo Chamado 
                </Link>
                </div>
            ) : (
                <>
                <Link to='/new' className='new'>
                    <FiPlus size={25} color='#fff'/>
                    Novo Chamado 
                </Link>
              
                
                <table>
                    <thead>
                        <tr>
                            <th scope='col'> Cliente</th>
                            <th scope='col'> Assuntos</th>
                            <th scope='col'> Status</th>
                            <th scope='col'> Cadastrado em</th>
                            <th scope='col'>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Cliente"> Pizzaria do Joao </td>
                            <td data-label="Assunto"> Manutencao do computador da pizzaria </td>
                            <td data-label="Status" style={{backgroundColor:'#5cb856'}}><span className='badge'>Em andamento</span></td>
                            <td data-label="Cadastrado"> 22/05/2022</td>
                            <td data-label="#">
                                <button className='action' style={{backgroundColor: '#3583f6'}}>
                                    <FiSearch size={17} color={'#fff'}/>
                                </button>
                                <button style={{backgroundColor: '#f6a935'}}>
                                    <FiEdit2 size={17} color={'#fff'}/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                </>
            )} 
         
        </div>
        </div>
    )
}