import PlacesList from './pages/PlacesListPage';
import CreatePlace from './pages/PlaceCreatePage';
import ViewPlace from './pages/PlaceViewPage';
import DeletePlace from './pages/PlaceDeletePage';

import { ROUTES } from "./routes";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import EditPlace from './pages/PlaceEditPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlacesList />} />
        <Route path={ROUTES.FRONTEND.PLACES_CREATE} element={<CreatePlace />} />
        <Route path={ROUTES.PATTERNS.PLACES_VIEW_PATTERN} element={<ViewPlace />} />
        <Route path={ROUTES.PATTERNS.PLACES_EDIT_PATTERN} element={<EditPlace />} />
        <Route path={ROUTES.PATTERNS.PLACES_DELETE_PATTERN} element={<DeletePlace />} />
      </Routes>
    </Router>
  );
}

export default App;
