import axios from "axios";
import { fetchDataRequest, fetchDataFailure, fetchDataSuccess } from "./action";

async function downloadUsers() {
  let users = [];
  let page = 0;
  let totalPages = 0;

  do {
    let { data: response } = await axios.get("https://reqres.in/api/users", {
      params: { page: ++page },
    });
    totalPages = response.total_pages;
    console.log(`downloadRecords: page ${page} of ${totalPages} downloaded...`);
    users = users.concat(response.data);
    console.log("records.length:", users.length);
  } while (page < totalPages);

  console.log("downloadUsers: download complete.");

  return users;
}

export function fetchData() {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    return downloadUsers()
      .then((users) => {
        setTimeout(() => {
          {
            dispatch(fetchDataSuccess(users));
          }
        }, 3000);
        console.log("users", users);
      })
      .catch((err) => {
        dispatch(fetchDataFailure(err.message));
        console.log("err", err);
      });
  };
}
