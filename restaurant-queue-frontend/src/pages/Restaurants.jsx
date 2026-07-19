import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const restaurants = [
  {
    id: 1,
    name: "Spicy Villa",
    cuisine: "Indian",
    wait: "15 mins",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
  {
    id: 2,
    name: "Burger Hub",
    cuisine: "Fast Food",
    wait: "8 mins",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 3,
    name: "Pizza Town",
    cuisine: "Italian",
    wait: "20 mins",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 4,
    name: "Sushi Wave",
    cuisine: "Japanese",
    wait: "10 mins",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
  },
  {
    id: 5,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    wait: "18 mins",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  {
    id: 6,
    name: "Dragon Bowl",
    cuisine: "Chinese",
    wait: "12 mins",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
];

function Restaurants() {
  return (
    <div>
      <Navbar />

      <div className="pt-28 px-8 bg-gray-100 min-h-screen">
        <h1 className="text-5xl font-bold text-center mb-12">
          Explore Restaurants
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h2 className="text-3xl font-bold mb-2">
                  {restaurant.name}
                </h2>

                <p className="text-gray-600 mb-3">
                  {restaurant.cuisine}
                </p>

                <p className="text-red-500 font-semibold mb-5">
                  Wait Time: {restaurant.wait}
                </p>

                <Link
                  to={`/restaurant/${restaurant.id}`}
                  className="block text-center bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Restaurants;