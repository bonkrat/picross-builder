import generateClues from "./generateClues";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("groups adjascent selected cells into summed values", () => {
  expect(generateClues([0, 1, 2, 4, 5, 8, 9, 10])).toEqual([3, 2, 3]);
  expect(generateClues([2, 3, 1, 0])).toEqual([4]);
  expect(generateClues([9, 8, 7, 6])).toEqual([4]);
});
