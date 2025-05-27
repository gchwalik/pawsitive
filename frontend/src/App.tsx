import PlacesList from './pages/PlacesListPage';
import CreatePlace from './pages/PlaceCreatePage';

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlacesList />} />
        <Route path="/create" element={<CreatePlace />} />
      </Routes>
    </Router>
  );
}

export default App;
