import './profile.css'
import { Navigate } from 'react-router-dom'
import { useContext,useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Header } from '../../components/Header' 
import {Title} from '../../components/Title' 
import avatar from '../../assets/avatar.png'
import { FiSettings,FiUpload } from "react-icons/fi"
import firebase from '../../services/firebase.config';
import { toast } from 'react-toastify';

export function Profile(){
    
    const {signed,signOut,user,setUser,saveUser} = useContext(AuthContext)
    const [avatarUrl,setAvatarUrl] = useState(user && user.avatarUrl)
    const [name,setName] = useState(user && user.name)
    const [email,setEmail] = useState(user && user.email)
    const [imageAvatar,setImageAvatarUrl] = useState(user && user.email)
    
    if(!signed){
        return( <Navigate  to = '/' /> )
    }
    
    function handleSave(e) {
        e.preventDefault()
        
        if(name === '' ){
            toast.warning('Preencha o campo nome')
            return
          }
        
        if(avatarUrl=== null && name !== ''){
            firebase.firestore().collection('users').doc(user.uid).update({
                name: name
               }).then(() => {
                
                let data = {
                    ...user,
                    name:name
                }
                saveUser(data)
                setUser(data)
                toast.success('Nome atualizado com sucesso')
                })
        }else if(name !== null && avatarUrl !== null){
            handleUpload()
        }
        
        
    }
    
    
    async function handleUpload(){
        await firebase.storage().ref(`images/${user.uid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async () => {
            await firebase.storage().ref(`images/${user.uid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async (url) => {
                let urlFoto = url
                
                await firebase.firestore().collection('users').doc(user.uid)
                .update({
                    avatarUrl: urlFoto,
                    name: name,
                }).then(async () =>{
                    let data ={
                        ...user,
                        name:name,
                        avatarUrl:urlFoto
                        
                    }
                    setUser(data)
                    saveUser(data)
                    toast.success('Profile atualizado com sucesso')
                })
                
                
            })
            
          console.log("Foto Enviada com sucesso.")  
        })   
    }
    
    
    function handleFile(e){
        // console.log(e.target.files[0])
        if(e.target.files[0]){
            const image = e.target.files[0]
            
            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatarUrl(image)
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }else{
                toast.error("Envie uma imagem PNG ou JPEG")
                setImageAvatarUrl(null)
                return 
            }
            
        }
    }
    
    
    return(
    <div>
        <Header />
        
        <div className="content">
            <Title name="Meu Perfil" >
                <FiSettings size={25} />
            </Title>
            
            <div className="container">
            <form className="form-profile" onSubmit={handleSave}>
                
                <label className='label-avatar'>
            
                <span>
                    <FiUpload color='#fff' size={25}/> 
                     <input type="file" accept='image/*' onChange={handleFile} />
                </span> 
                <br />

                {avatarUrl === null ? 
                    <img width={200} height={200} src={avatar} 
                    alt="Foto do Perfil do usuário" /> :  <img width={250} height={250} src={avatarUrl} 
                    alt="Foto do Perfil do usuário" />
                }
                </label>
                
                <label htmlFor="">Nome</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder=""/> <br />
                
                <label htmlFor="">Email</label>
                <input type="text" disabled value={email} onChange={(e) => setEmail(e.target.value)} placeholder=""/> <br />
                
                <button className='btn-logout'>Salvar</button> <br />
                
                
               
            </form>
            
           
            
          
        </div>
        
        <div className='footer-container'>
            <button onClick={() => signOut() }>Sair</button>
        </div>
    </div>
        
        
    </div>
    )
}