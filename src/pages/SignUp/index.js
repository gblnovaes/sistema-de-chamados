import './signup.css';
 import login_register from '../../assets/login_register.svg';
 import logo_bg from '../../assets/logo.svg';
 import img_users from '../../assets/users.svg';
 import img_lock from '../../assets/lock.svg';
 import { Link,useNavigate } from 'react-router-dom';
 import firebase from '../../services/firebase.config'
 import {useState} from 'react'

 
export function SignUp(){

 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const [confirmPassword,setConfirmPassword] = useState('')
 const navigate = useNavigate()


 async function handleSubmit(e){
  e.preventDefault()
    
  if(email === '' ){
    alert('Preencha o campo email');
    return
  }
  
  if(password === '' ){
    alert('Preencha o campo password');
    return
  }
  
  if(confirmPassword === '' ){
    alert('Preencha o campo Confirmar Password');
    return
  }
  
  if(password!== confirmPassword){
    alert('Campos Senha e Confirmar Senha precisam ser iguais');
    return 
  }

  await firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(()=>{
    navigate('/dashboard')
    setEmail('')
    setPassword('')
  })
  .catch((error)=>{
    if(error.code === 'auth/weak-password'){
      alert('Senha Fraca')
    }else if(error.code==='auth/email-already-in-use'){
      alert('Esse email ja existe')
    }
  })
}
    return(
        <div className="container">
            <div className="login-bg-container">
               <img src={login_register} alt="Imagem de Login"/>
            </div>
            <div className="login-container">
            
              <img className='logo_img' src={logo_bg} alt="Logo" />
              
              <form onSubmit={handleSubmit}>
                
              <div className="input-container"> 
                <img src={img_users} className='' alt='Icon User' />
                <input type="text" placeholder='Login' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <div className="input-container"> 
            <img src={img_lock} className='' alt='Icon Lock' />
              <input type="text" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            <div className="input-container"> 
            <img src={img_lock} className='' alt='Icon Lock' />
              <input type="text" placeholder='Confirmar Senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            
            <button className='btn-register' >Cadastre-se</button>
            <Link className='btn-nova-conta' to='/'>Nao te conta ? Crie uma agora.</Link>
            
              </form>
              
            </div>
        </div>
    )
    
}