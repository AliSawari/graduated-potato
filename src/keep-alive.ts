import axios from "axios";

export async function keepAlive(){
  try {
    const response = await axios.get('https://graduated-potato.herokuapp.com/heartbeat');
    console.log('Heartbeat status', response.data)
  } catch(e) { console.log(e) }
}