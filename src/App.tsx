import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProjectDetail from './ProjectDetail';
import HealingForestDetail from './HealingForestDetail';
import BelvedereDetail from './BelvedereDetail';
import HotelDOS7Detail from './HotelDOS7Detail';
import CasaAlterraDetail from './CasaAlterraDetail';
import ConsultaPage from './ConsultaPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/proyecto/oficina-bio26" element={<ProjectDetail projectId="oficina-bio26" />} />
      <Route path="/proyecto/healing-forest" element={<HealingForestDetail projectId="healing-forest" />} />
      <Route path="/proyecto/belvedere" element={<BelvedereDetail projectId="belvedere" />} />
      <Route path="/proyecto/hotel-dos7" element={<HotelDOS7Detail projectId="hotel-dos7" />} />
      <Route path="/proyecto/casa-alterra" element={<CasaAlterraDetail projectId="casa-alterra" />} />
      <Route path="/consulta" element={<ConsultaPage />} />
    </Routes>
  );
}

export default App;