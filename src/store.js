import { times } from "lodash";
import React, { createContext, useCallback, useMemo, useReducer } from "react";

const initialState = {
  cells: [],
  tool: "pencil",
  color: "black",
};

const store = createContext(initialState);
const { Provider } = store;

export const CELL_ACTIONS = {
  SELECT: "select",
  TOGGLE: "toggle",
  PAINT: "paint",
  CLEAR: "clear",
};

const StateProvider = ({ children, width, height }) => {
  const buildCells = useCallback(() => {
    const cells = times(width, () =>
      times(height, () => ({
        selected: false,
        color: "black",
      }))
    );

    return cells;
  }, [width, height]);

  const initialState = useMemo(
    () => ({
      cells: buildCells(),
      tool: "pencil",
      color: "black",
    }),
    [buildCells]
  );

  const reducer = useCallback(
    (state, action) => {
      let x = action?.payload?.x,
        y = action?.payload?.y,
        newCells = [],
        cell;

      const { cells } = state;

      switch (action.type) {
        case CELL_ACTIONS.SELECT:
          newCells = [...cells];
          cell = cells[x][y];

          newCells[x][y] = {
            color: state.color,
            selected: true,
          };

          return {
            ...state,
            cells: [...newCells],
          };
        case CELL_ACTIONS.TOGGLE:
          newCells = [...cells];
          cell = cells[x][y];

          newCells[x][y] = {
            ...newCells[x][y],
            selected: !cell.selected,
          };

          return {
            ...state,
            cells: newCells,
          };
        case CELL_ACTIONS.PAINT:
          newCells = [...cells];
          cell = cells[x][y];

          newCells[x][y] = {
            ...newCells[x][y],
            color: state.color,
          };

          return {
            ...state,
            cells: newCells,
          };
        case CELL_ACTIONS.CLEAR:
          newCells = [...cells];
          cell = cells[x][y];

          newCells[x][y] = {
            ...newCells[x][y],
            color: state.color,
            selected: false,
          };

          return {
            ...state,
            cells: newCells,
          };
        case "RESET_CELLS":
          newCells = buildCells();
          return {
            ...state,
            cells: newCells,
          };
        case "SET_TOOL":
          return {
            ...state,
            tool: action.payload,
          };
        case "SET_COLOR":
          return {
            ...state,
            color: action.payload,
          };
        default:
          throw new Error();
      }
    },
    [initialState.cells]
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

StateProvider.defaultProps = {
  width: 10,
  height: 10,
};

export { store, StateProvider };
