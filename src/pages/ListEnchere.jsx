import React, { useEffect, useState } from 'react';
import Navbarre from '../components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';

const ListEnchere = () =>{
    const [list, setList] = useState([]);
    const [loading , setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(`https://wsfinal-production.up.railway.app/aencheres`,{
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
              }
        })
        .then(data => data.json())
        .then(
            res =>{
                setList(res.data);
                setLoading(false);
            }
        )
    },[]);

    if (loading){
        return <div><Navbarre/>
        <p>loading...</p></div>;
    }
    console.log(list);
    const groupList = list.map(group => {
        return   <Col xs={6} md={3}>
                        <Card style={{heigth:'250px'}}>
                            <Card.Img  alt="" src={'data:image/jpeg;base64,'+group.apercuImage} />
                            <Card.Body>
                                <Card.Title>{group.nom} {group.prenom}</Card.Title>
                                <h4>{group.titre}</h4>
                                <p><b>{group.dateEnchere.split("T")[0]} {group.dateEnchere.split("T")[1]}</b></p>
                                <p><b>{group.duree} h</b></p>
                                <p>Categorie : {group.nomCat}</p>
                                <p>{group.description}</p>
                                <p><Link to={"/ficheEnchere/"+group.id} class="btn btn-primary" role="button">plus de detail</Link> </p>
                             </Card.Body>  
                        </Card>
                    </Col>    
    }
    );
    return (
        <div>
            <Navbarre/>
            <Container >
            <Row style={{marginTop:'9%'}}>
                {groupList}     
            </Row>                
                    
            </Container>
        </div>
    );

};
export default ListEnchere;
