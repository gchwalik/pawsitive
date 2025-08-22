import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";

import "./App.css";
import Layout from "./components/Layout";
import CreatePlace from "./pages/PlaceCreatePage";
import DeletePlace from "./pages/PlaceDeletePage";
import EditPlace from "./pages/PlaceEditPage";
import PlacesList from "./pages/PlacesListPage";
import ViewPlace from "./pages/PlaceViewPage";
import { ROUTES } from "./routes";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<PlacesList />} />
          <Route path={ROUTES.FRONTEND.PLACES_CREATE} element={<CreatePlace />} />
          <Route
            path={ROUTES.PATTERNS.PLACES_VIEW_PATTERN}
            element={<ViewPlace />}
          />
          <Route
            path={ROUTES.PATTERNS.PLACES_EDIT_PATTERN}
            element={<EditPlace />}
          />
          <Route
            path={ROUTES.PATTERNS.PLACES_DELETE_PATTERN}
            element={<DeletePlace />}
          />

          {/* Catch-all route to redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
