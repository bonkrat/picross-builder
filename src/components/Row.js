import React from "react";
import styled from "styled-components";
import generateClues from "../utils/generateClues";

export const Row = ({ className, width, selectedCells, children }) => (
  <div className={className}>
    <CellGroupValues width={width}>
      {generateClues(selectedCells).map((num, index) => (
        <CellGroupValue key={index}>{num}</CellGroupValue>
      ))}
    </CellGroupValues>
    <Cells>{children}</Cells>
  </div>
);

const CellGroupValue = styled.div`
  padding: 0 5px;
  font-weight: bold;
`;

const CellGroupValues = styled.div`
  box-sizing: border-box;
  font-size: 12px;
`;

const Cells = styled.div`
  margin-left: 20px;
`;

const StyledRow = styled(Row)`
  height: ${(props) => 100 / props.height}%;
  display: flex;
  justify-content: flex-end;
`;

StyledRow.defaultProps = {
  selectedCells: [],
};

export default StyledRow;
