import React, { createContext, useReducer } from "react";

const initialState = { selectedCells: [], tool: "pencil", color: "black" };
const store = createContext(initialState);
const { Provider } = store;

const findCell = (cells, cell) =>
  cells.find((coords) => coords.x === cell.x && coords.y === cell.y);

export const CELL_ACTIONS = {
  SELECT: "select",
  TOGGLE: "toggle",
  PAINT: "paint",
  CLEAR: "clear",
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    let x = action?.payload.x,
      y = action?.payload.y,
      selectedCells = [];

    const cell = findCell(state.selectedCells, { x, y });

    switch (action.type) {
      case CELL_ACTIONS.SELECT:
        selectedCells = [
          ...state.selectedCells.filter(
            (coord) => !(coord.x === x && coord.y === y)
          ),
          { x, y, color: state.color, selected: true },
        ];

        return {
          ...state,
          selectedCells,
        };
      case CELL_ACTIONS.TOGGLE:
        console.log("cell", cell);
        if (!cell) {
          selectedCells = [
            ...state.selectedCells,
            { x, y, color: state.color, selected: state.tool === "pencil" },
          ];
        } else {
          selectedCells = [
            ...state.selectedCells.filter(
              (coord) => !(coord.x === x && coord.y === y)
            ),
            { x, y, color: state.color, selected: !cell.selected },
          ];
        }

        return {
          ...state,
          selectedCells,
        };
      case CELL_ACTIONS.PAINT:
        if (!cell) {
          selectedCells = [
            ...state.selectedCells,
            { x, y, color: state.color, selected: false },
          ];
        } else {
          selectedCells = [
            ...state.selectedCells.filter(
              (coord) => !(coord.x === x && coord.y === y)
            ),
            { x, y, color: state.color, selected: cell.selected },
          ];
        }

        return {
          ...state,
          selectedCells,
        };
      case CELL_ACTIONS.CLEAR:
        selectedCells = [
          ...state.selectedCells.filter(
            (coord) => !(coord.x === x && coord.y === y)
          ),
        ];

        return {
          ...state,
          selectedCells,
        };
      case "RESET_CELLS":
        return {
          ...state,
          selectedCells: [],
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
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
