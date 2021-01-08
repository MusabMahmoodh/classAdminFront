import React, { useEffect, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as api from "../../API/api";
import UserContext from "../../context/TeacherContext";
export default function ExamList() {
  const { exams, setExams, userData } = useContext(UserContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchExams(userData.token);
        // //console.log(response.data);
        setExams(response.data);
        // //console.log(response.data);
      } catch (error) {
        //console.log("Error");
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const res = await api.deleteExam(id);
      setExams(exams.filter((exam) => exam._id !== id));
      // //console.log(exams);
      // //console.log(res);
    } catch (error) {}
  };
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Exam</th>
          <th>Batch</th>
          <th>Subscription</th>
          {/* <th>Question_type_id</th> */}
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {exams &&
          exams.map((st) => (
            <tr key={st._id}>
              <td>{st.name}</td>
              <td>{st.batch.name}</td>
              <td>{st.subscription.name}</td>
              {/* <td>{st.question_type_id}</td> */}
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => history.push(`/exams/${st._id}`)}
                >
                  View
                </Button>
              </td>
              <td>
                <Button variant="info" size="sm">
                  Update
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(st._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
