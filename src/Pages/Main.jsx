import React, { useState } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar/NavBar";
import MainTitle from "../Components/MainTitle/MainTitle";
import "../Style/Main/Main.css";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../Components/Loader/Loader";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Main() {
  const [Location, setLocation] = useState(null);
  const [Current, setCurrent] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [SearchValue, setSearchValue] = useState("");

  const getData = () => {
    if (!SearchValue.trim()) {
      toast.error("Please enter a country or region name.");
      return;
    }

    setLoading(true);

    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=fcb705eb5e0845eab9c203644251702&q=${SearchValue}&aqi=no`
      )
      .then((response) => {
        setLocation(response.data.location);
        setCurrent(response.data.current);
        console.log(response.data);
        
      })
      .catch((error) => {
        toast.error("Failed to fetch data. Please try again.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <NavBar />
      <MainTitle />
      <div>
        <div className="searchBar">
          <input
            type="search"
            value={SearchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search Here"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.7 }}
            className="search-button"
            onClick={getData}
          >
            Search
          </motion.button>
        </div>
      </div>

      <section>
        {Loading ? (
          <Loader />
        ) : Location && Current ? (
          <div className="container">
            <div className="row  d-flex align-items-start">
              {/* كارت معلومات الموقع */}
              <div className="col-xl-4 col-12 my-3">
                <div className="card">
                  <h4>📍 Location</h4>
                  <p>
                    <strong>Country:</strong> {Location.country}
                  </p>
                  <p>
                    <strong>City:</strong> {Location.name}
                  </p>
                  <p>
                    <strong>Local Time:</strong> {Location.localtime}
                  </p>
                </div>
              </div>

              {/* كارت معلومات الطقس الأساسية */}
              <div className="col-xl-4 col-12 my-3">
                <div className="card">
                  <h4>🌤 Weather</h4>
                  <p>
                    <strong>Temperature:</strong> {Current.temp_c}°C
                  </p>
                  <p>
                    <strong>Feels Like:</strong> {Current.feelslike_c}°C
                  </p>
                  <p>
                    <strong>Condition:</strong> {Current.condition.text}
                  </p>
                  <img
                    src={Current.condition.icon}
                    alt={Current.condition.text}
                    width="50"
                  />
                </div>
              </div>

              {/* كارت البيانات الإضافية */}
              <div className="col-xl-4 col-12 my-3">
                <div className="card">
                  <h4>📊 Details</h4>
                  <p>
                    <strong>Humidity:</strong> {Current.humidity}%
                  </p>
                  <p>
                    <strong>Wind Speed:</strong> {Current.wind_kph} kph
                  </p>
                  <p>
                    <strong>Pressure:</strong> {Current.pressure_mb} mb
                  </p>
                  <p>
                    <strong>Visibility:</strong> {Current.vis_km} km
                  </p>
                  <p>
                    <strong>UV Index:</strong> {Current.uv}
                  </p>
                </div>
              </div>
            </div>
              <div className="col-12  p-4">
                <div className="map">
                    <MapContainer
                      center={[Location.lat, Location.lon]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ height: "400px", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[Location.lat, Location.lon]}>
                        <Popup>
                          {Location.name}, {Location.country}
                        </Popup>
                      </Marker>
                    </MapContainer>
                </div>
              </div>
            </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Enter a location to get weather data.
          </p>
        )}
      </section>

      <Toaster />
    </>
  );
}

export default Main;
