import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";
import "./App.css";
import { LandingPage } from "./pages/LandingPage/LandingPage";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.backgroundColor};
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <LandingPage />
      <audio controls preload="auto">
        <p> No support</p>
        <source src="file:///Users/vineet/Downloads/record-(online-voice-recorder-By-tuna.voicemod.net.mp3" />
      </audio>
    </div>
  );
}

export default App;
