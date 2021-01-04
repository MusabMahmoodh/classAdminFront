import React,{useEffect,useState,useContext} from 'react'
import * as api from "../API/api.js";
import UserContext from "../context/TeacherContext";
import DashPage  from "../components/dahsboard/DashPage"
import AddBatch  from "../components/dahsboard/AddBatch"

const Dashboard = () => {
    const {
        setBatches,
        batches,
        userData,
      } = useContext(UserContext);
    useEffect(()=>{
        const fetchData = async () => {
            const response = await api.fetchBatches(userData.token);
            setBatches(response.data);
        }
        fetchData()
    },[])
    return (
        <div>
            <AddBatch />
            <DashPage batches={batches}/>
            
        </div>
    )
}

export default Dashboard
