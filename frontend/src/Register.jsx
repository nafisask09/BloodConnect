import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    phone: "",
    location: "",
    availability: "true",
    lastDonationDate: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required field validation
    if (
      !formData.name.trim() ||
      !formData.age ||
      !formData.bloodGroup ||
      !formData.phone.trim() ||
      !formData.location.trim()
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    // Name validation
    if (!/^[A-Za-z ]+$/.test(formData.name.trim())) {
      setMessage("Please enter a valid name.");
      return;
    }

    // Age validation
    const age = Number(formData.age);

    if (age < 18 || age > 65) {
      setMessage("Donor age must be between 18 and 65.");
      return;
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    // Blood group validation
    const validBloodGroups = [
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-",
    ];

    if (!validBloodGroups.includes(formData.bloodGroup)) {
      setMessage("Please select a valid blood group.");
      return;
    }

    try {
      const donor = {
        ...formData,
        age: age,
        availability: formData.availability === "true",
      };

      const response = await fetch(`${API_URL}/api/donors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donor),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      await response.json();

      setMessage(
        "✅ Donor registered successfully! Redirecting to home..."
      );

      setFormData({
        name: "",
        age: "",
        bloodGroup: "",
        phone: "",
        location: "",
        availability: "true",
        lastDonationDate: "",
      });

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to register donor. Please make sure the backend server is running."
      );
    }
  };

  return (
    <div>
      <header className="navbar">
        <div className="logo">
          <span className="logo-mark">+</span>
          <span>BloodConnect</span>
        </div>

        <nav>
          <Link to="/">Home</Link>
          <a href="/#find">Find a Donor</a>
          <Link to="/register">Register</Link>
          <a href="/#about">About</a>
        </nav>
      </header>

      <main className="registration-container">
        <div className="registration-heading">
          <p className="small-heading">BECOME A DONOR</p>

          <h1>Register as a Blood Donor</h1>

          <p>
            Your donation could save a life. Register your details and make
            yourself available to people who may need your blood group.
          </p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="registration-row">
            <div className="form-group">
              <label>Full Name *</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Age *</label>

              <input
                type="number"
                name="age"
                placeholder="18 - 65"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="65"
              />
            </div>
          </div>

          <div className="registration-row">
            <div className="form-group">
              <label>Blood Group *</label>

              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
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

            <div className="form-group">
              <label>Phone Number *</label>

              <input
                type="tel"
                name="phone"
                placeholder="10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location *</label>

            <input
              type="text"
              name="location"
              placeholder="Enter city or location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="registration-row">
            <div className="form-group">
              <label>Availability</label>

              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>

            <div className="form-group">
              <label>Last Donation Date</label>

              <input
                type="date"
                name="lastDonationDate"
                value={formData.lastDonationDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="registration-button">
            Register as Donor
          </button>

          {message && (
            <p className="registration-message">
              {message}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}

export default Register;