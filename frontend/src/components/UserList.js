import axios from "axios";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const response = await axios.get("/getusers");
    console.log(response);

    //if User are there please dont set the values

    if (response.data.users.length > 0) {
      setUserData(response.data.users);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = async (user) => {
    const userName = prompt("Enter your new username");
    const userEmail = prompt("Enter your new email");

    if (!userEmail && !userName) {
      alert("Please enter Name and Email");
    } else {
      const response = await axios.put(`/edituser/${user._id}`, {
        name: userName,
        email: userEmail,
      });
      console.log(response);
    }
  };

  const handleDelete = async (user) => {
    await axios.delete(`/deleteuser/${user._id}`);
  };

  return (
    <>
      <div>
        <h1>All Users</h1>
        {userData &&
          userData.map((user) => (
            <div key={user._id} className="flex m-5">
              <h3 className="mr-3">{user.name}</h3>
              <h3 className="mr-3">{user.email}</h3>
              <button
                className="mr-3 text-purple-700"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className="mr-3 text-red-700"
                onClick={() => handleDelete(user)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserList;
