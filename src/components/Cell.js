import React from "react";
import styled, { css } from "styled-components";

const Cell = ({ className, onMouseDown, onMouseEnter }) => (
  <div
    className={className}
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter}
  ></div>
);

const StyledCell = styled(Cell)`
  cursor: pointer;
  box-sizing: border-box;

  // Coloring cells is disabled for now.

  ${(props) =>
    props.splitBorder
      ? css`
          border: 1px solid black;
          ${props.splitBorder.map(
            (border) => `border-${border}: 5px solid green;`
          )}
        `
      : css`
          border: 1px solid black;
        `}

  ${(props) =>
    props.isSelected
      ? css`
          background: black;
          box-shadow: inset 2px 2px 0px 2px white;
        `
      : css`
          background: white;
        `};

  &:hover {
    border: 1px solid blue;
    box-shadow: inset 1px 1px 0px 1px white;
    background: gray;
  }
`;

export default StyledCell;
