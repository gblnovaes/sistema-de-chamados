
import { useContext } from "react"
import { AuthContext } from '../../contexts/auth'
import { Navigate } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Title } from '../../components/Title'
import { FiPlus } from "react-icons/fi"
import { useState, useEffect } from 'react'
import firebase from '../../services/firebase.config';
import './new.css'
import { toast } from "react-toastify"

export function New(){
    
    const [loadcustomers,setLoadCustomers] = useState(true)
    const [customers, setCustomers] = useState([])
    const [customerSelected, setCustomerSelected] = useState(0)
    
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [complemento,setComplemento] = useState('')
    const {signed, user} = useContext(AuthContext)
    
    
    useEffect(() => {
        async function loadcustomers(){
            
            await firebase.firestore().collection('customers')
            .get()
            .then( (snapshot) => {
                let lista = []
                snapshot.forEach((doc) =>{
                    lista.push({
                        id:doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })
                
                if(lista.length === 0){
                    console.log("Nenhum empresa encontrada")
                    setCustomers([
                        { 
                         id: '1',
                         nomeFantasia:'' 
                         }
                     ])
                     setLoadCustomers(false)
                     return
                }
                setLoadCustomers(false )
                setCustomers(lista)
            })
            .catch((error)=>{
                setLoadCustomers(false)
                console.log(`Deu erro ao retornar cliente  ${error}`)
                setCustomers([
                   { 
                    id: '1',
                    nomeFantasia:'' 
                    }
                ])
            })
            
        }
        
        loadcustomers()
    }, []);
    
    if(!signed){
        return( <Navigate  to = '/' /> )
    }
    
    function handleRegister(e) {
        e.preventDefault()
        
        firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            id: customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento:complemento,
            userId: user.uid
        })
        .then(() =>{
            setCustomerSelected(0)
            setComplemento('')
            toast.success("Chamado salvo com sucesso..")
        })
        .catch(() =>{
            toast.error("Nao possivel salvar o seu chamado ")
        })
        
    }
    
    function handleChangeSelect(e){
        setAssunto(e.target.value)
        console.log(assunto)
    }
    
    function handleOptionChange(e){
        setStatus(e.target.value)
      
    }
    
    function handleChangeCustomers(e){
        console.log(e.target.value)
        setCustomerSelected(e.target.value)
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
                
                {
                    loadcustomers ? (<input type="text" disabled={true} value="Carregando clientes.." />)
                    :(
                        <select value={customerSelected} onChange={handleChangeCustomers} >
                            {
                                customers.map((item,index) => {
                                    return(
                                        <option key={item.id} value={index}>{item.nomeFantasia}</option>
                                    )
                                })
                            }
                        </select>
                    )
                }
                
               
                
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