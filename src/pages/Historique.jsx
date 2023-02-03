import React, { useEffect, useState } from 'react';
import Navbarre from '../components/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

const Historique = () => {
    const navigate = useNavigate();
    function validate(token){
        fetch(`https://wsfinal-production.up.railway.app/token`,{
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token':`${token}`
              },
           
        })
        .then(response => response.json())
        .then(res =>{
           if(res.success == null){
               navigate("/redirecHistorique");
           }
        });
    }
    var tok = localStorage.getItem("token");
    console.log(localStorage.getItem("token"));
    if (tok == null) {
        navigate("/redirecHistorique");
    }
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        validate(tok);
        setLoading(true);
        fetch(`https://wsfinal-production.up.railway.app/historiques`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
            }
        })
            .then(data => data.json())
            .then(
                res => {
                    console.log(res.data);
                    setList(res.data);
                    setLoading(false);
                }
            )
    }, []);

    if (loading) {
        return <div><Navbarre />
            <p>loading...</p></div>;
    }
    const groupList = list.map(group => {
        return <Row style={{marginTop:'5%'}}>
            <Col xs="1" md="2"></Col>
            <Col style={{borderRadius:'15px',boxShadow:'1px 2px 9px grey'}}>
                <p><b style={{fontSize:'18px'}}> {group.nom} {group.prenom}</b>(proprietaire)</p>
                <b style={{fontSize:'35px'}}>{group.titre}</b>
                <p><b>date de mouvement</b> :{group.dateMouvement}</p>
                <p><b>Valeur de votre enchere:</b>{group.valeurenchere} Ariary</p>
            </Col>
            <Col md="2"></Col>
            
        </Row>
    }
    );
    return (
        <div>
            <Navbarre/>
            <h2 style={{textAlign:'center'}}>Vos historiques</h2>
           {groupList}
        </div>
        
    );

};
export default Historique;
