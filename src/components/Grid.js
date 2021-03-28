import React, { useContext } from "react";
import Cell from "./Cell";
import Row from "./Row";
import { times } from "lodash";
import styled from "styled-components";
import ColumnHeader from "./ColumnHeader";
import { store } from "../store";

export const getRowData = (cells) =>
  cells.reduce((acc, curr) => {
    if (curr.selected) {
      acc[curr.x] = acc[curr.x] ? [...acc[curr.x], curr.y] : [curr.y];
    }
    return acc;
  }, {});

export const getColumnData = (cells) =>
  cells.reduce((acc, curr) => {
    if (curr.selected) {
      acc[curr.y] = acc[curr.y] ? [...acc[curr.y], curr.x] : [curr.x];
    }
    return acc;
  }, {});

const findCell = (cells, cell) =>
  cells.find((coords) => coords.x === cell.x && coords.y === cell.y);

/**
 * A nonogram grid.
 */
const Grid = ({ className, width, height }) => {
  const { state, dispatch } = useContext(store);
  const { selectedCells, tool } = state;

  const paintCell = ({ x, y }) => {
    dispatch({
      type: "PAINT_CELL",
      payload: {
        x,
        y,
      },
    });
  };

  const toggleCell = ({ x, y }) =>
    dispatch({
      type: "TOGGLE_CELL",
      payload: {
        x,
        y,
      },
    });

  const clearCell = ({ x, y }) =>
    dispatch({
      type: "CLEAR_CELL",
      payload: {
        x,
        y,
      },
    });

  const handleCellClick = ({ x, y }) => {
    if (tool === "pencil") {
      toggleCell({ x, y });
    } else if (tool === "brush") {
      paintCell({ x, y });
    } else if (tool === "eraser") {
      clearCell({ x, y });
    }
  };

  const getCell = ({ x, y }) => {
    return findCell(selectedCells, { x, y });
  };
  const rowGroups = getRowData(selectedCells);
  const columnGroups = getColumnData(selectedCells);

  return (
    <div className={className}>
      <ColumnHeader width={width} selectedCells={columnGroups} />
      {times(height, (i) => (
        <Row key={i} width={width} height={height} selectedCells={rowGroups[i]}>
          {times(width, (j) => {
            const cell = getCell({ x: i, y: j });
            return (
              <Cell
                key={j}
                color={cell && cell.color}
                isSelected={cell && cell.selected}
                onClick={() => handleCellClick({ x: i, y: j })}
              />
            );
          })}
        </Row>
      ))}
    </div>
  );
};

const size = 100;

const StyledGrid = styled(Grid)`
  max-height: ${size}vw;
  height: 100%;
  width: 100%;
  max-width: 1096px;
  display: flex;
  flex-direction: column;
  background-color: green;
`;

StyledGrid.defaultProps = {
  width: 5,
  height: 5,
};

export default StyledGrid;
