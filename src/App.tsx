import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AtlasCompanion } from "@/components/AtlasCompanion";
import Index from "./pages/Index";
import Universe from "./pages/Universe";
import Create from "./pages/Create";
import Discover from "./pages/Discover";
import Feed from "./pages/Feed";
import ExploreMap from "./pages/ExploreMap";
import UniverseViewer from "./pages/UniverseViewer";
import StoryPreview from "./pages/StoryPreview";
import StoryPlayer from "./pages/StoryPlayer";
import OriginalDetail from "./pages/OriginalDetail";
import CreatorProfile from "./pages/CreatorProfile";
import CreatorHub from "./pages/CreatorHub";
import Dashboard from "./pages/Dashboard";
import Studio from "./pages/Studio";
import Publish from "./pages/Publish";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/universe" element={<Universe />} />
          <Route path="/universe/:id" element={<UniverseViewer />} />
          <Route path="/create" element={<Create />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/explore" element={<ExploreMap />} />
          <Route path="/preview/:id" element={<StoryPreview />} />
          <Route path="/story/:id" element={<StoryPlayer />} />
          <Route path="/originals" element={<OriginalDetail />} />
          <Route path="/creator/:id" element={<CreatorProfile />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/publish" element={<Publish />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AtlasCompanion />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
