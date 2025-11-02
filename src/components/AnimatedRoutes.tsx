import { ReactNode } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';
import Index from '@/pages/Index';
import Universe from '@/pages/Universe';
import Create from '@/pages/Create';
import Discover from '@/pages/Discover';
import Feed from '@/pages/Feed';
import ExploreMap from '@/pages/ExploreMap';
import UniverseViewer from '@/pages/UniverseViewer';
import StoryPreview from '@/pages/StoryPreview';
import StoryPlayer from '@/pages/StoryPlayer';
import OriginalDetail from '@/pages/OriginalDetail';
import CreatorProfile from '@/pages/CreatorProfile';
import CreatorHub from '@/pages/CreatorHub';
import Dashboard from '@/pages/Dashboard';
import Studio from '@/pages/Studio';
import Publish from '@/pages/Publish';
import Remix from '@/pages/Remix';
import Collaboration from '@/pages/Collaboration';
import SearchResults from '@/pages/SearchResults';
import NotFound from '@/pages/NotFound';

interface PageConfig {
  path: string;
  element: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
}

const AnimatedRoutes = () => {
  const location = useLocation();

  // Map routes with transition directions for cinematic flow
  const pageConfigs: PageConfig[] = [
    { path: '/', element: <Index />, direction: 'down' },
    { path: '/universe', element: <Universe />, direction: 'left' },
    { path: '/universe/:id', element: <UniverseViewer />, direction: 'left' },
    { path: '/create', element: <Create />, direction: 'right' },
    { path: '/discover', element: <Discover />, direction: 'left' },
    { path: '/feed', element: <Feed />, direction: 'left' },
    { path: '/explore', element: <ExploreMap />, direction: 'up' },
    { path: '/preview/:id', element: <StoryPreview />, direction: 'up' },
    { path: '/story/:id', element: <StoryPlayer />, direction: 'up' },
    { path: '/originals', element: <OriginalDetail />, direction: 'left' },
    { path: '/creator/:id', element: <CreatorProfile />, direction: 'right' },
    { path: '/hub/:id', element: <CreatorHub />, direction: 'right' },
    { path: '/dashboard/*', element: <Dashboard />, direction: 'left' },
    { path: '/studio', element: <Studio />, direction: 'up' },
    { path: '/publish', element: <Publish />, direction: 'up' },
    { path: '/remix/:universeId', element: <Remix />, direction: 'right' },
    { path: '/collaboration', element: <Collaboration />, direction: 'right' },
    { path: '/search', element: <SearchResults />, direction: 'left' },
    { path: '*', element: <NotFound />, direction: 'left' }
  ];

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {pageConfigs.map((config) => (
          <Route
            key={config.path}
            path={config.path}
            element={
              <PageTransition direction={config.direction}>
                {config.element}
              </PageTransition>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
