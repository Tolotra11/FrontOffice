import Login from "./Login";
import { validate } from "./RedirecHistorique";
import Rencherir from "./Rencherir";
const RedirecLogin = () => {
    var tok = localStorage.getItem("token");
    if (tok == null || validate(tok)==null) {
        return <Login/>
    } else {
        return <Rencherir/>
    }
};
export default RedirecLogin;