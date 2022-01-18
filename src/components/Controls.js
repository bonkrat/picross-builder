import React, { useContext } from "react";
import styled from "styled-components";
import { store } from "../store";
import Button from "./Button";
import Tools from "./Tools";

const Controls = () => {
  const { dispatch } = useContext(store);
  const resetCells = () =>
    dispatch({
      type: "RESET_CELLS",
    });

  const savePuzzle = () => dispatch({ type: "SAVE_PUZZLE" });

  return (
    <ButtonGroup>
      <Tools />
      {/* <ColorPicker /> */}
      <Button onClick={resetCells}>Reset</Button>
      <Button onClick={savePuzzle} primary>
        Save
      </Button>
    </ButtonGroup>
  );
};

const ButtonGroup = styled.div`
  position: fixed;
  top: 10vh;
  width: 75vw;
  display: flex;
  justify-content: space-between;
`;

export default Controls;
