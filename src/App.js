import './App.css';
import Login from "./pages/Login";
import LoginH from "./pages/LoginH";
import ListEnchere from "./pages/ListEnchere";
import Recherche from "./pages/Recherche";
import FicheEnchere from "./pages/FicheEnchere";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rencherir from './pages/Rencherir';
import RedirecLogin from './pages/RedirecLogin';
import "bootstrap/dist/css/bootstrap.min.css";
import Deconnect from './pages/Deconnect';
import RedirecHistorique from './pages/RedirecHistorique';
import Historique from './pages/Historique';
import "./assets/css/bootstrap.css";

function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<ListEnchere/>}> 
      </Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/loginH" element={<LoginH/>}></Route>
      <Route path="/recherche" element={<Recherche/>}></Route>
      <Route path="/historique" element={<Historique/>}></Route>
      <Route path="/redirecLogin" element={<RedirecLogin/>}></Route>
      <Route path="/listeEnchere" element={<ListEnchere/>}></Route>
      <Route path="/rencherir/:idEnch" element={<Rencherir/>}></Route>
      <Route path="/ficheEnchere/:idEnch" element={<FicheEnchere/>}></Route>
      <Route path="/redirecHistorique" element={<RedirecHistorique/>}></Route>
     <Route path="/deconnexion" element={<Deconnect/>}></Route>
    </Routes>
    <div style={{textAlign:'center',marginTop:'10%'}}><b >ETU001462-ETU001503-ETU001438</b></div>
  </BrowserRouter>
  );
}
export default App;
