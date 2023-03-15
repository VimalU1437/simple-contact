import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [state,setState] = useState([]);


  useEffect(()=>{
    fCall();
  },[]);

  async function fCall(){
    const res = await fetch("https://dummyjson.com/users?limit=10");
    const data = await res.json();
    setState(()=>{
      let temp = [...data.users];
      temp.forEach(elm=>{
        elm.toggled = false;
      })
      // console.log(temp);
      return temp;
    });
    // console.log(data.users);
  }
  function togClick(id){
    setState(pre=>{
      let temp = [...pre];
      temp.forEach(elm=>{
        if(elm.id === id){
          console.log(elm);
          elm.toggled = true;
          return;
        }
      })
      return temp;
    })

  }
  return (
    <div className="App">
      {state.length !== 0 && state.map(elm=>{
        return <div className='container' key={elm.id} >
          <img className='pro-img' src={elm.image} alt={`${elm.firstName}'s pic`} />
          <div className='info-div'>
            <p>Name : {`${elm.firstName} ${elm.lastName}`}</p>
            <p>Email : {elm.email}</p>
            {
              elm.toggled ? <p>{elm.age}</p> :<button onClick={()=>togClick(elm.id)}>Toggle age</button> 
            }
          </div>
        </div>
      })}

    </div>
  );
}

export default App;
