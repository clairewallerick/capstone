import client from "./client";
import settings from "../config/settings";
import storage from "../auth/storage";

const getpastAppointments = (id) =>
  client.get(`/api/appointment/getpastappointment/${id}`);
const getfutureAppointments = (id) =>
  client.get(`/api/appointment/getfutureappointment/${id}`);
//const getAppointments = (email) => client.get(`/api/appointment/getappointment/${email}`);
const getOneAppointment = (appt_id) =>
  client.get(`/api/appointment/getappointment/${appt_id}`);
//const getOneAppointment = (appt_id) => get(appt_id);

const baseURL = settings.apiUrl;
const token = storage.getToken();

const post = (user_id, test_type, appt_location, appt_datetime) => {
  //create new appointment in database
  const url =
    baseURL +
    `/api/appointment/addappointment/${user_id}/${test_type}/${appt_location}/${appt_datetime}`;
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": token._3,
    },
  });
};

const put = (appt_id, test_type) => {
  //edit test type of appointment since that was determined to be the only editable field for the scope of the project, customer can edit a confirmed or unconfirmed appointment
  const url = baseURL + `/api/appointment/editappt/${appt_id}/${test_type}`;
  fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": token._3,
    },
  });
};

const addAppointment = (user_id, test_type, appt_location, appt_datetime) =>
  post(user_id, test_type, appt_location, appt_datetime);
const editAppointment = (appt_id, test_type) => put(appt_id, test_type);

export default {
  getpastAppointments,
  getfutureAppointments,
  getOneAppointment,
  addAppointment,
  editAppointment,
};
