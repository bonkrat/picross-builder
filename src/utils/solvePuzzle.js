export const PUZZLE_NOT_SOLVABLE_ERROR = "ERROR: PUZZLE NOT SOLVABLE";
export const NO_MORE_VARIATIONS_ERROR =
  "ERROR: CANNOT SHIFT CELLS RIGHT, NO MORE VARIATIONS";
/**
 * Solve a nonogram based on row and column clues.
 *
 * @param rowClues {Array} e.g. [[1,1,1], [2,1], [1,2], [1]]
 */
export default function solvePuzzle(rowClues, columnClues, width, height) {
  const rowStack = [];

  // Test all rows until the puzzle is completed.
  // Create a potential row solution.
  const potentialSolution = getPotentialSolution(rowClues[0], width);
  rowStack.push(potentialSolution);

  let count = 0;

  while (rowStack.length !== height) {
    // Check columns against possible shifted iterations
    count += 1;
    // 8 is where it breaks!

    let valid = true;
    for (var i = 0; i < width; i++) {
      const col = getColumnValues(rowStack, i, height);
      // Check number of rows for how many are in the stack so far.
      if (!isValidOrder(col, columnClues[i], rowStack.length)) {
        // Shift the row and try a different iteration
        valid = false;
        break;
      }
    }

    if (valid) {
      // We got a valid solution, so push a new potential to the rowStack based on the next clues!
      rowStack.push(getPotentialSolution(rowClues[rowStack.length], width));
    } else {
      // The current row is not valid, we need to try more iterations.
      try {
        // Shift the right most block of cells to the right one.
        const newRow = shiftBlocksRight(rowStack[rowStack.length - 1]);
        rowStack.pop();
        rowStack.push(newRow);
      } catch (error) {
        // Catches if there is no space to move the blocks to the right, meaning no row pattern is valid.
        // Need to pop and iterate on the previous row.
        if (rowStack.length === 1) {
          throw new Error(PUZZLE_NOT_SOLVABLE_ERROR);
        }

        // Here we pop first to remove the latest row and backtrack to the previous.
        rowStack.pop();
        const newRow = shiftBlocksRight(rowStack[rowStack.length - 1]);
        rowStack.pop();
        rowStack.push(newRow);
      }
    }
  }

  return rowStack;
}

/**
 * Builds up an array of the currently selected column values.
 */
export function getColumnValues(rowStack, columnIndex, height) {
  return Array.from({
    ...rowStack.map((row) => row[columnIndex]),
    length: height,
  }).map((v) => v ?? false);
}

/**
 * Validates cells are in a valid order according to clues. Does not guarantee completeness, just that nothing invalid is set.
 * Builds a regexp like ^O{0,}(X{0,2}$|X{2}(X{0,2}$|O{1,}X{1})(X{0,2}$|O{1,}X{1})O{0,})$ for [2, 1, 1]
 *
 * @param rowIndex {number} This is the number of values in the column to validate up to. Should match the size of the stack of currently generated rows.
 */
export function isValidOrder(col, columnClues, rowIndex) {
  // Row index is used to validate that a column is valid up until the current row.
  const column = col.slice(0, rowIndex);

  if (columnClues.includes(0) && column.includes(true)) return false;

  const matcherString = column
    .map((selected) => (selected ? "X" : "O"))
    .join("");

  let regexString = "";
  if (columnClues.length === 1) {
    const clue = columnClues[0];
    regexString = `^O{0,}X{0,${clue}}O{0,}$`;
  } else {
    regexString += "^O{0,}(";

    regexString.concat(
      columnClues.map((clue, index, arr) => {
        if (index > 0) {
          regexString += `X{0,${clue}}$|X{${clue}}O{1,})`;
          if (index < arr.length - 1) {
            regexString += "(";
          }
        } else {
          regexString += `X{0,${clue}}$|X{${clue}}O{1,}(`;
        }
      })
    );

    regexString += "O{0,})$";
  }

  return new RegExp(regexString).test(matcherString);
}

export function shiftBlocksRight(row) {
  if (!Array.isArray(row)) {
    throw new Error("Row is not an array!");
  }

  let result = [];
  let start, end;
  let pointer = row.length;

  while (!result.length) {
    // Iterate backwards through previous set
    for (var i = pointer; i >= 0; i--) {
      // Find the first block of selected cells.
      if (row[i]) {
        // Found the first block.
        if (!end) {
          end = i;
        }

        if (i === 0 || row[i - 1] === false) {
          start = i;
          break;
        }
      } else {
        // Reached the end of the puzzle with no more groups, meaning no more variations available to shift.
        if (i === 0) {
          throw new Error(NO_MORE_VARIATIONS_ERROR);
        }
      }
    }

    // Check if can shift right
    if (end < row.length - 1 && !row[end + 2]) {
      // Shift right
      result = [...row];
      result[start] = false;
      result[end + 1] = true;
    } else {
      // If not, move to the previous block group and try.
      pointer = start - 1;
      start = undefined;
      end = undefined;
    }
  }

  return result;
}

export function getPotentialSolution(row, width) {
  const potentialSolution = new Array(width).fill(false);
  let pointer = 0;

  row.map((clue) => {
    // Place clue in the current solution guess
    let clueIterationCounter = clue;

    for (var i = pointer; i < width; i++) {
      if (i === width - 1 && clueIterationCounter > 1) {
        throw new Error("Invalid row entry");
      }

      potentialSolution[i] = true;

      clueIterationCounter -= 1;

      // Filled in selected cells, move space one to the right and got to next clue.
      if (clueIterationCounter === 0) {
        // Move ahead one to leave a space between the clues.
        pointer = i + 2;
        break;
      }
    }
  });

  return potentialSolution;
}
