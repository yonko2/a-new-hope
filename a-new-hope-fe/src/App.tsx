import './styles/App.css'
import SpaceScene from "./components/scene/SpaceScene.tsx";
import {Overlay} from "./components/overlay/Overlay.tsx";

function App() {
  return (
    <>
        <SpaceScene />
      <Overlay />
    </>
  );
}

export default App;
