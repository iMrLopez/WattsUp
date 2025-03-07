import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // Update the URL as needed. In Docker Compose, you might use a service name.
    axios.get("http://localhost:8000/").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <p>{data ? JSON.stringify(data) : "Loading backend response..."}</p>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
