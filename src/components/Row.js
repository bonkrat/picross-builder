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
  padding: 0 10px;
  font-weight: bold;
`;

const CellGroupValues = styled.div`
  width: 200px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
`;

const Cells = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: flex-end;
`;

StyledRow.defaultProps = {
  selectedCells: []
};

export default StyledRow;
