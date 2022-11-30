import axios from "axios"
import { useEffect, useState } from "react";
import './app.css'

function App() {

  const [data, setData] = useState([])
  const [newBeer, setnewBeer] = useState({
    name: "",
    tagline: "", 
    first_brewed: "",
    description: "",
    image_url: "",
    ph: 0,
    brewers_tips: "", 
    contributed_by: ""
  })

  useEffect(() => {
    axios
      .get('http://localhost:5000/beers')
      .then(res => setData(res.data))
  }, [])

  const sendBeer = () => {
    axios.post('http://localhost:5000/postbeer', 
    newBeer
    )
    .then((response) => {
      alert(response.data)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  return (
    <div className="App">
      <form>
        {Object.keys(newBeer).map(label => 
          <>
          <label>{label}</label>
          <input type="text" name="label" onChange={(e) => setnewBeer({...newBeer, [label] : e.target.value})}></input>
          </>
        )}
      </form>
      <button type='button' onClick={() => sendBeer()}>SEND NEW BEER</button>
      <div id="beer-container">
        {data?.map(beer => 
          <div className="beer-card">
            <h3>{beer.name}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
