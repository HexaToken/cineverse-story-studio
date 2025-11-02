import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AtlasCompanion } from "@/components/AtlasCompanion";
import AnimatedRoutes from "@/components/AnimatedRoutes";
import ScrollProgress from "@/components/ScrollProgress";
import NotificationContainer from "@/components/Notifications/NotificationContainer";
import { AppProvider } from "@/context";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollProgress />
          <AnimatedRoutes />
          <AtlasCompanion />
          <NotificationContainer />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
