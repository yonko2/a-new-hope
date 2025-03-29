import "./styles/App.css";
import SpaceScene from "./components/scene/SpaceScene.tsx";
import { Overlay } from "./components/overlay/Overlay.tsx";
import { useTimeUpdater } from "./hooks/useTimeUpdater.ts";
import { useDeliveryEventEmitter } from "./hooks/useDeliveryEventEmitter.ts";
import { useDeliveryUpdater } from "./hooks/useDeliveryUpdater.ts";

function App() {
  useTimeUpdater();
  useDeliveryUpdater();
  useDeliveryEventEmitter();

  return (
    <>
      <SpaceScene />
      <Overlay />
    </>
  );
}

export default App;
