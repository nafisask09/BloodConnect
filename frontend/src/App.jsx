import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Register from "./Register";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

function HomePage() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [donors, setDonors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Search donors
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!bloodGroup) {
      alert("Please select a blood group.");
      return;
    }

    if (!location.trim()) {
      alert("Please enter a location.");
      return;
    }

    setIsLoading(true);

    try {
      let url =
        `${API_URL}/api/donors/search?bloodGroup=` +
        encodeURIComponent(bloodGroup);

      if (location.trim()) {
        url += "&location=" + encodeURIComponent(location.trim());
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to search donors");
      }

      const data = await response.json();

      setDonors(data);
      setHasSearched(true);
      setLocationSuggestions([]);
      setShowSuggestions(false);
    } catch (error) {
      console.error("Search error:", error);
      alert("Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  // Location autocomplete
  const handleLocationChange = async (e) => {
    const value = e.target.value;

    setLocation(value);
    setHasSearched(false);

    if (value.trim().length < 2) {
      setLocationSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(true);

    try {
      const response = await fetch(
        `${API_URL}/api/donors/locations?query=` +
          encodeURIComponent(value)
      );

      if (!response.ok) {
        throw new Error("Unable to fetch location suggestions");
      }

      const data = await response.json();
      setLocationSuggestions(data);
    } catch (error) {
      console.error("Location suggestion error:", error);
      setLocationSuggestions([]);
    }
  };

  // Select location suggestion
  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setLocationSuggestions([]);
    setShowSuggestions(false);
    setHasSearched(false);

    if (inputRef.current) {
      inputRef.current.value = selectedLocation;
      inputRef.current.focus();
    }
  };

  // Handle click outside
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-mark">+</span>
          <span>BloodConnect</span>
        </div>

        <nav>
          <Link to="/">Home</Link>
          <a href="#find">Find a Donor</a>
          <Link to="/register">Register</Link>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="tagline">EVERY DROP MATTERS</p>

            <h1>
              Find a blood donor
              <br />
              when it matters most.
            </h1>

            <p className="hero-text">
              BloodConnect helps people quickly find available blood donors
              based on blood group and location.
            </p>

            <a href="#find" className="hero-button">
              Find a Donor
            </a>
          </div>

          <div className="hero-card">
            <div className="drop">♥</div>

            <h3>Be someone's hope.</h3>

            <p>
              A simple donation can make a meaningful difference in someone's
              life.
            </p>
          </div>
        </section>

        {/* SEARCH */}
        <section className="search-section" id="find">
          <div className="section-heading">
            <p className="small-heading">FIND A DONOR</p>

            <h2>Search for available donors</h2>

            <p>
              Enter the required blood group and location to find matching
              donors.
            </p>
          </div>

          <form className="search-box" onSubmit={handleSearch}>
            {/* BLOOD GROUP */}
            <div className="form-group">
              <label>Blood Group</label>

              <select
                value={bloodGroup}
                onChange={(e) => {
                  setBloodGroup(e.target.value);
                  setHasSearched(false);
                  setDonors([]);
                }}
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* LOCATION */}
            <div className="form-group location-group">
              <label>Location</label>

              <div className="location-input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter city or location"
                  value={location}
                  onChange={handleLocationChange}
                  onBlur={handleBlur}
                  onFocus={() => {
                    if (location.trim().length >= 2) {
                      setShowSuggestions(true);
                    }
                  }}
                  autoComplete="off"
                />

                {/* SUGGESTION LIST */}
                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="location-suggestions">
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        type="button"
                        className="location-suggestion"
                        key={index}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleLocationSelect(suggestion);
                        }}
                      >
                        📍 {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search Donors"}
            </button>
          </form>

          {/* DONOR RESULTS */}
          {hasSearched && donors.length > 0 && (
            <div className="donor-results">
              <h3>Available Donors</h3>

              <div className="donor-grid">
                {donors.map((donor) => (
                  <div className="donor-card" key={donor.id}>
                    <div className="donor-blood">{donor.bloodGroup}</div>

                    <div className="donor-details">
                      <h4>{donor.name}</h4>

                      <p>📍 {donor.location}</p>

                      <p>📞 {donor.phone}</p>

                      <p>Age: {donor.age}</p>

                      <span
                        className={
                          donor.availability
                            ? "availability available"
                            : "availability unavailable"
                        }
                      >
                        {donor.availability
                          ? "Available"
                          : "Currently unavailable"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NO RESULTS */}
          {hasSearched && donors.length === 0 && bloodGroup && (
            <div className="no-results">
              No available donors found for {bloodGroup}
              {location.trim() ? ` in ${location}` : ""}.
            </div>
          )}
        </section>

        {/* INFORMATION */}
        <section className="info-section" id="about">
          <div className="info-card">
            <div className="info-number">01</div>

            <h3>Search</h3>

            <p>
              Search for donors using the blood group and location you need.
            </p>
          </div>

          <div className="info-card">
            <div className="info-number">02</div>

            <h3>Connect</h3>

            <p>
              Find available donors who match your requirements.
            </p>
          </div>

          <div className="info-card">
            <div className="info-number">03</div>

            <h3>Help</h3>

            <p>
              Connect with a donor and take the next step toward helping
              someone in need.
            </p>
          </div>
        </section>

        {/* REGISTER */}
        <section className="register-section">
          <div>
            <p className="small-heading">BECOME A DONOR</p>

            <h2>Your donation could save a life.</h2>

            <p>
              Register as a blood donor and make yourself available to people
              who may need your blood group.
            </p>
          </div>

          <Link to="/register" className="register-link-button">
            Register as Donor
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="logo">
          <span className="logo-mark">+</span>
          <span>BloodConnect</span>
        </div>

        <p>Connecting donors with people in need.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;