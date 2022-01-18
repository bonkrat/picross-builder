import { times } from "lodash";
import React, { useContext, useState, memo } from "react";
import styled from "styled-components";
import TOOLS from "../constants/tools";
import useMouseDown from "../hooks/useMouseButton";
import { CELL_ACTIONS, store } from "../store";
import Cell from "./Cell";

const MemoizedCell = memo(Cell);

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

/**
 * A nonogram grid.
 */
const Grid = ({ className, width, height }) => {
  const { state, dispatch } = useContext(store);
  const { cells, tool, split } = state;
  const [isSelecting, setIsSelecting] = useState(null);

  const { isMouseDown } = useMouseDown(
    // onMouseUp
    () => {},
    // onMouseDown
    () => {
      setIsSelecting(null);
    }
  );

  const selectCell = (cell) =>
    dispatch({
      type: CELL_ACTIONS.SELECT,
      payload: cell,
    });

  const toggleCell = (cell) =>
    dispatch({
      type: CELL_ACTIONS.TOGGLE,
      payload: cell,
    });

  const paintCell = (cell) => {
    dispatch({
      type: CELL_ACTIONS.PAINT,
      payload: cell,
    });
  };

  const clearCell = (cell) =>
    dispatch({
      type: CELL_ACTIONS.CLEAR,
      payload: cell,
    });

  const setSplit = (cell) =>
    dispatch({ type: CELL_ACTIONS.SPLIT, payload: cell });

  const handleCellClick = (cell) => () => {
    if (tool === TOOLS.PENCIL) {
      toggleCell(cell);
    } else if (tool === TOOLS.BRUSH) {
      paintCell(cell);
    } else if (tool === TOOLS.ERASER) {
      clearCell(cell);
    } else if (tool === TOOLS.SPLIT) {
      setSplit(cell);
    }
  };

  const handleMouseEnter = (cell) => () => {
    if (isMouseDown && isSelecting) {
      selectCell(cell);
    } else if (isMouseDown && !isSelecting) {
      clearCell(cell);
    } else {
      const cellData = getCell(cell);
      if (cellData?.selected) {
        setIsSelecting(false);
      } else {
        setIsSelecting(true);
      }
    }
  };

  const getCell = ({ x, y }) => {
    return cells.length ? cells[x][y] : {};
  };
  // const rowGroups = getRowData(selectedCells);
  // const columnGroups = getColumnData(selectedCells);

  return (
    <div className={className}>
      {times(height, (i) =>
        times(width, (j) => {
          const cell = { x: i, y: j },
            cellData = getCell(cell);
          let splitBorder;

          if (split) {
            splitBorder = [
              cell.x === split.x && "bottom",
              cell.y === split.y && "right",
            ];
          }

          return (
            <MemoizedCell
              key={`${i}${j}`}
              color={cellData.color}
              splitBorder={splitBorder}
              isSelected={cellData.selected}
              onMouseDown={handleCellClick(cell)}
              onMouseEnter={handleMouseEnter(cell)}
            />
          );
        })
      )}
    </div>
  );
};

const buildColumnAutos = (num) => times(num, () => "auto").join(" "),
  StyledGrid = styled(Grid)`
    height: ${() => {
      return window.innerWidth > window.innerHeight ? `75vh` : `75vw`;
    }};
    width: ${() => (window.innerWidth > window.innerHeight ? `75vh` : `75vw`)};
    display: grid;
    grid-template-columns: ${(props) => buildColumnAutos(props.width)} 
    grid-template-rows:  ${(props) => buildColumnAutos(props.height)}
`;

StyledGrid.defaultProps = {
  width: 15,
  height: 15,
};

export default StyledGrid;
