 import './signin.css';
 import login_bg from '../../assets/login_bg.svg';
 import logo_bg from '../../assets/logo.svg';
 import img_users from '../../assets/users.svg';
 import img_lock from '../../assets/lock.svg';
 import firebase from '../../services/firebase.config';
 
 import { Link,useNavigate } from 'react-router-dom';
 import { useContext } from 'react'
 import { AuthContext } from '../../contexts/auth'
 import { useState } from 'react';
 import { toast } from 'react-toastify';



export function SignIn(){
  
  const [email,setEmail] =  useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate();
  const {signed,saveUser} = useContext(AuthContext)


  async function handleSubmi(e) {
    e.preventDefault();
    
    if(email === '' ){
      toast.warning('Preencha o campo email')
      return
    }
    
    if(password === '' ){
      toast.warning('Preencha o campo password')
      return
    }
    
    
    await firebase.auth().signInWithEmailAndPassword(email,password)
      .then((response) =>{
                
        firebase.firestore().collection('users').doc(response.user.uid).get().then((response) =>{
          let userData = {
            uid: response.data().uid,
            avatarUrl: response.data().avatarUrl !== null ? response.data().avatarUrl : null,
            name: response.data().name !== null ? response.data().name : null,
            email: response.data().email,
          }
            saveUser(userData)
              toast.success( `Seja Bem Vindo!!! - ${response.data().name !== null ? response.data().name : null}`)
         }).catch((error) =>{
          toast.error('Nao foi possivel encontrar dados de Usuario :-(')
         })
      })
      .catch((error)=>{
        console.log(error)
        toast.error('E-mail ou Senha Inválidos.!!!')
        return
      })
    }
    
    if(signed){
      navigate('/dashboard')
    }
  
    return(
          
          <div className="container">
              
            <div className="login-bg-container">
               <img src={login_bg} alt="Imagem de Login"/>
            </div>
            
            <div className="login-container">
              <img className='logo_img' src={logo_bg} alt="Logo" />
            
            <form onSubmit={handleSubmi}>
            
            <div className="input-container"> 
               
                <img src={img_users} className='' alt='Icon User' />
                    <input type="text" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                
                <div className="input-container"> 
                <img src={img_lock} className='' alt='Icon Lock' />
                  <input type="text" placeholder='Senha' value={password} onChange={ (e) => setPassword(e.target.value)} />
                </div>
                
                <button className='btn-entrar'>ENTRAR</button>
                <Link className='btn-nova-conta' to='/register'>Nao tem conta ? Crie uma agora.</Link>
            </form> 
            </div>
            
        </div>
     
    )
    
}