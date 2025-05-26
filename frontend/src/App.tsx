import PlacesList from './components/PlacesList';

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlacesList />} />
      </Routes>
    </Router>
  );
}

export default App;
