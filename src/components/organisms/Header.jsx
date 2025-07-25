import React, { useContext } from "react";
import { useSelector } from 'react-redux';
import ApperIcon from "@/components/ApperIcon";
import { AuthContext } from "../../App";

const Header = ({ activeTaskCount = 0 }) => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <ApperIcon name="CheckSquare" className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                DeskFlow
              </h1>
              <p className="text-sm text-neutral-600">
                Your office task manager
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {activeTaskCount}
              </div>
              <p className="text-sm text-neutral-600">
                {activeTaskCount === 1 ? "task remaining" : "tasks remaining"}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {user && (
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {user.emailAddress}
                  </p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <ApperIcon name="LogOut" className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;