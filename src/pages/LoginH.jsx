import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login =() => {
    const [identifiant, setIdentifiant] = useState("rakoto@gmail.com");
    const [pwd, setPwd] = useState("1234");
    const [error,setError] = useState("");
    var json;
    const navigate = useNavigate();
    const log = async() =>{
        await fetch(`https://wsfinal-production.up.railway.app/login`,{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ login: `${identifiant}`,password:`${pwd}`})
        })
        .then(response => response.json())
        .then(res =>{
            json = res.data;
            if(json == null){
                let newJson = res.error;
                setError(newJson.message);
            }
            else{
                console.log('marina');
                localStorage.setItem('token', json.token);
                navigate("/historique");
            }
        })
    };
    return (
        <div className="Auth-form-container">
    <div className="Auth-form">
      <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                  <label>Email address</label>
                          <input className="form-control mt-1" type="text" value={identifiant} onChange={(e) => setIdentifiant(e.target.value)}/>
                  </div>
                  <div className="form-group mt-3">
                      <input  className="form-control mt-1" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                      <button className="btn btn-primary" onClick={log}>Connect</button>
                  </div>
                  <p className="text-center text-danger">{error}</p>
                  </div>
        </div>
    </div>

    );
};
export default Login;
