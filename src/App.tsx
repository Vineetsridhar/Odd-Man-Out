import styled, { createGlobalStyle } from "styled-components";
import { colors } from "./colors";
import "./App.css";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import BackgroundMusic from "./assets/background-music.mp3";
import { useEffect, useRef, useState } from "react";
import SoundOffIcon from "./assets/sound-icon-off.png";
import SoundOnIcon from "./assets/sound-icon-on.png";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LobbyPage } from "./pages/LobbyPage/LobbyPage";
import { ROUTES } from "./routeHelpers";
import { socket } from "./socket";

const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <LandingPage />,
  },
  {
    path: ROUTES.lobby,
    element: <LobbyPage />,
  },
]);

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.backgroundColor};
  }
`;

const AudioButton = styled.img`
  position: absolute;
  top: 32px;
  right: 32px;
  width: 24px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const DEFAULT_AUDIO_VOLUME = 1;

function App() {
  const [audioPlaying, setAudioPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = DEFAULT_AUDIO_VOLUME;

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMuteClicked = () => {
    if (!audioRef.current) return;

    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setAudioPlaying(!audioPlaying);
  };

  return (
    <>
      <GlobalStyle />
      <audio ref={audioRef} loop>
        <source src={BackgroundMusic}></source>
      </audio>
      <AudioButton
        onClick={handleMuteClicked}
        src={audioPlaying ? SoundOnIcon : SoundOffIcon}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
