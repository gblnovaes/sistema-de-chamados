import './signup.css';
 import login_register from '../../assets/login_register.svg';
 import logo_bg from '../../assets/logo.svg';
 import img_users from '../../assets/users.svg';
 import img_lock from '../../assets/lock.svg';
 import { Link,useNavigate } from 'react-router-dom';
 import firebase from '../../services/firebase.config'
 import {useState} from 'react'
 import { toast } from 'react-toastify';
 import {useContext} from  'react'
 import { AuthContext } from '../../contexts/auth';


 
export function SignUp(){

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const {saveUser} = useContext(AuthContext);


 async function handleSubmit(e){
  e.preventDefault()
    
  if(email === '' ){
    toast.warning('Preencha o campo email')
    return
  }
  
  if(password === '' ){
    toast.warning('Preencha o campo senha')
    return
  }
  
  if(name === '' ){
    toast.warning('Preencha o campo nome')
    return
  }


  await firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(async (value) =>{
        
    let uid = value.user.uid

    await firebase.firestore().collection('users').doc(uid).set({
      name: name,
      avatarUrl: null,
      email: email,
      uid: uid
    }).then(() => {
      
      let data = {
        uid: uid,
        avatarUrl: null,
        name: name,
        email: email,
      }
      
      saveUser(data)
    })
    
    navigate('/dashboard')
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
              <input type="text" placeholder='Seu nome' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            
              <div className="input-container"> 
                <img src={img_users} className='' alt='Icon User' />
                <input type="text" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <div className="input-container"> 
            <img src={img_lock} className='' alt='Icon Lock' />
              <input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            
            
            <button className='btn-register' >Cadastre-se</button>
            <Link className='btn-nova-conta' to='/'>Nao tem conta ? Crie uma agora.</Link>
            
              </form>
              
            </div>
        </div>
    )
    
}