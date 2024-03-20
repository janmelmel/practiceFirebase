import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

interface User {
  id: string;
  name: string; 
  age: number; 
  // Add other properties of your user object here
}

function App() {
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState("0")
  const [users, setUsers] = useState<User[]>([]); // Specify User[] as the type
  const usersCollectionRef = collection(db, "users");

  const  createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, age: Number(newAge)})
  }

  
  const updateAge = async (id: string, age: number) => {
    const userDoc = doc(db, "users", id)
    const newFields = {age: age+1}
    await updateDoc(userDoc, newFields)
  }

  const deleteUser = async (id: string) => {
    await deleteDoc(doc(db, "users", id));
  }
  
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      const usersData = data.docs.map((doc) =>{
        const dataFields = doc.data()
        console.log("dataFields ", dataFields )
        return {
          id: doc.id,
          name: dataFields.name, 
          age: dataFields.age
        }
    }) 
      setUsers(usersData as User[]);

    } 
    getUsers();
    
  }, []);

  useEffect(() =>{
    console.log("user   state has been updated", users)
  }, [users]);
  return (
    <div className="App">
      <input 
        placeholder='Name' 
        type="text" 
        onChange={(event) => {
          setNewName(event.target.value);
        }} 
      />
      <input 
        placeholder='Age' 
        type="number" 
        onChange={(event) => {
          setNewAge(event.target.value);
        }} 
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => (
        <div key={user.id}>
          <h1>Name: {user.name}</h1>
          <h1>Age: {user.age}</h1>
          <button onClick={() => {updateAge(user.id, Number(user.age))}}>Increase Age</button>
          <button onClick={() => {deleteUser(user.id)}}> Delete </button>
        </div>
      ))}
    </div>
  );
}

export default App;
