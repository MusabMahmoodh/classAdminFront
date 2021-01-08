import React, { useEffect, useContext, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as api from "../../API/api";
import UserContext from "../../context/TeacherContext";
export default function Subscriptions(props) {
  const { subscriptions, setSubscriptions, userData } = useContext(UserContext);
  const [selectdSubscriptions, setSelectedSubscriptions] = useState([]);

  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchSubscriptions(userData.token);
        setSubscriptions(response.data);
        // //console.log(response.data);
        if (props.batchId) {
          setSelectedSubscriptions(
            subscriptions.filter((sub) => sub.batch._id === props.batchId)
          );
        } else {
          setSelectedSubscriptions(subscriptions);
        }
      } catch (error) {
        //console.log("Error");
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const res = await api.deleteSubscription(id, userData.token);
      setSubscriptions(
        subscriptions.filter((subscription) => subscription._id !== id)
      );
      setSelectedSubscriptions(
        selectdSubscriptions.filter((subscription) => subscription._id !== id)
      );
    } catch (error) {}
  };
  const handleView = (id) => {
    history.push(`/subscriptions/${id}`);
  };
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Batch</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {selectdSubscriptions &&
          selectdSubscriptions.map((st) => (
            <tr key={st._id}>
              <td>{st.name}</td>
              <td>{st.batch.name}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleView(st._id)}
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
