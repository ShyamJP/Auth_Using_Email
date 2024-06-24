import './App.css'
import {Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import ResetPassword from './Pages/ResetPassword'
import ForgotPassword from './Pages/ForgotPassword'

function App() {
  return (
    <>
     <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/reset/:token' element={<ResetPassword/>}></Route>
        <Route path='/forgot' element={<ForgotPassword/>}></Route>
        
     </Routes>
    </>
  )
}

export default App
