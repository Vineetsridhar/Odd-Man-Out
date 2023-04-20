import styled from "styled-components";
import { colors } from "../colors";

const LandingPageInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0;
  width: 100%;
`;
const RedLabel = styled.h1`
  color: ${colors.redGlowInner};
  text-shadow: 0 0 10px ${colors.red};
  font-size: 0.8em;
  position: absolute;
  transform: translateX(10px) translateY(-24px);
  padding: 2px 8px;
  pointer-events: none;
  background-color: ${colors.backgroundColor};
  border-left: 2px solid ${colors.red};
  border-right: 2px solid ${colors.red};
`;
const LandingPageInput = styled.input`
  background-color: ${colors.backgroundColor};
  border: 2px solid ${colors.red};
  width: 100%;
  color: ${colors.textColor};
  font-size: 1em;
  border-radius: 4px;
  height: 20px;
  padding: 12px;
  outline: none;
  font-family: "Barlow", sans-serif;
`;
type LabeledInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LabeledInput = ({ value, onChange, label }: LabeledInputProps) => {
  return (
    <LandingPageInputContainer>
      <RedLabel>{label}</RedLabel>
      <LandingPageInput type="text" value={value} onChange={onChange} />
    </LandingPageInputContainer>
  );
};
