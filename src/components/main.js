import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions/fetchData";
import { useState } from "react";
import axios from "axios";
import "./main.css";
import LoadingSpinner from "./loadingSpinner";

var Spinner = require("react-spinkit");


const Main = (props) => {
  const { fetchData } = props;
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [user, setUser] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [image, setImage] = useState(
    "https://icons.iconarchive.com/icons/papirus-team/papirus-status/128/avatar-default-icon.png"
  );

  useEffect(() => {
    if (selectedUser) {
      axios
        .get(`https://reqres.in/api/users/${selectedUser}`)
        .then((res) => {
          setUser(res.data.data);
          setImage(res.data.data.avatar);
          console.log("res", res.data);
          console.log("selecteduser", selectedUser);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("no user selected");
    }
  }, [selectedUser, fetchData]);

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      {user && user.email ? (
        <div className="info">
          <img src={image} alt="avatar"></img>
          <div>
            <h1>
              Name: {user.first_name} {user.last_name}
            </h1>
            <p>
              <b>Email:</b> {user.email}
            </p>
          </div>{" "}
        </div>
      ) : (
        <div className="info">
          {props.isLoading ? (
            <Spinner name="line-scale-pulse-out" fadeIn="quarter" />
          ) : (
            <>
              <h1>No user selected</h1>
              <p>Please select a user from the given buttons.</p>
            </>
          )}
        </div>
      )}
      <div className="buttonDiv">
        {props.isLoading ? (
          <LoadingSpinner />
        ) : props.isError ? (
          <div>{props.errorMessage}</div>
        ) : (
          props.users.map((user) => {
            return (
              <button
                className="button"
                onClick={() => handleClick(user.id)}
                key={user.id}
              >
                {user.id}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.data,
    total: state.users.total,
    isLoading: state.users.isLoading,
    isError: state.users.isError,
    errorMessage: state.users.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
