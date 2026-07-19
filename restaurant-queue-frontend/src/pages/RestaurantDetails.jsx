import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";

const restaurants = [
  {
    id: 1,
    name: "Spicy Villa",
    cuisine: "Indian",
    wait: "15 mins",
    tables: "8",
    queue: "23",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
  {
    id: 2,
    name: "Burger Hub",
    cuisine: "Fast Food",
    wait: "8 mins",
    tables: "5",
    queue: "12",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 3,
    name: "Pizza Town",
    cuisine: "Italian",
    wait: "20 mins",
    tables: "6",
    queue: "30",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 4,
    name: "Sushi Wave",
    cuisine: "Japanese",
    wait: "10 mins",
    tables: "4",
    queue: "9",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
  },
  {
    id: 5,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    wait: "18 mins",
    tables: "7",
    queue: "19",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  {
    id: 6,
    name: "Dragon Bowl",
    cuisine: "Chinese",
    wait: "12 mins",
    tables: "9",
    queue: "15",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
];

function RestaurantDetails() {
  const { id } = useParams();

  const restaurant = restaurants.find((r) => r.id === Number(id));

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="pt-28 px-8 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">

            <Link
              to="/restaurants"
              className="text-red-500 font-semibold mb-4 inline-block"
            >
              ← Back to Restaurants
            </Link>

            <h1 className="text-4xl font-bold mb-4">{restaurant.name}</h1>

            <p className="text-gray-600 text-lg mb-6">
              {restaurant.cuisine} cuisine with premium dining experience.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-red-100 p-5 rounded-lg text-center shadow">
                <h3 className="font-bold text-2xl text-red-500">
                  {restaurant.wait}
                </h3>
                <p>Current Wait</p>
              </div>

              <div className="bg-green-100 p-5 rounded-lg text-center shadow">
                <h3 className="font-bold text-2xl text-green-500">
                  {restaurant.tables} Tables
                </h3>
                <p>Available</p>
              </div>

              <div className="bg-yellow-100 p-5 rounded-lg text-center shadow">
                <h3 className="font-bold text-2xl text-yellow-500">
                  {restaurant.queue}
                </h3>
                <p>People in Queue</p>
              </div>
            </div>

            <Link
              to={`/join/${restaurant.id}`}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600"
            >
              Join Queue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;