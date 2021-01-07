import axios from "axios";

const teacherUrl = "https://revisionclass.herokuapp.com/api/v1/teachers";

export const login = (data) => axios.post(`${teacherUrl}`, data);
export const validate = (token) =>
  axios.post(`${teacherUrl}/validateToken`, null, {
    headers: { "x-auth-token": token },
  });
export const fetchTeacher = (token) =>
  axios.get(`${teacherUrl}/teacher`, {
    headers: { "x-auth-token": token },
  });
export const fetchStudents = (token) =>
  axios.get(`${teacherUrl}/students`, {
    headers: { "x-auth-token": token },
  });
export const fetchStudent = (id, token) =>
  axios.get(`${teacherUrl}/students/${id}`, {
    headers: { "x-auth-token": token },
  });
export const createStudent = (newStudent, token) =>
  axios.post(`${teacherUrl}/students`, newStudent, {
    headers: { "x-auth-token": token },
  });
export const updateStudent = (id, updatedStudent, token) =>
  axios.put(`${teacherUrl}/students/${id}`, updatedStudent, {
    headers: { "x-auth-token": token },
  });
export const deleteStudent = (id, token) =>
  axios.delete(`${teacherUrl}/students/${id}`, {
    headers: { "x-auth-token": token },
    data: {},
  });

export const fetchExams = () => axios.get(`${teacherUrl}/exams_essay`);
export const fetchExam = (id, token) =>
  axios.get(`${teacherUrl}/exams_essay/${id}`, {
    headers: { "x-auth-token": token },
  });
export const createExam = (newExam, token) =>
  axios.post(`${teacherUrl}/exams_essay`, newExam, {
    headers: { "x-auth-token": token },
  });
export const updateExam = (id, updatedStudent, token) =>
  axios.put(`${teacherUrl}/exams_essay/${id}`, updatedStudent, {
    headers: { "x-auth-token": token },
  });
export const deleteExam = (id) =>
  axios.delete(`${teacherUrl}/exams_essay/${id}`);

export const fetchSubscriptions = (token) =>
  axios.get(`${teacherUrl}/subscriptions`, {
    headers: { "x-auth-token": token },
  });
export const fetchSubscription = (id, token) =>
  axios.get(`${teacherUrl}/subscriptions/${id}`, {
    headers: { "x-auth-token": token },
  });
export const createSubscription = (newSubscription, token) =>
  axios.post(`${teacherUrl}/subscriptions`, newSubscription, {
    headers: { "x-auth-token": token },
  });
export const updateSubscription = (id, updatedSubscription) =>
  axios.put(`${teacherUrl}/subscriptions/${id}`, updatedSubscription);
export const deleteSubscription = (id, token) =>
  axios.delete(`${teacherUrl}/subscriptions/${id}`, {
    headers: { "x-auth-token": token },
  });
export const updateSubscribers = (id, stu_id, token) =>
  axios.put(`${teacherUrl}/subscriptions/${id}/subscribers`, stu_id, {
    headers: { "x-auth-token": token },
  });
export const removeSubscribers = (id, stu_id, token) =>
  axios.delete(`${teacherUrl}/subscriptions/${id}/subscribers`, {
    headers: { "x-auth-token": token },
    data: { stu_id },
  });

export const fetchBatches = (token) =>
  axios.get(`${teacherUrl}/batches`, {
    headers: { "x-auth-token": token },
  });
export const createBatch = (newBatch, token) =>
  axios.post(`${teacherUrl}/batches`, newBatch, {
    headers: { "x-auth-token": token },
  });
// export const likestudent = (id) =>
//   axios.patch(`${teacherUrl}/${id}/likestudent`);
// export const updatestudent = (id, updatedstudent) =>
//   axios.patch(`${teacherUrl}/${id}`, updatedstudent);
// export const deletestudent = (id) => axios.delete(`${teacherUrl}/${id}`);
