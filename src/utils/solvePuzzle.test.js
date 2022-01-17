import solvePuzzle, {
  getColumnValues,
  getPotentialSolution,
  isValidOrder,
  NO_MORE_VARIATIONS_ERROR,
  PUZZLE_NOT_SOLVABLE_ERROR,
  shiftBlocksRight,
} from "./solvePuzzle";

describe("solvePuzzle", () => {
  it("can solve a picross puzzle", () => {
    const rowClues = [[4], [1, 1], [4], [1], [1]],
      colClues = [[5], [1, 1], [1, 1], [3], [0]],
      width = 5,
      height = 5,
      solution = [
        [true, true, true, true, false],
        [true, false, false, true, false],
        [true, true, true, true, false],
        [true, false, false, false, false],
        [true, false, false, false, false],
      ];
    expect(solvePuzzle(rowClues, colClues, width, height)).toEqual(solution);
  });

  it("throws if the puzzle is not solvable", () => {
    const rowClues = [[4], [1, 1], [4], [1], [1]],
      colClues = [[5], [5], [1, 1], [3], [0]],
      width = 5,
      height = 5;

    expect(() => solvePuzzle(rowClues, colClues, width, height)).toThrow(
      PUZZLE_NOT_SOLVABLE_ERROR
    );
  });
});

describe("helper methods", () => {
  it("can determine if a potential solution is valid", () => {
    const row = [1, 1, 1];
    const potentialSolution = getPotentialSolution(row, 10);
    const col = getColumnValues([potentialSolution], 0, 10);

    expect(isValidOrder(col, [2, 1, 1], 1)).toBe(true);
  });

  it("can determine if a potential solution is invalid", () => {
    const row = [1, 1, 1];
    const potentialSolution = getPotentialSolution(row, 10);
    const col = getColumnValues([potentialSolution], 0, 10);

    expect(isValidOrder(col, [2, 1, 1], 2)).toBe(false);
  });

  describe("getPotentialSolution", () => {
    it("gets a potential solution to the row with the provided clues", () => {
      expect(getPotentialSolution([2, 3, 2], 10)).toEqual([
        true,
        true,
        false,
        true,
        true,
        true,
        false,
        true,
        true,
        false,
      ]);

      expect(getPotentialSolution([2], 5)).toEqual([
        true,
        true,
        false,
        false,
        false,
      ]);
    });

    it("throws when there's an invalid row", () => {
      const row = [2, 3, 5];
      const width = 10;

      expect(() => getPotentialSolution(row, width)).toThrow();
    });
  });

  describe("shiftBlocksRight", () => {
    it("testing this one specifically", () => {
      const test = [true, false, true, false, false];
      expect(shiftBlocksRight(test)).toEqual([true, false, false, true, false]);

      const test2 = [false, false, true, false, true];
      expect(() => shiftBlocksRight(test2)).toThrow(NO_MORE_VARIATIONS_ERROR);
    });

    it("shifts the right most block by one", () => {
      const shifted = shiftBlocksRight([
        true,
        true,
        false,
        true,
        true,
        true,
        false,
        true,
        true,
        false,
      ]);
      expect(shifted).toEqual([
        true,
        true,
        false,
        true,
        true,
        true,
        false,
        false,
        true,
        true,
      ]);
    });

    it("iterates backwards to find the right most group to shift to the right", () => {
      const row = getPotentialSolution([2, 3, 2], 10);

      let shifted = shiftBlocksRight(row);

      for (var i = 0; i < 2; i++) {
        shifted = shiftBlocksRight(shifted);
      }
      expect(shifted).toEqual([
        false,
        true,
        true,
        false,
        true,
        true,
        true,
        false,
        true,
        true,
      ]);
    });

    it("throws when it cannot shift right anymore", () => {
      expect(() => shiftBlocksRight([false, true, true])).toThrow();
    });
  });

  describe("isValidOrder", () => {
    it("testing something", () => {
      const test = [true, true, true, false, false];
      const cols = [1, 1];

      expect(isValidOrder(test, cols)).toBe(false);
    });

    it("validates a column", () => {
      const testColumns = [
        [false, true, true, false, false, true],
        [true, true, false, true, false, false, false],
        [false, true, true, false, true],
        [true, true],
        [false, true, true, false, false, false, false, false, false, false],
      ];

      const clues = [2, 1, 1];

      testColumns.forEach((column) => {
        expect(isValidOrder(column, clues)).toBe(true);
      });
    });

    it("returns false if there is a 0 clue but selected cells", () => {
      expect(isValidOrder([true, true], [0]));
    });

    it("returns false for invalid column", () => {
      const testColumns = [
        [true, false, false],
        [true, false],
        [false, true, false],
        [true, true, true],
        [true, true, false, true, true],
        [true, true, false, true, false, true, true],
        [true, false, true, true],
        [false, true, true, false, true, true],
      ];

      const clues = [2, 1, 1];

      testColumns.forEach((column) => {
        expect(isValidOrder(column, clues)).toBe(false);
      });
    });

    it("validates a single clue set", () => {
      expect(isValidOrder([true], [5])).toBe(true);
    });
  });

  describe("getColumnValues", () => {
    it("returns an array of values padded with false", () => {
      const rows = [
        [true, false, true],
        [false, true, false],
        [true, false, false],
      ];
      expect(getColumnValues(rows, 1, 5)).toEqual([
        false,
        true,
        false,
        false,
        false,
      ]);
    });
  });
});
