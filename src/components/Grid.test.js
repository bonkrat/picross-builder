import { getColumnData, getRowData } from "./Grid";

describe("getRowData", () => {
  it("builds an object of row values", () => {
    expect(
      getRowData([
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 7 },
        { x: 0, y: 6 },
        { x: 1, y: 1 },
        { x: 1, y: 0 }
      ])
    ).toEqual({
      0: [1, 2, 7, 6],
      1: [1, 0]
    });
  });
});

describe("getColumnData", () => {
  it("builds an object of column values", () => {
    expect(
      getColumnData([
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 7 },
        { x: 0, y: 6 },
        { x: 1, y: 1 },
        { x: 1, y: 0 }
      ])
    ).toEqual({
      1: [0, 1],
      2: [0],
      7: [0],
      6: [0],
      0: [1]
    });
  });
});
