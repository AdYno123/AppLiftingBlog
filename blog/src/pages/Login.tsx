import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { POST_HTTP_REQUEST } from "../constans/api-service";
import AuthContext from "../constans/auth-context";
import { ILogin, IAccessToken } from "../constans/stored-interface";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const authContext = useContext(AuthContext);
  const history = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // let loginParameter: ILogin = {
    //   username: "AndrejO",
    //   password: "admin1",
    // };
    let loginParameter: ILogin = {
      username: email,
      password: password,
    };
    const loginResult = await POST_HTTP_REQUEST<IAccessToken>(
      "login",
      loginParameter
    );
    if (loginResult.success && loginResult.data !== null) {
      let isLoggedMsg = authContext.login(loginResult.data);

      if (isLoggedMsg.startsWith("OK")) {
        toast.success("User was Successed login");
        history("/home", { replace: true });
      } else {
        toast.error(isLoggedMsg);
      }
    } else {
      toast.error("User was not log in!");
    }
  };

  return (
    <div className="flex justify-center">
      <section className="drop-shadow-2xl p-7 mt-16 w-96 bg-white">
        <header>
          <h1 className="text-4xl font-medium">Log In</h1>
        </header>

        <form onSubmit={handleLogin}>
          <div className="row-input mt-5">
            <label>Email</label>
            <div className="input-holder mt-2">
              <input
                required
                onChange={(event) => setEmail(event.target.value)}
                className="border rounded px-2 py-1 w-full "
                type="text"
                placeholder="me@example.com"
              />
            </div>
          </div>

          <div className="row-input mt-3">
            <label className="">Password</label>
            <div className="input-holder mt-2">
              <input
                required
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="border rounded px-2 py-1 w-full "
                placeholder="************"
              />
            </div>
          </div>
          <div className="row-input text-right">
            <input
              type="submit"
              value="Log In"
              className=" bg-blue-500 p-2 px-3 mt-8 rounded text-white"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
