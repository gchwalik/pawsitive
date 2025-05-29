import PlacesList from './pages/PlacesListPage';
import CreatePlace from './pages/PlaceCreatePage';
import ViewPlace from './pages/PlaceViewPage';
import { ROUTES } from "./consts";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlacesList />} />
        <Route path={ROUTES.PLACES_CREATE} element={<CreatePlace />} />
        <Route path={ROUTES.PLACES_VIEW_PATTERN} element={<ViewPlace />} />
      </Routes>
    </Router>
  );
}

export default App;
