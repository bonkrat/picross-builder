import { times } from "lodash";
import { chunk } from "lodash/fp";
import React, { createContext, useCallback, useMemo, useReducer } from "react";
import generateClues from "./utils/generateClues";
import sha256 from "crypto-js/sha256";
import { getColumnData } from "./components/Grid";
import { getColumnValues } from "./utils/solvePuzzle";
import { generateHint } from "./utils/generateHint";

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
  SPLIT: "split",
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
      split: {},
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
        case CELL_ACTIONS.SPLIT:
          return {
            ...state,
            split: { x, y },
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
        case "SAVE_PUZZLE":
          const puzzles = width > 5 ? splitPuzzle(width, cells) : [cells];

          const result = puzzles.map((puzz) => {
            let rowClues = [];
            let rowLength = 0;
            let colClues = [];

            let result = "";

            for (var i = 0; i < 5; i++) {
              for (var j = 0; j < 5; j++) {
                if (puzz[i] && puzz[i][j] && puzz[i][j].selected) {
                  result += `${i}${j}`;
                  console.log("result");
                }
              }
            }

            console.log(
              puzz.map((row) => {
                rowLength = row.length;
                const selected = row.reduce((acc, curr, index) => {
                  if (curr.selected) {
                    acc.push(index);
                  }
                  return acc;
                }, []);

                rowClues.push(generateClues(selected));
              })
            );
            // console.log(rowClues);

            for (var i = 0; i < rowLength; i++) {
              const colData = puzz.map((row) => row[i]);
              const selectedColCell = colData.reduce((acc, curr, index) => {
                if (curr.selected) {
                  acc.push(index);
                }
                return acc;
              }, []);
              colClues.push(generateClues(selectedColCell));
            }

            const hint = generateHint(colClues, rowClues, puzz);

            return {
              rowClues,
              colClues,
              hint,
              resultSha: sha256(result).toString(),
              height: 5,
              width: 5,
            };

            navigator.clipboard.writeText(puzz);
            console.log(puzz);
          });

          const rstring = JSON.stringify({ name: "", puzzles: result });
          navigator.clipboard.writeText(rstring);
          console.log(rstring);

          // let rowClues = [];
          // let rowLength = 0;
          // let colClues = [];

          // let result = "";

          // for (var i = 0; i < height; i++) {
          //   for (var j = 0; j < width; j++) {
          //     if (cells[i] && cells[i][j] && cells[i][j].selected) {
          //       result += `${i}${j}`;
          //     }
          //   }
          // }

          // console.log(
          //   cells.map((row) => {
          //     rowLength = row.length;
          //     const selected = row.reduce((acc, curr, index) => {
          //       if (curr.selected) {
          //         acc.push(index);
          //       }
          //       return acc;
          //     }, []);

          //     rowClues.push(generateClues(selected));
          //   })
          // );
          // // console.log(rowClues);

          // for (var i = 0; i < rowLength; i++) {
          //   const colData = cells.map((row) => row[i]);
          //   const selectedColCell = colData.reduce((acc, curr, index) => {
          //     if (curr.selected) {
          //       acc.push(index);
          //     }
          //     return acc;
          //   }, []);
          //   colClues.push(generateClues(selectedColCell));
          // }
          // // console.log(colClues);

          // const puzz = JSON.stringify({
          //   name: "",
          //   rowClues,
          //   colClues,
          //   resultSha: sha256(result).toString(),
          //   height,
          //   width,
          // });

          // navigator.clipboard.writeText(puzz);
          // console.log(puzz);

          return {
            ...state,
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

function splitPuzzle(size, cells) {
  const puzzles = new Array(2 ** (size / 5)).fill([]);
  let chunkNum = 0;

  const rowChunks = chunk(5)(cells);
  rowChunks.forEach((rows, i) => {
    // For each row in curr split into two
    [...rows].forEach((row, rowIndex) => {
      // Split row into two,
      chunk(5)(row).forEach((splitRow, j) => {
        // puzzles[i + j] = [...puzzles[i + j], splitRow];
        puzzles[chunkNum + j] = [...puzzles[chunkNum + j], splitRow];
      });
    });

    chunkNum += size / 5;
  });

  return puzzles;
}
