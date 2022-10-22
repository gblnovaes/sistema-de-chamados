import {BrowserRouter} from 'react-router-dom';
import RoutesApp from './routes'
import './global.css'
import AuthProvider from './contexts/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function App() {

  return (
  <AuthProvider>
    <BrowserRouter>
      <ToastContainer 
      autoClose={5000} />
      <RoutesApp />
    </BrowserRouter>
  </AuthProvider>

  );
}

export default App;
