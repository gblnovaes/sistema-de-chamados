import { Link, Navigate } from 'react-router-dom'
import './dashboard.css'
import { useContext,useState,useEffect} from 'react'
import { AuthContext } from '../../contexts/auth'
import { Header} from '../../components/Header' 
import { Title} from '../../components/Title' 
import { FiMessageSquare, FiPlus,FiSearch,FiEdit2 } from "react-icons/fi"
import firebase from '../../services/firebase.config';
import { format } from 'date-fns'
const listRef = firebase.firestore().collection('chamados').orderBy('created','desc')

export function Dashboard(){
    const {signed} = useContext(AuthContext)
    const [chamados,setChamados] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadMore,setLoadMore] = useState(false)
    const [isEmpty,setIsempty] = useState(false)
    const [lastDocs,setLastDocs] = useState()
    
    
   
  
    useEffect(() =>{
        
     
        loadingChamados()
         return () => {}
    },[])
  
    if(!signed){
        return( <Navigate  to = '/' /> )
    }
    
    
    async function loadingChamados(){
        await listRef.limit(5).get()
        .then((snapshot) => {
          console.log(snapshot.docs.length.toString())
           updateState(snapshot)
        })
        .catch((error) => {
          console.log(error)  
          setLoadMore(false)
        })
        setLoading(false)
    }
    
    
  
      
 
    
    function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0  
        if(!isCollectionEmpty) {
            let lista = []
            
            snapshot.forEach((doc) =>{
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    userId: doc.data().userId,
                    created: doc.data().created,
                   createdFormated: format(doc.data().created.toDate(),'dd/MM/yyyy'),
                    status: doc.data().status,
                    complement: doc.data().complemento
                })
            })
            
            const lastDoc = snapshot.docs[snapshot.docs.length - 1] //pegando o ultmo documento encontrado
            
            setChamados(chamados => [...chamados,...lista])
            
            setLastDocs(lastDoc)
        }else{
            setIsempty(true)
        }
        
        setLoadMore(false)
        
    } 
    
    
    if(loading){
        return(
            <div>
                <Header/>
                <div className='content'>
                    <Title name="Atendimentos">
                        <FiMessageSquare size={25} />
                    </Title>
                </div>
                
                <div className="container dashboard">
                        <span>Nenhum chamado registrado...</span>
                </div>
            </div>
        )
    }
    
    return(
    
        <div className='back'>
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
                       {
                        chamados.map((chamado,index) =>{
                            
                            return(
                                <tr key={index}>
                                    <td data-label="Cliente"> {chamado.cliente} </td>
                                    <td data-label="Assunto"> {chamado.assunto} </td>
                                    <td data-label="Status"><span style={{backgroundColor:chamado.status==='Aberto'?'#5cb856':'#888'}} className='badge'>{chamado.status}</span></td>
                                    <td data-label="Cadastrado">{chamado.createdFormated}</td>
                                    <td data-label="#">
                                        <button className='action' style={{backgroundColor: '#3583f6'}}>
                                            <FiSearch size={17} color={'#fff'}/>
                                        </button>
                                        <button className='action' style={{backgroundColor: '#f6a935'}}>
                                            <FiEdit2 size={17} color={'#fff'}/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                       }
                        
                        
                    </tbody>
                </table>
                
                </>
            )} 
         
        </div>
        </div>
    )
}