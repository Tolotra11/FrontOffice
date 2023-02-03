import { useEffect, useState } from "react";
import Navbarre from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
const Rechercher = () => {
    const [listCat, setListCat] = useState([]);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [prixMinimal, setPrixminimal] = useState("");
    const [prixMaximal, setPrixmaximal] = useState("");
    const [dateDebut, setdateDebut] = useState("");
    const [dateFin, setdateFin] = useState("");
    const [categorieId, setCategorieId] = useState("");
    const [statut, setStatut] = useState("");
    useEffect(() => {
        setLoading(true);
        fetch(`https://wsfinal-production.up.railway.app/aencheres/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(
                res => {
                    setList(res.data);
                }
            );
            fetch(`https://wsfinal-production.up.railway.app/acategories`,{
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
                setListCat(res.data);
                setLoading(false);
            }
        )
    }, []);
    const recherche = async ()  => {
        fetch(`https://wsfinal-production.up.railway.app/enchere`,{
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'titre': `${titre}`,
                'description': `${description}`,
                'prixMinimal': `${prixMinimal}`,
                'prixMaximal': `${prixMaximal}`,
                'dateDebut': `${dateDebut}`,
                'dateFin': `${dateFin}`,
                'categorieId': `${categorieId}`,
                'statut': `${statut}`
              }
        })
        .then(data => data.json())
        .then(
            res =>{
                if(res.data != null){
                    setList(res.data);
                }    
            }
        )
    }; 
    if (loading) {
        return <div><Navbarre/> 
        <p>Loading...</p></div>
    }
    const groupListCat = listCat.map(group => {
        return  <option value={group.id}>{group.nomCat}</option>
    }
    );
    const groupList = list.map(group => {
        return <tr>
            <td>{group.id}</td>
            <td>{group.nomCat}</td>
            <td>{group.description}</td>
            <td>{group.prixMinimal}</td>
            <td>{group.dateEnchere}</td>
            <td>{group.duree}</td>
            <td><Link to={"/ficheEnchere/"+group.id} class="btn btn-primary" role="button">plus de detail</Link> </td>
        </tr>
    }
    );
        return (
            <div>
                <Navbarre />
                <Container style={{ marginTop: "75px" }}>
                <Row>

<p><b>Recherche sur un produit</b></p>


    <div class="row">
        <div style={{ width: "50%" }} >
            <div class="col">
                <div class="mb-3">
                    <label class="form-label" for="username"><strong>Titre</strong></label>
                    <input type='text' class="form-control" value={titre} onChange={(e) => setTitre(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label class="form-label" for="username"><strong>Description:</strong></label>
                    <input type='text' class="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
        </div>

        <div style={{ width: "50%" }}>
            <div class="col">
                <div class="mb-3"><label class="form-label" for="username"><strong>Prix Minimal:</strong></label>
                    <input type='text' class="form-control" value={prixMinimal} onChange={(e) => setPrixminimal(e.target.value)} />
                </div>
                <div class="mb-3"><label class="form-label" for="username"><strong>Prix Maximal:</strong></label>
                    <input type='text' class="form-control" value={prixMaximal} onChange={(e) => setPrixmaximal(e.target.value)} />

                </div>
            </div>
        </div>


        <div style={{ width: "50%" }}>
            <div class="col">
                <div class="mb-3"><label class="form-label" for="username"><strong>Date debut:</strong></label>
                    <input type='date' class="form-control" value={dateDebut} onChange={(e) => setdateDebut(e.target.value)} />
                </div>
                <div class="mb-3"><label class="form-label" for="username"><strong>Date fin:</strong></label>
                    <input type='date' class="form-control" value={dateFin} onChange={(e) => setdateFin(e.target.value)} />

                </div>
            </div>
        </div>



        <div style={{ width: "50%" }}>
            <div class="col">
                <div class="mb-3"><label class="form-label" for="username"><strong>Statut :</strong></label>
                    <select class="form-control" onChange={(e) => setStatut(e.target.value)}>
                        <option value="">Statut</option>
                        <option value="1">Terminer</option>
                        <option value="0">En cours</option>
                    </select>
                </div>
                <div class="mb-3"><label class="form-label" for="username"><strong>Categorie :</strong></label>
                    <select class="form-control" onChange={(e) => setCategorieId(e.target.value)}>
                        <option value="">Categorie</option>
                        {groupListCat}
                    </select>
                </div>
            </div>
        </div>

    </div>


    <div class="mb-3">
    <button className="btn btn-success" onClick={() => recherche()}>Rechercher</button>
    </div>
    {error}


</Row>





                    <Row>
                        <Table striped style={{ marginTop: "70px" }}>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Categorie</th>
                                    <th>Description</th>
                                    <th>Prix minimal</th>
                                    <th>date enchere</th>
                                    <th>duree</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {groupList}

                            </tbody>
                        </Table>
                       
                    </Row>

                </Container>
            </div>

        );
    };
    export default Rechercher;