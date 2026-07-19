import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await fetch("http://localhost:8080/api/queue");
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:8080/api/queue/${id}/${status}`, {
      method: "PUT",
    });

    fetchBookings();
  };

  const getStatusColor = (status) => {
    if (status === "WAITING") return "bg-yellow-100 text-yellow-700";
    if (status === "CONFIRMED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";
    if (status === "COMPLETED") return "bg-blue-100 text-blue-700";
  };

  return (
    <div>
      <Navbar />

      <div className="pt-28 min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 px-6">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800">
          🍽 Owner Dashboard
        </h1>

        <div className="max-w-6xl mx-auto grid gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 border-l-8 border-red-500 flex justify-between items-center"
            >
              {/* Left Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {booking.customerName}
                </h2>

                <div className="space-y-2 text-gray-600">
                  <p>📞 Mobile: {booking.mobile}</p>
                  <p>👥 Party Size: {booking.partySize}</p>
                  <p>⏰ Time: {booking.preferredTime}</p>
                </div>

                <div className="mt-4">
                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(booking.id, "CONFIRMED")}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow"
                >
                  ✔ Approve
                </button>

                <button
                  onClick={() => updateStatus(booking.id, "REJECTED")}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
                >
                  ✖ Reject
                </button>

                <button
                  onClick={() => updateStatus(booking.id, "COMPLETED")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
                >
                  ✓ Complete
                </button>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="text-center mt-20 text-gray-500 text-xl">
            No bookings available 🚫
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;