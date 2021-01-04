import React from 'react'
import {  Button } from "react-bootstrap";
import {  useHistory } from "react-router-dom";
import ExamList from '../components/exams/ExamList'

const Exams = () => {
    let history = useHistory()
    return (
        <div>
             <Button onClick={()=> history.push("/exams/add")}> Add Exam</Button>
            <ExamList/>
        </div>
    )
}

export default Exams
