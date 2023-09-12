import React, { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Button } from "../../../Button";
import { api } from "../../../../Services/axios/axios.service";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const signUp = async (e) => {
    
    e.preventDefault();


    try{
      
      const { data } = await api.post("/auth/sign/up", {
        email,
        password,
        gender, 
        dateOfBirth
      });

      if(data.success){
          console.log("Register Successfull");
      }

    }
    catch(err){
      console.log(err);
    }

  };

  return (
    <>
      <div className="container">
        <form onSubmit={signUp} className="w-25 mx-auto">
          <h3 className="mb-3">Sign Up</h3>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control shadow-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div class="form-group mt-2">
            <label htmlFor="password" className="form-label">Password</label>
            
            <div className="input-group">

            <input
              type={passwordVisibility === false ? "password" : "text"}
              className="form-control shadow-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  setPasswordVisibility(!passwordVisibility);
                }}
                >
                {passwordVisibility === false ? <Eye /> : <EyeSlash />}
              </button>
              </div>
            </div>
          </div>

          <div class="form-group mt-2">
            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control shadow-none"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              className="form-select shadow-none"
              onChange={(e) => setGender(e.target.value)}
            >
              <option selected>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="None of them">None of them</option>
            </select>
          </div>

          <div className="mt-3">
            <a
              href="#"
              className="text-decoration-none"
              style={{ color: "#fd7e14" }}
            >
              Do you already have an account?
            </a>
          </div>

          <Button
            text="Sign Up"
            style={{ backgroundColor: "#fd7e14" }}
            className="btn text-light mt-3"
          />
        </form>
      </div>
    </>
  );
};
