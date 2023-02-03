import Login from "./LoginH";
import Historique from "./Historique";
export async function validate(token){
    await fetch(`https://wsfinal-production.up.railway.app/token`,{
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
      return res.success;
    });
}
const RedirecLogin = () => {
    
    var tok = localStorage.getItem("token");
    console.log(validate(tok));
    if (tok == null || validate(tok) == null) {
        return <Login/>
    } else {
        return <Historique/>
    }
};
export default RedirecLogin;