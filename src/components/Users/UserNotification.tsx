import React, { useState } from "react";
import BellIcon from "../../assets/bellIcon.svg";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
const UserNotification: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const notificationCount=user.user?.notification || 0;
  return (
    <div className="relative mx-2" onClick={() => setShowNotifications(!showNotifications)}>
    <img src={BellIcon} alt="bell icon" className="text-white w-8 h-8 cursor-pointer" />
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs cursor-pointer">
          {notificationCount}
        </span>
      )}
      {showNotifications && (
          <div className="absolute right-0 bg-white text-black rounded shadow-lg mt-2 z-20">
         {notificationCount > 0 ? (
           user.user?.messages.map((message, index) => (
            <div key={index} className="px-4 py-2 w-60 max-w-full border-b hover:bg-gray-200 text-sm break-words whitespace-normal" title={message}>
              {message.length > 100 ? (
                <span>{message.substring(0, 100)}...</span>
              ) : (
                <div className="flex text-sm">
                <img src={BellIcon} alt="alert icon" className="w-4 h-4 mr-2 text-red-500" />
                {message}
            </div>
              )}
            </div>     
           ))
         ) : (
           <div className="px-4 py-2 text-gray-500">No messages</div>
         )}
       </div>
      )}
    </div>
  );
};

export default UserNotification;



