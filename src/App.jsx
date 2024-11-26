import React, { useEffect, useState } from 'react'

export default function App() {
  const [user, setUser] = useState([]);


  useEffect(()=>{
    fetch('http://localhost:5000/user')
     .then(res => res.json())
     .then(data => setUser(data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const age = form.age.value;
    const user = { name, age}
    console.log(user);

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const newUsers = [...user, data]
      setUser(newUsers);
      form.reset();
    })
    
  }




  return (
  <>
    <h2>This is font end site in express js</h2>
    <h2>All user here now {user.length}</h2>

    <br />

    <form onSubmit={handleSubmit}>

    <input type="text" name="name" id="" /> <br />
    <input type="text" name="age" id="" /> <br /> <br />
    <input type="submit" value="Add user" id="" /> <br />

    </form>

    {
      user.map((item, index) => (
        <div key={index}>
          <h3>Id : {item.id}</h3>
          <h3>Name: {item.name}</h3>
          <h3>Age: {item.age}</h3>
        </div>
      ))
    }
  </>
  )
}
