import React, { useState,useEffect } from "react";
import  { Formik } from 'formik';
import * as Yup from "yup";
import $ from "jquery";
import { connect } from 'react-redux';
import { useHistory,withRouter,Link,useLocation } from "react-router-dom";
import { AddUser,AllUser,UpdateUser } from '../store/actions/user';

const Adduser = (props) => {

    const [profile, setProfile] = useState(null);
    const history = useHistory();

    const senddata = async(fields) =>{
        const formData = new FormData();
        formData.append("firstname", fields.firstname);
        formData.append("lastname", fields.lastname);
        formData.append("email", fields.email);
        formData.append("username", fields.username);
        formData.append("profile", profile);
        formData.append("password", fields.password);
        props.AddUser(formData, history);
        setTimeout(()=>{
          props.AllUser();
        },200)
    }

    const [Updatefirstname, setUpdatefirestname] = useState();
    const [Updatelastname, setUpdatelastname] = useState('');
    const [Updateemail, setUpdateemail] = useState('');
    const [Updateusername, setUpdateusername] = useState('');
    const [Updateprofile, setUpdateprofile] = useState('');
    const [UpdatedId, setUpdatedId] = useState('');

    const updateData = (fields) => {
      let formData = new FormData();
      formData.append('firstname', fields.Updatefirstname);
      formData.append('lastname', fields.Updatelastname);
      formData.append('email', fields.Updateemail);
      formData.append('username', fields.Updateusername);
      formData.append('profile', Updateprofile);
      props.UpdateUser(UpdatedId, formData, history);
  }


    const location = useLocation();

    useEffect(() => {
      if (location.state) {
          const data = location.state;
          console.log(data);
          setUpdatefirestname(data.firstname);
          setUpdatelastname(data.lastname);
          setUpdateemail(data.email);
          setUpdateusername(data.username);
          setUpdatedId(data.id);
      }
  }, [])


  return (
    <React.Fragment>   
      {location.state ?
        (
          <div className="col-md-4 container bg-gray">
        <Formik
          initialValues={{
            Updatefirstname:location.state ? location.state.firstname : "",
            Updatelastname:location.state ? location.state.lastname : "",
            Updateemail:location.state ? location.state.email : "",
            Updateusername:location.state ? location.state.username : "",
          }}
          onSubmit={async (fields) => {
            updateData(fields);
          }}
          validationSchema={Yup.object().shape({
            Updatefirstname: Yup.string()
                .required("First Name is required"),
                Updatelastname: Yup.string()
                .required("Last Name is required"),
                Updateemail: Yup.string().email()
                .required("Email is required"),
                Updateusername: Yup.string()
                .required("User Name is required"),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <div class="card" style={{width:'24rem',marginTop:'50px'}}>
                <div className="container">
                <form onSubmit={handleSubmit} className="forms-sample">
                <div className="form-group search-field">
                  <div className="d-flex">
                    <label>First Name</label>
                    &nbsp;
                    {errors.Updatefirstname && touched.Updatefirstname && (
                      <div className="input-feedback text-danger">
                        {errors.Updatefirstname}
                      </div>
                    )}
                  </div>
                  <input
                    id="Updatefirstname"
                    placeholder="First Name"
                    type="text"
                    value={values.Updatefirstname}
                    onChange={handleChange}
                    className="h-auto form-control form-control-lg"
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group search-field">
                  <div className="d-flex">
                    <label>Last Name</label>
                    &nbsp;
                    {errors.Updatelastname && touched.Updatelastname && (
                      <div className="input-feedback text-danger">
                        {errors.Updatelastname}
                      </div>
                    )}
                  </div>
                  <input
                    id="Updatelastname"
                    placeholder="Last Name"
                    type="text"
                    value={values.Updatelastname}
                    onChange={handleChange}
                    className="h-auto form-control form-control-lg"
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group search-field">
                  <div className="d-flex">
                    <label>Email</label>
                    &nbsp;
                    {errors.Updateemail && touched.Updateemail && (
                      <div className="input-feedback text-danger">
                        {errors.Updateemail}
                      </div>
                    )}
                  </div>
                  <input
                    id="Updateemail"
                    placeholder="Email"
                    type="text"
                    value={values.Updateemail}
                    onChange={handleChange}
                    className="h-auto form-control form-control-lg"
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group search-field">
                  <div className="d-flex">
                    <label>User Name</label>
                    &nbsp;
                    {errors.Updateusername && touched.Updateusername && (
                      <div className="input-feedback text-danger">
                        {errors.Updateusername}
                      </div>
                    )}
                  </div>
                  <input
                    id="Updateusername"
                    placeholder="User Name"
                    type="text"
                    value={values.Updateusername}
                    onChange={handleChange}
                    className="h-auto form-control form-control-lg"
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group search-field">
                  <div className="d-flex">
                    <label>Profile</label>
                    &nbsp;
                    {errors.profile && touched.profile && (
                      <div className="input-feedback text-danger">
                        {errors.profile}
                      </div>
                    )}
                  </div>
                  <input
                    id="profile"
                    placeholder="Profile"
                    type="file"
                    value={values.profile}
                    onChange={(e) => setUpdateprofile(e.target.files[0])}
                    className="h-auto form-control form-control-lg"
                    onBlur={handleBlur}
                  />          
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary mr-2"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <Link to="/">
                  <button
                    type="button"
                    className="btn btn-secondary mr-2"
                  >
                    Cancle
                  </button>
                  </Link>
                </div>
              </form>
                </div>
          </div>
            );
          }}
        </Formik>
      </div>
        )
        :
        (
          <div className="col-md-4 container bg-gray">
        <Formik
          initialValues={{
            firstname:"",
            lastname:"",
            email:"",
            username:"",
            password:"",
          }}
          onSubmit={async (fields) => {
            senddata(fields);
          }}
          validationSchema={Yup.object().shape({
            firstname: Yup.string()
                .required("First Name is required"),
                lastname: Yup.string()
                .required("Last Name is required"),
                email: Yup.string().email()
                .required("Email is required"),
                username: Yup.string()
                .required("User Name is required"),
                password: Yup.string()
                .required("Password is required"),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <div class="card" style={{width:'24rem',marginTop:'50px'}}>
                <div className="container">
                <form onSubmit={handleSubmit} className="forms-sample">
                <div className="form-group search-field">
                  <div className="d-flex">
                    <label>First Name</label>
                    &nbsp;
                    {errors.firstname && touched.firstname && (
                      <div className="input-feedback text-danger">
                        {errors.firstname}
                      </div>
                    )}
                  </div>
                  <input
                    id="firstname"
                    placeholder="First Name"
                    type="text"
                    value={values.firstname}
                    onChange={handleChange}
                    className="h-auto form-control form-control-lg"
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group search-field">
                  <div className="d-flex">
                    <label>Last Name</label>
                    &nbsp;
                    {errors.lastname && touched.lastname && (
                      <div className="input-feedback text-danger">
                        {errors.lastname}
                      </div>
                    )}
                  </div>
                  <input
                    id="lastname"
                    placeholder="Last Name"
                    type="text"
                    value={values.lastname}
                    onChange={handleChange}
                    className="h-auto form-control form-control-lg"
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group search-field">
                  <div className="d-flex">
                    <label>Email</label>
                    &nbsp;
                    {errors.email && touched.email && (
                      <div className="input-feedback text-danger">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <input
                    id="email"
                    placeholder="Email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    className="h-auto form-control form-control-lg"
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group search-field">
                  <div className="d-flex">
                    <label>User Name</label>
                    &nbsp;
                    {errors.username && touched.username && (
                      <div className="input-feedback text-danger">
                        {errors.username}
                      </div>
                    )}
                  </div>
                  <input
                    id="username"
                    placeholder="User Name"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    className="h-auto form-control form-control-lg"
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-group search-field">
                  <div className="d-flex">
                    <label>Profile</label>
                    &nbsp;
                    {errors.profile && touched.profile && (
                      <div className="input-feedback text-danger">
                        {errors.profile}
                      </div>
                    )}
                  </div>
                  <input
                    id="profile"
                    placeholder="Profile"
                    type="file"
                    value={values.profile}
                    onChange={(e) => setProfile(e.target.files[0])}
                    className="h-auto form-control form-control-lg"
                    onBlur={handleBlur}
                  />          
                </div>
                <div className="form-group search-field">
                  <div className="d-flex">
                    <label>Password</label>
                    &nbsp;
                    {errors.password && touched.password && (
                      <div className="input-feedback text-danger">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <input
                    id="password"
                    placeholder="Password"
                    type="text"
                    value={values.password}
                    onChange={handleChange}
                    className="h-auto form-control form-control-lg"
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary mr-2"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <Link to="/">
                  <button
                    type="button"
                    className="btn btn-secondary mr-2"
                  >
                    Cancle
                  </button>
                  </Link>
                </div>
              </form>
                </div>
          </div>
            );
          }}
        </Formik>
      </div>
        )
      } 
    </React.Fragment>
  );
};


function mapStateToProps(state) {
  return {
    userList: state.UserReducers.userList,
  };
}

  
function mapDispatchToProps(dispatch) {
  return {
    AllUser: () => dispatch(AllUser()),
    AddUser: (data, history) => dispatch(AddUser(data, history)),
    UpdateUser: (id,data, history) => dispatch(UpdateUser(id,data, history)),
  };
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Adduser));

