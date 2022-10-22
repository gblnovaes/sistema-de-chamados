import { createContext,useState,useEffect } from 'react';
import  firebase  from '../services/firebase.config'

export const AuthContext  = createContext({ })

export default function AuthProvider({ children }){
   
    const [user, setUser] = useState(null)
    const [signed,setSigned] = useState(false)

    
    useEffect(() => {
        async function checkLogin(){
            await firebase.auth().onAuthStateChanged(user =>{
                if(user){
                    const userData ={
                        uid: user.uid,
                        email: user.email
                    }
                    localStorage.setItem("@SistemaUser",JSON.stringify(userData)) 
                    setUser(user)
                    setSigned(true)
                }else{
                    setSigned(false)
                }
            })
        }
        
        checkLogin()
         
    }, []);
    
    
    async function signOut(){
        await firebase.auth().signOut()
        console.log("Deslogado " )
        localStorage.removeItem('@SistemaUser')
    }
    
    
    return(
        <AuthContext.Provider value={{signed:signed,  user:user, signOut}}>
       
          {children}    
            
        </AuthContext.Provider>
    )
    
   
    
}

