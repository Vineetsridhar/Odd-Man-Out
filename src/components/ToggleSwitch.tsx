import { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../colors";
import { ToggleOptions } from "../types";

const ToggleLabel = styled.h1`
  font-size: 20px;
  color: ${colors.green};
  margin: auto;
  padding: 4px;
`;
const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  background-color: ${colors.secondaryBackgroundColor};
  border: 2px solid ${colors.green};
  .active-toggle {
    background-color: ${colors.green};
    ${ToggleLabel} {
      color: ${colors.textColor};
    }
  }
`;
const ToggleOption = styled.button`
  border-radius: 50px;
  background-color: ${colors.secondaryBackgroundColor};
  margin: 4px;
  border: 0px;
  align-content: center;
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
        <ToggleLabel>Join Room</ToggleLabel>
      </ToggleOption>
      <ToggleOption
        className={
          props.activeToggleOption === "create" ? "active-toggle" : undefined
        }
        onClick={() => props.onToggleChange("create")}
      >
        <ToggleLabel>Create Room</ToggleLabel>
      </ToggleOption>
    </ToggleButton>
  );
}
