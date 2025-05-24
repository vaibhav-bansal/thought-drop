import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Index />
  </TooltipProvider>
);

export default App;
