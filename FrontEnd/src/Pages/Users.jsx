import { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import Navbar from "../NavBar/MainNavbar";
import { useNavigate } from "react-router-dom";
import { Trash2, User, Mail, Zap } from "lucide-react";
import SlideBar from "../NavBar/SlideBar";

export default function Users() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    setCurrentUser(user);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/user");
      setTimeout(() => {
        setUsers(res.data);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to fetch users. Please check your credentials.");
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const originalUsers = users;
    setUsers(users.filter((u) => u._id !== id));
    try {
      await axiosInstance.delete(`/user/${id}`);
    } catch {
      setUsers(originalUsers);
      alert("Failed to delete user. Check permissions.");
    }
  };

  const getRoleBadge = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-600/20">
            <Zap className="w-3 h-3 mr-1" />
            Admin
          </span>
        );
      case "editor":
        return (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
            <User className="w-3 h-3 mr-1" />
            Editor
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-gray-500/10">
            <User className="w-3 h-3 mr-1" />
            User
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 md:px-8  px-2">
      {/* Navbar */}
      <div className="p-4">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[260px]">
          <SlideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Team Members 👥
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage all registered users and their access roles.
              </p>
            </header>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6"
                role="alert"
              >
                <p>{error}</p>
              </div>
            )}

            {/* Loading skeleton */}
            {isLoading && (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse flex items-center bg-white p-5 rounded-xl shadow"
                  >
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full mr-4"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* User list */}
            {!isLoading && users.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((u) => (
                  <li
                    key={u._id}
                    className="group bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition transform hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <User className="w-5 h-5 text-indigo-500 mr-2" />
                          <p className="text-xl font-semibold text-gray-900 truncate">
                            {u.name}
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="w-4 h-4 mr-2" />
                          <span>{u.email}</span>
                        </div>
                      </div>

                      {getRoleBadge(u.role)}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition p-2 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete User
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Empty state */}
            {!isLoading && users.length === 0 && (
              <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-xl bg-white">
                <User className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No users found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by inviting a new team member.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
