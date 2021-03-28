import React from "react";
import styled, { css } from "styled-components";

const Cell = ({ className, onClick }) => (
  <div className={className} onClick={onClick}></div>
);

const StyledCell = styled(Cell)`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  cursor: pointer;
  box-sizing: border-box;
  background: ${(props) => (props.color ? props.color : "white")}
    ${(props) =>
      props.isSelected
        ? css`
            box-shadow: inset 1px 1px 0px 1px white;
          `
        : css`
            opacity: 0.5;
          `};
`;

export default StyledCell;
