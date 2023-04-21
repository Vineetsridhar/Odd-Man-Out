import styled from "styled-components";
import { colors } from "../../colors";
const BODY_BREAKPOINT = 900;

export const Logo = styled.img`
  min-width: 200px;
  max-width: 450px;
  width: 100%;
  object-fit: contain;
  grid-area: logo;

  @media (max-width: ${BODY_BREAKPOINT}px) {
    max-width: 300px;
  }
`;

export const PlayButton = styled.button`
  height: 64px;
  background-color: ${colors.greenGlowInner};
  border-radius: 16px;
  border: 0;
  box-shadow: 0px 0px 8px 8px ${colors.greenGlowOutter};
  font-size: 2.5rem;
  grid-area: play-button;
  font-family: sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Barlow", sans-serif;
  cursor: pointer;

  @media (max-width: ${BODY_BREAKPOINT}px) {
    width: 200px;
  }
`;

export const ParentClass = styled.div`
  display: grid;
  justify-content: center;
  margin: 0 auto;
  grid-template-rows: 2fr auto auto;
  grid-template-columns: 4fr 3fr;
  grid-template-areas:
    "logo settings"
    "play-button play-button"
    "description description"
    "images images"
    "rules rules";
  column-gap: 32px;
  row-gap: 32px;
  font-family: "Barlow", sans-serif;
  text-transform: uppercase;
  padding: 24px 20%;
  max-width: 1000px;

  @media (max-width: ${BODY_BREAKPOINT}px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    ul {
      padding: 0;
    }
  }
`;

export const SettingsSection = styled.div`
  grid-area: settings;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 32px;
`;

export const DescriptionSection = styled.p`
  grid-area: description;
  font-size: 1.2em;
  color: ${colors.textColor};
  text-transform: initial;
  text-align: justify;
`;

export const DescriptionImages = styled.div`
  grid-area: images;
  display: flex;
  justify-content: center;
  gap: 32px;
  img {
    min-width: 100px;
    max-width: 400px;
    width: 100%;
    object-fit: contain;
  }

  @media (max-width: ${BODY_BREAKPOINT}px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const RulesSection = styled.div`
  grid-area: rules;
  border-top: 2px solid ${colors.red};
  padding: 24px;
  margin: 32px 0 0 0;
  h1 {
    font-size: 2em;
    color: ${colors.redGlowInner};
    text-shadow: 0 0 10px ${colors.red};
    position: absolute;
    transform: translateX(16px) translateY(-64px);
    padding: 0px 8px;
    background-color: ${colors.backgroundColor};
    border-left: 2px solid ${colors.red};
    border-right: 2px solid ${colors.red};
  }
  li {
    font-size: 1.2em;
    color: ${colors.textColor};
    text-transform: initial;
    margin: 24px;
  }
`;

export const HideableDiv = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  width: 100%;
  max-height: ${(props) => (props.visible ? "200px" : "0px")};
  transition: all 0.2s ease-in-out;
`;
