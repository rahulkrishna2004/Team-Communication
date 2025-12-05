import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../Axios/axiosInstance";
import { AuthContext } from "../Context/AuthContext";
import MainNavbar from "../NavBar/MainNavbar";

export default function UserRegister() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // use login() from context for consistency

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      // Register new user
      const res = await axiosInstance.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      const { user, token, message } = res.data;

      if (token && user) {
        // Store token and user globally
        login(user, token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setMessage(message || "Registration successful!");
        navigate("/dashboard");
      } else {
        setMessage("Unexpected server response.");
      }
    } catch (err) {
      console.error("Registration Error:", err.response?.data);
      setMessage(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative flex flex-col items-center justify-start min-h-screen p-4 bg-gray-100"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-top filter blur-xs"
        style={{ backgroundImage: "url('./meeting.jpeg')" }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Navbar */}
      <div className="relative w-full md:px-6 md:py-4">
        <MainNavbar />
      </div>

      {/* Register Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm mt-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 flex flex-col space-y-6"
      >
        {/* Logo Header */}
        <div className="flex flex-col items-center space-y-2">
          <img src="logo.jpeg" alt="Logo" className="h-20 w-20 rounded-full" />
          <h1 className="text-2xl font-bold text-gray-700">DEV DESK</h1>
          <p className="text-sm text-gray-500 text-center">
            Create your account
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="bg-white rounded-full px-4 py-2 shadow-inner focus:outline-none border border-gray-300"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-white rounded-full px-4 py-2 shadow-inner focus:outline-none border border-gray-300"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="bg-white rounded-full px-4 py-2 shadow-inner focus:outline-none border border-gray-300"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="bg-white rounded-full px-4 py-2 shadow-inner focus:outline-none border border-gray-300"
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 rounded-full font-semibold transition duration-200 shadow-md`}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </motion.form>

        {/* Feedback Message */}
        {message && (
          <div
            className={`p-2 rounded-xl text-sm text-center ${
              message.toLowerCase().includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Login Link */}
        <p className="text-gray-500 text-center text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
}
