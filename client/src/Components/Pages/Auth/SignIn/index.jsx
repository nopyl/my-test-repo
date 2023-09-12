import React, { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Button } from "../../../Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Message } from "../../../../Utils/Message/Message";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../Services/axios/axios.service";

export const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const navigate = useNavigate();

    const signIn = async(e) => {

        e.preventDefault();

        if(!email || !password){
            return toast.warning(Message.NullInputException);
        }

        try{

            const {data} = await api.post("/auth/sign/in", {
                email,
                password
            });

            if(data.success){
                return navigate("/");
            }

        }
        catch(err){
            return toast.warning(err.response.data.message);
        }

    }


  return (
    <div className="container">
      <form className="w-25 mx-auto" onSubmit={signIn}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control shadow-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <div className="input-group">
            <input
              type={passwordVisibility === false ? "password" : "text"}
              className="form-control shadow-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-warning"
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

        <Button
          text="Sign In"
          style={{ backgroundColor: "#fd7e14" }}
          className="btn text-light mt-3"
        />
      </form>

      <ToastContainer />
    </div>
  );
};
