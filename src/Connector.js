import { getDoc } from 'firebase/firestore'
import db from './../firebaseConfig'

function Connector(
  
) {
  const constractor = async () => {
    const data = await getDoc(db, "tas-data", "primary");
    if(data != null){
      console.log("loading succesed");
    }else{
      console.error("loading failed")
    }
  }
  constractor();
}
export default Connector