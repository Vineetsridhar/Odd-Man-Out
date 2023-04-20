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
    </div>
  );
}

export default App;
