
  
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Dashboard } from '../pages/Dashboard';


import { Routes,Route } from 'react-router-dom';
import { Profile } from '../pages/Profile';
import { Customer } from '../pages/Customer';
import { New } from '../pages/New';

export default function RoutesApp(){
    return(

    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/customers" element={<Customer />} />
      <Route path="/new" element={<New />} />
    </Routes>
    
    )
}