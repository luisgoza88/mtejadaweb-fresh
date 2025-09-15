import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProjectDetail from './ProjectDetail';
import HealingForestDetail from './HealingForestDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/proyecto/oficina-bio26" element={<ProjectDetail projectId="oficina-bio26" />} />
      <Route path="/proyecto/healing-forest" element={<HealingForestDetail projectId="healing-forest" />} />
    </Routes>
  );
}

export default App;