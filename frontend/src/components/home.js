import React, { useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { AllUser,DeleteUser } from "../store/actions/user";
import { connect } from "react-redux";

const Home = (props) => {
  const history = useHistory();
  useEffect(() => {
    props.AllUser();
  }, []);

  const userupdatepage = (item) => {
    history.push({ pathname: "/adduser", state: item });
  }

  const deleteuser = (id) =>{
    props.DeleteUser(id);
    setTimeout(()=>{
      props.AllUser();
    },200)
  }

  function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  return (
    <div>
      <div className="container col-md-8">
        <div class="jumbotron jumbotron-fluid mt-4">
          <div class="container">
            <h1 class="align-items-center display-6 text-success">
              User Information
            </h1>
          </div>
        </div>
        <nav class="navbar navbar-light bg-light">
          <form class="form-inline">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              id="myInput" 
              onKeyup={()=>myFunction()}
              aria-label="Search"
              style={{ width: "400px" }}
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <Link to="adduser">
            <button type="button" class="btn btn-info">
              Add user
            </button>
          </Link>
        </nav>
        <br />
        <br />
        <table class="table table-hover" id="myTable">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Profile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {props.userList &&
              Object.values(props.userList).map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1 }</th>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td><img src={`${process.env.REACT_APP_NODE_API}/public/${item.profile}`} style={{ width:'60px',height:'60px' }}/></td>
                    <td><svg onClick={()=>userupdatepage(item)} width="1em" height="1em"  style={{ cursor:'pointer',fontSize:'20px',color:'green'}} viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
<svg width="1em" height="1em" onClick={() => deleteuser(item.id)} style={{ marginLeft:'20px',cursor:'pointer',fontSize:'20px',color:'red' }} viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
</td>

                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
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
    DeleteUser: (postId) => dispatch(DeleteUser(postId)),
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
