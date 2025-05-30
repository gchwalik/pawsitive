import PlacesList from './pages/PlacesListPage';
import CreatePlace from './pages/PlaceCreatePage';
import ViewPlace from './pages/PlaceViewPage';
import DeletePlace from './pages/PlaceDeletePage';

import { ROUTES } from "./consts";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import EditPlace from './pages/PlaceEditPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlacesList />} />
        <Route path={ROUTES.PLACES_CREATE} element={<CreatePlace />} />
        <Route path={ROUTES.PLACES_VIEW_PATTERN} element={<ViewPlace />} />
        <Route path={ROUTES.PLACES_EDIT_PATTERN} element={<EditPlace />} />
        <Route path={ROUTES.PLACES_DELETE_PATTERN} element={<DeletePlace />} />
      </Routes>
    </Router>
  );
}

export default App;
