import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function JoinQueue() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    mobile: "",
    partySize: "",
    preferredTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button clicked");

    const bookingData = {
      customerName: formData.customerName,
      mobile: formData.mobile,
      partySize: Number(formData.partySize),
      preferredTime: formData.preferredTime,
      restaurant: {
        id: Number(id),
      },
    };

    console.log("Sending:", bookingData);

    try {
      const response = await fetch("http://localhost:8080/api/queue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        console.log("Navigating...");
        
        // Navigate to restaurant-specific live tracker
        navigate(`/live-tracker/${id}`);
      } else {
        console.log("Booking failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="pt-28 min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex justify-center items-center px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            🍽 Join Queue
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="customerName"
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-400"
            />

            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-400"
            />

            <select
              name="partySize"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Select Party Size</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5+ People</option>
            </select>

            <input
              type="time"
              name="preferredTime"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-400"
            />

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300 font-semibold shadow-md"
            >
              Confirm Queue Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JoinQueue;