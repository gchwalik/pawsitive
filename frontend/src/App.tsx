import PlacesList from './pages/PlacesListPage';
import CreatePlace from './pages/PlaceCreatePage';
import ViewPlace from './pages/PlaceViewPage';

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlacesList />} />
        <Route path="/create" element={<CreatePlace />} />
        <Route path="/:id" element={<ViewPlace />} />
      </Routes>
    </Router>
  );
}

export default App;
