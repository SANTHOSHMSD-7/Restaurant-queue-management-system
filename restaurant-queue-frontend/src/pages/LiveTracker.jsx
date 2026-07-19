import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

function LiveTracker() {
  const [bookings, setBookings] = useState([]);
  const { id } = useParams();

  const fetchBookings = async () => {
    const response = await fetch(
      `http://localhost:8080/api/queue/restaurant/${id}`
    );
    const data = await response.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/queue", () => {
        fetchBookings();
      });
    });

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, [id]);

  const getStatusColor = (status) => {
    if (status === "WAITING") return "bg-yellow-100 text-yellow-700";
    if (status === "CONFIRMED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";
    if (status === "COMPLETED") return "bg-blue-100 text-blue-700";
  };

  return (
    <div>
      <Navbar />

      <div className="pt-28 min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 px-6">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800">
          🍽 Live Queue Tracker
        </h1>

        <div className="max-w-5xl mx-auto grid gap-8">
          {bookings.map((booking, index) => {
            const estimatedWait = (index + 1) * 5;

            return (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 border-l-8 border-red-500 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {booking.customerName}
                  </h2>

                  <div className="space-y-2 text-gray-600">
                    <p>👥 Party Size: {booking.partySize}</p>
                    <p>⏰ Preferred Time: {booking.preferredTime}</p>
                    <p className="text-orange-500 font-semibold">
                      ⏳ Estimated Wait: {estimatedWait} mins
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold mb-3 shadow">
                    Position #{index + 1}
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            );
          })}
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

export default LiveTracker;