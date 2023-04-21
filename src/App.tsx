import styled, { createGlobalStyle } from "styled-components";
import { colors } from "./colors";
import "./App.css";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import BackgroundMusic from "./assets/background-music.mp3";
import { useEffect, useRef, useState } from "react";
import SoundOffIcon from "./assets/sound-icon-off.png";
import SoundOnIcon from "./assets/sound-icon-on.png";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.backgroundColor};
  }
`;

const AudioButton = styled.img`
  position: absolute;
  top: 32px;
  right: 32px;
  height: 16px;
  cursor: pointer;
`;

const DEFAULT_AUDIO_VOLUME = 0.01;

function App() {
  const [audioPlaying, setAudioPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = DEFAULT_AUDIO_VOLUME;
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
    <div>
      <GlobalStyle />
      <LandingPage />
      <audio ref={audioRef} loop>
        <source src={BackgroundMusic}></source>
      </audio>
      <AudioButton
        onClick={handleMuteClicked}
        src={audioPlaying ? SoundOnIcon : SoundOffIcon}
      />
    </div>
  );
}

export default App;
