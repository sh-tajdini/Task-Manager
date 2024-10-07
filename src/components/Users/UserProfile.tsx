import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import UserIcon from "../../assets/userIcon.svg"; 
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../reducers/Users/userReducer";
const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div className="relative mx-2" onClick={() => setShowDropdown(!showDropdown)}>
      {user.user?.avatar ? (
         <img
          src={user.user.avatar}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
        />
      ): (<img src={UserIcon} alt="user icon" className="text-white w-8 h-8 cursor-pointer" />
        
      )}
      {showDropdown && (
        <div className="absolute right-0 bg-white text-black rounded shadow-lg mt-2 z-20">
          <button
            onClick={handleLogout}
            className="block px-4 py-2 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;



