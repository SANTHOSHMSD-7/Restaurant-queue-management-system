import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        // Store user details
        localStorage.setItem("role", data.role);
        localStorage.setItem("userName", data.name);

        // Role-based navigation
        if (data.role === "OWNER") {
          navigate("/dashboard");
        } else {
          navigate("/restaurants");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Login failed");
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
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')",
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>

          <div className="relative z-10 flex flex-col justify-center px-16 text-white">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Good Food <br />
              Good Mood <br />
              Good Time 🍽
            </h1>

            <p className="text-lg text-gray-300">
              Book your table faster. Skip the waiting line.
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

          {/* Glass Card */}
          <div className="relative z-10 w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 animate-fadeIn">
            
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                🍴
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white text-center mb-2">
              Welcome Back!
            </h1>

            <p className="text-gray-300 text-center mb-8">
              Login to continue your delicious journey
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/80 outline-none focus:ring-2 focus:ring-red-400"
              />

              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-xl bg-white/80 outline-none focus:ring-2 focus:ring-red-400"
              />

              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold shadow-lg transition duration-300 hover:scale-105"
              >
                Login →
              </button>
            </form>

            <div className="flex justify-between mt-6 text-sm text-gray-300">
              <p>Secure Login 🔒</p>
              <p>24/7 Support ☎</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;