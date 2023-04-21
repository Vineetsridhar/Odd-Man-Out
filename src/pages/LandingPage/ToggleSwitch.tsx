import { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../colors";
import { ToggleOptions } from "../../types";

const ToggleLabel = styled.h1`
  font-size: 20px;
  color: ${colors.greenGlowInner};
  text-shadow: 0 0 10px ${colors.green};
  margin: auto;
  padding: 4px;
  white-space: nowrap;
`;
const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 50px;
  background-color: ${colors.backgroundColor};
  border: 2px solid ${colors.green};
  padding: 0;
  cursor: pointer;

  .active-toggle {
    transition: all 0.3s;

    background-color: ${colors.greenGlowInner};
    border-radius: 50px;
    border: 0;
    box-shadow: 0px 0px 6px 6px ${colors.greenGlowOutter};
    ${ToggleLabel} {
      color: ${colors.backgroundColor};
      text-shadow: 0 0 0;
    }
  }
`;
const ToggleOption = styled.div`
  border-radius: 50px;
  background-color: ${colors.backgroundColor};
  margin: 8px;
  border: 0px;
  align-content: center;
  font-family: "Barlow", sans-serif;
  text-transform: uppercase;
  padding: 2px 8px;
`;

type ToggleSwitchProps = {
  activeToggleOption: ToggleOptions;
  onToggle: () => void;
};

export function ToggleSwitch({
  activeToggleOption,
  onToggle,
}: ToggleSwitchProps) {
  return (
    <ToggleButton>
      <ToggleOption
        className={activeToggleOption === "join" ? "active-toggle" : undefined}
        onClick={onToggle}
      >
        <ToggleLabel>Join room</ToggleLabel>
      </ToggleOption>
      <ToggleOption
        className={
          activeToggleOption === "create" ? "active-toggle" : undefined
        }
        onClick={onToggle}
      >
        <ToggleLabel>Create room</ToggleLabel>
      </ToggleOption>
    </ToggleButton>
  );
}
