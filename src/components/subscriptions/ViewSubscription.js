import React, { useEffect, useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as api from "../../API/api";
import Subscribers from "./Subscribe/Subscribers";
import AddSubscribers from "./Subscribe/AddSubscribers";
import UserContext from "../../context/TeacherContext";

const ViewSubscription = () => {
  const { id } = useParams();
  // let history = useHistory();
  const { students, setStudents, userData } = useContext(UserContext);
  const [subscribers, setSubscribers] = useState([]);
  const [nonSubscribers, setNonSubscribers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchStudents(userData.token);
        setStudents(response.data);
        const res = await api.fetchSubscription(id, userData.token);
        setSubscribers(res.data.students);
      } catch (error) {
        //console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    setNonSubscribers(
      students.filter((o) => !subscribers.some((v) => v.indexNo === o.indexNo))
    );
  }, [subscribers]);
  const removeSubscriber = async (student) => {
    // //console.log(id, { stu_id: student._id }, userData.token);
    try {
      const response = await api.removeSubscribers(
        id,
        { stu_id: student._id },
        userData.token
      );
      //console.log(response);
      if (response.status === 204) {
        setSubscribers(subscribers.filter((sub) => sub._id !== student._id));
        // //console.log(students);
        toast.success("Successfully removed !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        alert("Failed");
        toast.error("Removal failed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      //console.log(response);
    } catch (error) {
      //console.log(error);
    }
  };
  const addSubscriber = async (student) => {
    try {
      const response = await api.updateSubscribers(
        id,
        { stu_id: student._id },
        userData.token
      );
      // //console.log(response);
      if (response.status === 204) {
        setSubscribers([...subscribers, student]);
        // //console.log(students);
        toast.success("Successfully added !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        alert("Failed");
        toast.error("Creation failed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      // //console.log(response);
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="profile" title="Students">
        <Subscribers
          subscribers={subscribers}
          removeSubscriber={removeSubscriber}
        />
      </Tab>
      <Tab eventKey="home" title="Add students">
        <AddSubscribers
          nonSubscribers={nonSubscribers}
          addSubscriber={addSubscriber}
        />
      </Tab>
    </Tabs>
  );
};

export default ViewSubscription;
