import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
const Services = lazy(() => import('./pages/Services'));
const Industries = lazy(() => import('./pages/Industries'));
const Healthcare = lazy(() => import('./pages/Healthcare'));
const EcommerceD2C = lazy(() => import('./pages/EcommerceD2C'));
const Fintech = lazy(() => import('./pages/Fintech'));
const Education = lazy(() => import('./pages/Education'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="industries" element={<Industries />} />
          <Route path="industries/healthcare" element={<Healthcare />} />
          <Route path="industries/ecommerce" element={<EcommerceD2C />} />
          <Route path="industries/fintech" element={<Fintech />} />
          <Route path="industries/education" element={<Education />} />
          <Route path="industries/:slug" element={<IndustryDetail />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
