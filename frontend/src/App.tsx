import PlacesList from './components/PlacesList';
import CreatePlace from './components/CreatePlace';

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
