import React, { useContext } from "react";
import Button from "./Button";
import ColorPicker from "./ColorPicker";
import Tools from "./Tools";
import styled from "styled-components";
import { store } from "../store";

const Controls = () => {
  const { dispatch } = useContext(store);
  const resetCells = () =>
    dispatch({
      type: "RESET_CELLS",
    });
  return (
    <ButtonGroup>
      <Tools />
      <ColorPicker />
      <Button onClick={resetCells}>Reset</Button>
      <Button primary>Save</Button>
    </ButtonGroup>
  );
};

const ButtonGroup = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default Controls;
