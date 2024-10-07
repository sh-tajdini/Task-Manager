import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../reducers/Users/userReducer";
import { RootState } from "../../store";
import { mockedUsers } from "../../schema/users";
import AlertIcon from "../../assets/alertIcon.svg";
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isLoggedIn,
  );

  const handleLogin = () => {
    if (username && password) {
      const user = mockedUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        dispatch(loginUser({ username, password }));
        setError("");
      } else {
        setError("Username or password is incorrect");
      }
    } else {
      setError("Username and password are required");
    }
  };
  const getInputClass = (inputValue:string) => {
    const isEmpty = inputValue.trim() === '';
    return (error && isEmpty)? "border-red-500" : "border-gray-300";
  };
  
 useEffect(() => {
  if (isAuthenticated) {
    navigate("/app");
  }
}, [isAuthenticated, navigate]);

 return (
    <div  data-testid="login" className="flex items-center justify-center h-screen bg-gray-100 p-4">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        Log in
      </h2>
      <hr className="mb-6 border-gray-300" />
      <p className="text-left text-sm text-gray-500 mb-8">
        Log in to the management system using your username and password.
      </p>
      {error && (
       <div className="flex items-center text-red-500 mb-4 text-sm">
          <img src={AlertIcon} alt="error icon" className="w-4 h-4 mr-2" />
          <p>{error}</p>
      </div>
    )}
     <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`border rounded-md w-full p-3 mb-4 focus:outline-none ${getInputClass(username)} focus:border-blue-500 transition`}
          placeholder="Enter your username"
          autoComplete="current-password" 
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border rounded-md w-full p-3 mb-4 focus:outline-none ${getInputClass(password)} focus:border-blue-500 transition`}
          placeholder="Enter your password"
          autoComplete="current-password" 
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded-md hover:bg-blue-700 transition"
        >
          Log In
        </button>
        <hr className="my-6 border-gray-300" />
        <p className="text-left text-sm text-gray-500">
          Need help? <a href="#" className="text-blue-600 hover:underline">Contact support</a>
        </p>
     </form>
    </div>
  </div>
  );
};

export default Login;

