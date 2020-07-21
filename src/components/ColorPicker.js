import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
import { store } from "../store";

const ColorWindow = styled.div`
  width: 200px;
  height: 200px;
  padding: 15px;
  position: absolute;
  bottom: 80px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  background: white;
`;

const Color = styled.div`
  margin: 0 10px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  box-shadow: inset 0px 0px 0px 2px white;
  cursor: pointer;
  background-color: ${props => props.color || "white"}
    ${props =>
      props.selected &&
      css`
        border: 1px solid black;
      `};
`;

Color.defaultProps = {
  width: 30,
  height: 30
};

const colors = [
  "black",
  "blue",
  "red",
  "green",
  "yellow",
  "aqua",
  "crimson",
  "hotpink",
  "honeydew"
];

const ColorPicker = ({ className }) => {
  const { state, dispatch } = useContext(store);
  const [pickerOpen, setPickerOpen] = useState(false);
  const selectedColor = state.color;

  const setColor = color => () =>
    dispatch({
      type: "SET_COLOR",
      payload: color
    });

  const togglePicker = () => setPickerOpen(!pickerOpen);

  const handleClick = color => {
    setColor(color)();
    togglePicker();
  };

  return (
    <div className={className}>
      <Color
        width={50}
        height={50}
        selected={true}
        color={selectedColor}
        onClick={() => togglePicker()}
      />
      {pickerOpen && (
        <ColorWindow>
          {colors.map(color => (
            <Color
              selected={color === selectedColor}
              color={color}
              onClick={() => handleClick(color)}
            />
          ))}
        </ColorWindow>
      )}
    </div>
  );
};

const StyledColorPicker = styled(ColorPicker)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default StyledColorPicker;
