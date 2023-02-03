import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarre from "../components/Navbar";
import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from "react-bootstrap";
const FicheEnchere = () => {
    const navigate = useNavigate();
        let { idEnch } = useParams();
    sessionStorage.setItem("idEnchere", idEnch);
    const url = "https://wsfinal-production.up.railway.app/fiches/"+idEnch;
    const [group, setGroup] = useState([]);
    const [loading,setLoading] = useState(false);
    const [donnee,setDonnee] = useState([]);
    const fetchData =   () => {
        setLoading(true);
           fetch(`${url}`,{
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                            
                          }
                    }).then(response => response.json())
                    .then(json => {
                       setGroup(JSON.parse(json.data));
                       setDonnee(json.photo);
                       setLoading(false);
                    }
                ).catch(err => {
                    navigate("/");
                })
    };
    useEffect(() =>{
         fetchData();
    },[]);
    if (loading) {
        return <div><Navbarre/> 
        <p>Loading...</p></div>;
      };
      const photos = donnee.map((image, index) => {

        return <Col xs={12} md={6}>
            <Card><Card.Img  src={'data:image/jpeg;base64,'+image.photo} /></Card>
        </Col>   
        
                
        });
    const groupList = group.map((data) => {
        return <Card>
          <Card.Title style={{textAlign: 'center'}}><h2>{data.titre}</h2></Card.Title>
        <Card.Body>
            <b style={{textAlign: 'center'}}>{data.dateenchere}</b>
            <br/>
            <b>Durée: {data.duree} heures</b>
            <br/>
            <b>Prix de départ: {data.prixdepart} Ariary</b>
            <p style={{marginTop:'35px'}}>
                {data.description}
            </p>
        </Card.Body>
        </Card>
    });

    const mystyle = {
        width:"150px",
        height:"100px",
      };
    return (
        <div>
            <Navbarre />
            <Container style={{ marginTop: "15%" }}>
                {groupList}
                <Row>
                {photos}
                </Row>
                <Link to={"/redirecLogin"} ><button className="btn btn-primary" style={{marginTop:'25px',marginLeft:'80%'}} >Rencherir sur ce produit</button></Link>
            </Container>
        </div>

    );
};
export default FicheEnchere;