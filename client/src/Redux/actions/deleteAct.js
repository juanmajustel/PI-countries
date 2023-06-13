import axios from "axios";




export default function deleteAct(idAct){
    return async function(){     
        return await axios.post(`http://localhost:3001/activities/delete/${idAct}`) 
    }    
};