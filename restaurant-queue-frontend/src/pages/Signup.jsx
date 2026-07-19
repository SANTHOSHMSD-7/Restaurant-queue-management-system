import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (response.ok) {
        alert("Signup successful");
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex">
        {/* Left side */}
        <div
          className="w-1/2 hidden md:flex bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>

          <div className="relative z-10 flex flex-col justify-center px-16 text-white">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Join QueueDine 🍴
            </h1>

            <p className="text-lg text-gray-300">
              Create your account and book smarter.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div
          className="w-full md:w-1/2 bg-cover bg-center flex justify-center items-center px-6 relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544025162-d76694265947')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                🍽
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white text-center mb-2">
              Create Account
            </h1>

            <p className="text-gray-300 text-center mb-8">
              Start your food journey today
            </p>

            <form onSubmit={handleSignup} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/80 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/80 outline-none"
              />

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/80 outline-none"
              />

              <select
                name="role"
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/80 outline-none"
              >
                <option value="CUSTOMER">Customer</option>
                <option value="OWNER">Owner</option>
              </select>

              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold"
              >
                Signup →
              </button>
            </form>

            <p className="text-center text-gray-300 mt-6">
              Already have an account?
              <span
                className="text-white font-bold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                {" "}Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;