import React from "react";
import { Row } from "./Row";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Row", () => {
  it("displays the groups of selected cells", () => {
    const wrapper = shallow(
      <Row className="foo" selectedCells={[8, 5, 4, 1]}>
        <div>foobar</div>
      </Row>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
