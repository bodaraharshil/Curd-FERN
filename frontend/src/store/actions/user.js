import axios from "axios";

export function setLoggedIn() {
  return (dispatch) => {
    dispatch({
      type: "SET_LOGGED_IN",
    });
  };
}

export function AllUser() {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_NODE_API}/api/read`)
      .then((response) => {
        dispatch({
          type: "USERGET_SUCCESS",
          message: "user get list success",
          data: response.data,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "USERGET_FAILURE",
          message: "Something went wrong",
        });
      });
  };
}

export function AddUser(user, history) {
  console.log("Dsadasasasassadsad",user)
  return (dispatch) => {
      return axios.post(`${process.env.REACT_APP_NODE_API}/api/create`,  user , {headers: { 'content-type': 'multipart/form-data'},headers: { 'content-type': 'application/json'}})
          .then(response => {
              dispatch({
                  type: 'USERGET_SUCCESS',
                  message: response.data.message,
                  status: response.data.status
              })
              history.push("/");
          })
          .catch(function (error) { 
              dispatch({
                  type: 'USERGET_FAILURE',
                  message: 'Something went wrong',
              })
          })
  }
}

export function DeleteUser(postId, history) {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_NODE_API}/api/delete/${postId}`)
      .then((response) => {
        dispatch({
          type: "POSTDELETE_SUCCESS",
          message: "user delete success",
        });
      })
      .catch(function (error) {
        dispatch({
          type: "POSTDELETE_FAILURE",
          message: "Something went wrong",
        });
      });
  };
}

export function UpdateUser(id, data, history) {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_NODE_API}/api/update/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch({
          type: "USERUPDATE_SUCCESS",
          message: "data updated success..",
        });
        history.push("/");
      })
      .catch(function (error) {
        dispatch({
          type: "USERUPDATE_FAILURE",
          message: "Something went wrong",
        });
      });
  };
}
