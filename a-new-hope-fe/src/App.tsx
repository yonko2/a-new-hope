import "./styles/App.css";
import SpaceScene from "./components/scene/SpaceScene.tsx";
import { Overlay } from "./components/overlay/Overlay.tsx";
import { useTimeUpdater } from "./hooks/useTimeUpdater.ts";
import { useDeliveryEventEmitter } from "./hooks/useDeliveryEventEmitter.ts";
import { useDeliveryUpdater } from "./hooks/useDeliveryUpdater.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { memo } from "react";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SpaceScene />
      <Overlay />
      <Listeners />
    </QueryClientProvider>
  );
}

const Listeners = memo(function Listeners() {
  useTimeUpdater();
  useDeliveryUpdater();
  useDeliveryEventEmitter();

  return null;
});

export default App;
