import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaClock, FaUtensils, FaUsers } from "react-icons/fa";

function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative text-center text-white px-6 max-w-4xl">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Skip the Wait, <span className="text-red-500">Dine Smart</span>
          </h1>

          <p className="text-xl mb-8 text-gray-200">
            Check live restaurant queues, reserve your table instantly,
            and enjoy dining without waiting.
          </p>

          {/* Search bar */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-96 px-4 py-3 rounded-l-lg text-black outline-none"
            />
            <button className="bg-red-500 px-6 py-3 rounded-r-lg hover:bg-red-600">
              Search
            </button>
          </div>

          {/* CTA */}
          <Link
            to="/restaurants"
            className="bg-red-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition"
          >
            Explore Restaurants
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose QueueDine?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
            <FaClock className="text-5xl text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Live Wait Tracking</h3>
            <p className="text-gray-600">
              Get real-time updates on queue positions and estimated wait times.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
            <FaUtensils className="text-5xl text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Easy Table Booking</h3>
            <p className="text-gray-600">
              Reserve tables instantly and avoid long waiting lines.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
            <FaUsers className="text-5xl text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Crowd Insights</h3>
            <p className="text-gray-600">
              Know the best time to visit using smart prediction analytics.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;