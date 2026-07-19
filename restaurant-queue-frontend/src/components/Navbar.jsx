import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md fixed w-full top-0 z-50">
      <h1 className="text-2xl font-bold text-red-500">QueueDine</h1>

      <div className="space-x-6">
        <Link to="/">Home</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link
          to="/signup"
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;