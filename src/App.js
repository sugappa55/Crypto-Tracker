import { Route, Routes } from 'react-router-dom'
import './App.css'
import Alert from './Components/Alert'
import Header from './Components/Header'
import Coinpage from './Pages/Coinpage'
import Homepage from './Pages/Homepage'
function App() {
  return (
    <div style={{
      backgroundColor:"#14161a",
      color:"white",
      minHeight:"100vh"
    }} >
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/coins/:id" element={<Coinpage/>}/>
      </Routes>
      <Alert/>
    </div>
  )
}

export default App
