import { createContext,useState,useEffect } from 'react';
import  firebase  from '../services/firebase.config'

export const AuthContext  = createContext({ })

export default function AuthProvider({ children }){
   
    const [user, setUser] = useState(null)
    const [signed,setSigned] = useState(false)

    
    useEffect(() => {
        async function checkLogin(){
                firebase.auth().onAuthStateChanged(user =>{
                if(user != null){
                    loadStorage()
                }
                
            })
        }
        
        checkLogin()
         
    }, []);
    
    
    async function loadStorage() {
        let userInfo = localStorage.getItem('@SistemaUser')
                
        if(userInfo){
            setUser(JSON.parse(userInfo))
            setSigned(true)
        }else{
            setSigned(false)
        }
        
    }
     
    async function saveUser(data){
        localStorage.removeItem('@SistemaUser')
        localStorage.setItem("@SistemaUser",JSON.stringify(data))  
        setUser(data)
        setSigned(true)  
    }
    
 
    async function signOut(){
        await firebase.auth().signOut()
        localStorage.removeItem('@SistemaUser')
        setSigned(false)
    }
    
    
    return(
        <AuthContext.Provider value={{signed:signed,  user:user, signOut,saveUser,setUser}}>
       
          {children}    
            
        </AuthContext.Provider>
    )
    
   
    
}

