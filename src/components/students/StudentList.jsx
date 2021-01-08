import React,{useEffect,useContext} from 'react';
import {Table,Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import * as api  from '../../API/api'
import UserContext from "../../context/TeacherContext";
export default function StickyHeadTable() {
  let history = useHistory()
  const { students, setStudents,userData}=useContext(UserContext)
    useEffect(() => {
      const fetchData = async () =>{
        
        try {
          const response = await api.fetchStudents(userData.token)
          setStudents(response.data)
        } catch (error) {

          //console.log(error)
        }
      }
      
      fetchData()
    }, [setStudents])

    const handleDelete=async (id) =>{
      try {
        
        const res = await api.deleteStudent(id,userData.token)
        setStudents(students.filter((student) => student._id !== id));
        //console.log(students)
        
        //console.log(res)
      } catch (error) {
        
      }
    }

    const handleUpdate = (id) => {
      history.push(`/students/${id}/update`)
    }
    const handleView = (id) => {
      history.push(`/students/${id}`)
    }
    return(
      <Table responsive>
      <thead>
        <tr>
          <th>INDEX</th>
          <th>Name</th>
          <th>Batch</th>          
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {students && students.map(st => (
          <tr key={st._id}>
            <td>{st.indexNo}</td>
            <td>{st.name}</td>
            <td>{st.batch.name}</td>
            <td><Button variant="secondary" size="sm" onClick={()=>handleView(st._id)}>View</Button></td>
            <td><Button variant="info" size="sm" onClick={()=>handleUpdate(st._id)}>Update</Button></td>
            <td><Button variant="danger"  size="sm" onClick={()=>handleDelete(st._id)}>Remove</Button></td>
            
           </tr>
        ))}

      </tbody>
    </Table>
    )
  };
