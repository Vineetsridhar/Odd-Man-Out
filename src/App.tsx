import { Global, css } from "@emotion/react";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const DEFAULT_AUDIO_VOLUME = 0.5;

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
      <Global
        styles={css`
          body {
            background-color: ${colors.backgroundColor};
          }
        `}
      />
      <audio ref={audioRef} loop>
        <source src={BackgroundMusic}></source>
      </audio>
      <img
        onClick={handleMuteClicked}
        src={audioPlaying ? SoundOnIcon : SoundOffIcon}
        css={css`
          position: absolute;
          top: 32px;
          right: 32px;
          width: 24px;
          cursor: pointer;
          transition: all 0.1s ease-in-out;

          &:hover {
            transform: scale(1.1);
          }
        `}
      />
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
