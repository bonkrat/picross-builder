import { times } from "lodash";
import React, { memo, useContext } from "react";
import { store } from "../store";
import styled, { css } from "styled-components";

const MiniCell = styled.div`
  width: 5px;
  height: 5px;
  border: 1px solid black;
  ${(props) =>
    props.isSelected
      ? css`
          background: black;
        `
      : css`
          background: white;
        `}
`;

const MiniRow = styled.div`
  display: flex;
`;

const StyledMiniGrid = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 5px;
`;

const MiniGrid = ({ height, width, cells, split, section }) => {
  const getCell = ({ x, y }) => {
    return cells.length ? cells[x][y] : {};
  };

  const sections = {
    topLeft: (cell, split) => cell.x <= split.x && cell.y <= split.y,
    topRight: (cell, split) => cell.x > split.x && cell.y <= split.y,
    bottomLeft: (cell, split) => cell.x <= split.x && cell.y > split.y,
    bottomRight: (cell, split) => cell.x > split.x && cell.y > split.y,
  };

  return (
    <StyledMiniGrid>
      {times(height, (i) => (
        <MiniRow>
          {times(width, (j) => {
            const cell = { x: i, y: j },
              cellData = getCell(cell);

            if (sections[section](cell, split)) {
              return <MiniCell isSelected={cellData.selected} />;
            }
          })}
        </MiniRow>
      ))}
    </StyledMiniGrid>
  );
};

const SplitContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const Splits = ({ height, width }) => {
  const { state } = useContext(store);
  const { cells, split } = state;
  return (
    <SplitContainer>
      {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((section) => (
        <MiniGrid
          cells={cells}
          split={split}
          height={height}
          width={width}
          section={section}
          key={section}
        />
      ))}
    </SplitContainer>
  );
};
