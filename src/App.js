import React, {useState, useEffect} from 'react';
import {Table, Container, Row, Col,Button, ButtonGroup, Form, Navbar } from "react-bootstrap";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import './App.css';
const api="http://localhost:5000/users"

const initialstate=
{
name:"",
email:"",
contact:"",
address:""
};


function App() {
  const [state, setState]= useState(initialstate);
  const [data, setData] = useState([]);
  const {name, email, contact, address} =state;
  const [userId, setUserId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  
  
  useEffect(() => {
  loadusers();
  },[])
  const loadusers = async () => {
  const response = await axios.get(api);
  setData(response.data);
  };
  
  const handleChange =(e) =>{
  let { name, value }= e.target;
  setState({ ...state, [name]: value });
  };
 
  const handleDelete = async (id) => {
    if(window.confirm("Are you wanted to delete that user ?")) {
    axios.delete(` ${api}/${id}`);
    toast.success("Deleted Successfully");
    setTimeout(() => loadusers(), 500);
    }
  }

  const handleUpdate = async (id) => {
    const singleUser = data.find((item) => item.id===id);
    setState({ ...singleUser });
    setUserId(id);
    setEditMode(true);
    }
 
   

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!name || !address || !email || !contact) {
  toast.error("Please fill all input field");
  } else {
    if(!editMode)
    {
      axios.post(api, state);
      toast.success ("Added Successfully");
      setState({ name:"",
      email: "", contact: "", address:""
      });
      setTimeout(() => loadusers(), 500);
    }
    else
    {
      axios.put(`${api}/${userId}`, state);
      toast.success ("Updates Successfully");
      setState({ name: "", email: "", contact:"",address:""})
      setTimeout( () => loadusers(), 500);
      setUserId(null);
      setEditMode(false);
      
    }
  

  }
  };
  

  return (
    <>
     <ToastContainer />
     <Navbar bg="primary" variant="dark" className="justify-content-center">
     <Navbar.Brand>
     Masai Top Students 
     </Navbar.Brand>
     </Navbar>
     <Container style={{ marginTop: "7@px" }}>
         <Row>
         <Col md={4}>
<Form onSubmit={handleSubmit}>
<Form.Group>
<Form.Label style={{ textAlign: "left" }}>Name</Form.Label>
<Form.Control
type="text"
placeholder="Enter the name"
name="name"
value={name}
onChange={handleChange}
/>
</Form.Group>
<Form.Group>
<Form.Label style={{ textAlign: "left" }}>Email</Form.Label>
<Form.Control
type="email"
placeholder="Enter the email"
name="email"
value={email}
onChange={handleChange}
/>
</Form.Group>
<Form.Group>
<Form.Label style={{ textAlign: "left" }}>Student Code</Form.Label>
<Form.Control
type="text"
placeholder="Enter the Student Code"
name="contact"
value={contact}
onChange={handleChange}
/>
</Form.Group>
<Form.Group>
<Form.Label style={{ textAlign: "left" }}>Rank</Form.Label>
<Form.Control
type="number"
placeholder="Enter the Rank"
name="address"
value={address}
onChange={handleChange}
/>
</Form.Group>
 <div className="d-grid gap-2 mt-2">
<Button type="submit" variant="primary" size="lg">
{editMode ? "Update":"Submit"}

</Button>
</div>

</Form>

         </Col>
         <Col md={8}>
         <Table bordered hover>
<thead>
<tr>
<th>No.</th>
<th>Name</th>
<th>Email</th>
<th>Student Code</th>
<th>Rank</th>
<th>Action</th>
</tr>
</thead>
{data && data.map((item, index) => (
<tbody key={index}>
<tr>
<td>{index+1}</td>
<td>{item.name}</td>
<td>{item.email}</td>
<td>{item.contact}</td>
<td>{item.address}</td>
<td>
<ButtonGroup>
<Button 
 onClick={()=> handleUpdate(item.id)}
style={{marginRight: "5px"}} variant="secondary">
Update
</Button>
<Button style={{marginRight: "5px"}} variant="danger"
  onClick={()=> handleDelete(item.id)}

>
Delete
</Button>
</ButtonGroup>

</td>
</tr>
</tbody>
))}
</Table>

         </Col>
         </Row>
      </Container>

   </>

  );
}

export default App;
