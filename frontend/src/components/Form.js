import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  //To Store the value from frontend
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");

  //Function  to send the data

  const submitData = async () => {
    const data = {
      name: username,
      email: useremail,
    };

    await axios.post("/createuser", data).then((response) => {
      console.log(response.data);
    });
  };

  //To handle Default
  const handleSubmit = (event) => {
    event.preventDefault(); //Prevent to refresh-Page
    //To submit data
    submitData();

    //Emapty the previously submitted data
    setUsername("");
    setUseremail("");
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Create User
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  value={username}
                  type="text"
                  name="Name"
                  id="Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Name"
                  required=""
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  onChange={(event) => {
                    setUseremail(event.target.value);
                  }}
                  value={useremail}
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Your Email"
                  required=""
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Form;
