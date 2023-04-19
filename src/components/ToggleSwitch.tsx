import { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../colors";
import { ToggleOptions } from "../types";
import "../App.css";

const ToggleLabel = styled.h1`
  font-size: 20px;
  color: ${colors.green};
  margin: auto;
  padding: 4px;
`;
const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 50px;
  background-color: ${colors.backgroundColor};
  border: 2px solid ${colors.green};
  .active-toggle {
    background-color: ${colors.greenGlowInner};
    border-radius: 50px;
    border: 0;
    box-shadow: 0px 0px 6px 6px ${colors.greenGlowOutter};
    ${ToggleLabel} {
      color: ${colors.backgroundColor};
    }
  }
`;
const ToggleOption = styled.button`
  border-radius: 50px;
  background-color: ${colors.backgroundColor};
  margin: 8px;
  border: 0px;
  align-content: center;
  font-family: "Barlow", sans-serif;

  text-transform: uppercase;
`;

type ToggleSwitchProps = {
  activeToggleOption: ToggleOptions;
  onToggleChange: (toggleOption: ToggleOptions) => void;
};

export function ToggleSwitch(props: ToggleSwitchProps) {
  return (
    <ToggleButton>
      <ToggleOption
        className={
          props.activeToggleOption === "join" ? "active-toggle" : undefined
        }
        onClick={() => props.onToggleChange("join")}
      >
        <ToggleLabel>Join room</ToggleLabel>
      </ToggleOption>
      <ToggleOption
        className={
          props.activeToggleOption === "create" ? "active-toggle" : undefined
        }
        onClick={() => props.onToggleChange("create")}
      >
        <ToggleLabel>Create room</ToggleLabel>
      </ToggleOption>
    </ToggleButton>
  );
}
