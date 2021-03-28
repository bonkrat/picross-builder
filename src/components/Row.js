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
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  font-size: 12px;
`;

const Cells = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  flex: 4;
  flex-shrink: 0;
  margin-left: 20px;
`;

const StyledRow = styled(Row)`
  width: 100%;
  height: ${(props) => 100 / props.height}%;
  display: flex;
  justify-content: flex-end;
`;

StyledRow.defaultProps = {
  selectedCells: [],
};

export default StyledRow;
