import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Navbarre from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Rencherir = () => {
    const navigate = useNavigate();
    var tok = localStorage.getItem("token");
    if (tok == null) {
        navigate("/redirectLogin");
    }
    const [mise, setMise] = useState('');
    const [max,setMax] = useState('');
    const [error, setError] = useState('');
    let idEnch = sessionStorage.getItem("idEnchere");
    useEffect(()=>{
        fetch(`https://wsfinal-production.up.railway.app/mise/${idEnch}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(res => {
            setMax(res.data);
        });
    },[]);
    const miserEnchere = async () => {
        setError("");
        await fetch(`https://wsfinal-production.up.railway.app/encheres/${idEnch}/rencherir`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`,
                'mise': `${mise}`
            }
        })
            .then(response => response.json())
            .then(res => {
                //console.log(res);
                let val = res.success;
                if (val == null) {
                    setError(res.error.message);
                }
                else {
                    navigate("/rencherir/"+idEnch);
                }
            });
    };
    return (
        <div>
            <Navbarre />
            <Container style={{ marginTop: "75px" }}>
                <Row>
                    <Col md={5}></Col>
                    <Col md={5}>
                        <p><b>Rencherir sur un produit</b></p>
                        Derniere mise:{max} Ariary
                        <p><input type='text' value={mise} onChange={(e) => setMise(e.target.value)} /></p>
                        <br />
                        <p><button className="btn btn-success" onClick={() => miserEnchere()}>Confirmer</button></p>
                        {error}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
};
export default Rencherir;