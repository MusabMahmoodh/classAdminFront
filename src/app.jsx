
import React,{ useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,

  } from "react-router-dom";
  import ProtectedRoute from "./ProtectedRoute.js";
  import * as api from "./API/api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/dahsboard/Header"  
import Dashboard from './routes/dashboard'
import Students from './routes/students'
import UpdateStudent from './routes/UpdateStudents'
import Subscriptions from './routes/subscriptions'
import Exams from './routes/exams'
import ViewBatch from './routes/viewBatch'
import AddExam from './routes/addExam'
import viewSubscription from './routes/viewSubscription'
import ViewExam from './routes/viewExam'
import UpdateExam from './routes/updateExam'
import Login from "./components/auth/Login";
import ViewStudent from "./components/students/ViewStudent";
import ViewSubscription from "./components/subscriptions/ViewSubscription";

import UserContext from "./context/TeacherContext";




toast.configure()
 function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [students, setStudents] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [exams, setExams] = useState([]);
  const [batches, setBatches] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const login = () => {
 
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await api.validate(token);
      if (tokenRes.data) {
        const userRes = await api.fetchTeacher(token);
        // //console.log(userRes);
        setUserData({
          token,
          user: userRes.data._id,
        });
        login();
        
      }
    };

    checkLoggedIn();
  }, []);
  
  const addStudent = (student) => {
    // //console.log(student);
    setStudents([...students, student]);
  };
  const addSubscription = (subscription) => {
    setSubscriptions([...subscriptions, subscription]);
  };
  return (
      
      
      <Router>
        {isAuthenticated?<Redirect to="/"/>:<Redirect to="/login"/>}
      <UserContext.Provider
          value={{ userData, setUserData, logout, isAuthenticated ,students,
            setStudents,
            addStudent,
            subscriptions,
            setSubscriptions,
            addSubscription,
            exams,
            setExams,
            batches,
            setBatches,login}}
        >
        <Header/>
        
        <div className="container">
        <Switch>
          {/* First route */}
          <Route path="/" exact>
        
                {isAuthenticated ? (
                 
                 <>
      
                 <Redirect to="/dashboard" />
                 </>
                   
               
                ) : (
              
                <>
                {/* {//console.log("not authenticated")} */}
                <Redirect to="/login" />
                </>
                    
             
                    
                
                )}
              </Route>
              {/* Protected routes */}
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/dashboard"
                logout={logout}
                component={Dashboard}
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/students/:id/update"
                logout={logout}
                component={UpdateStudent}
              />
               <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/students/:id"
                logout={logout}
                component={ViewStudent}
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/students"
                logout={logout}
                component={Students}
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/subscriptions/:id"
                logout={logout}
                component={ViewSubscription}
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/subscriptions"
                logout={logout}
                component={Subscriptions}
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/exams/add"
                logout={logout}
                component={AddExam}
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/exams/:id/update"
                logout={logout}
                component={UpdateExam}
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/exams/:id"
                logout={logout}
                component={ViewExam}
              />
               
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/exams"
                logout={logout}
                component={Exams}
              />
              
            
              
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/subscriptions/:id"
                logout={logout}
                component={viewSubscription}
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/batches/:id"
                logout={logout}
                component={ViewBatch}
              />

              {/* Non exist */}
              {/* <Route path="/dashboard" component={Home} /> */}
              <Route path="/login" component={Login} />
              <Route path="*">
                <div>404 Not found </div>
              </Route>


 
            
        </Switch>
        </div>
        {/* <Footer/> */}
        </UserContext.Provider>
      </Router>
    
  );
}

export default App


