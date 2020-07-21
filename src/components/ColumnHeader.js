import React from "react";
import { times } from "lodash";
import styled from "styled-components";
import generateClues from "../utils/generateClues";

const ColumnHeader = ({ className, width, selectedCells }) => (
  <div className={className}>
    {times(width, i => (
      <CellGroupValues key={i}>
        {selectedCells[i] &&
          generateClues(selectedCells[i]).map((cell, index) => (
            <CellGroupValue key={index}>{cell}</CellGroupValue>
          ))}
      </CellGroupValues>
    ))}
  </div>
);

const CellGroupValue = styled.div`
  padding: 10px 0;
  font-weight: bold;
`;

const CellGroupValues = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 50px;
  height: 100%;
  border: 1px solid white;
`;

const StyledColumnHeader = styled(ColumnHeader)`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default StyledColumnHeader;
