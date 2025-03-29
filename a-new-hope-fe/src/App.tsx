import "./styles/App.css";
import SpaceScene from "./components/scene/SpaceScene.tsx";
import { Overlay } from "./components/overlay/Overlay.tsx";
import { useTimeUpdater } from "./hooks/useTimeUpdater.ts";

function App() {
  useTimeUpdater();

  return (
    <>
      <SpaceScene />
      <Overlay />
    </>
  );
}

export default App;
