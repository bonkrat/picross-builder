import React from "react";
import styled, { css } from "styled-components";

const Button = ({ className, onClick, children }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

const StyledButton = styled(Button)`
  display: inline-block;
  border-radius: 5px;
  padding: 1rem 0;
  margin: 0.5rem 1rem;
  width: 8rem;
  background: white;
  border: 2px solid black;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: inset -2px -2px 0px 1px black;

  ${(props) =>
    props.primary &&
    css`
      border: 2px solid black;
      box-shadow: inset -2px -2px 0px 1px white;
      background: black;
      color: white;
    `}
`;

export default StyledButton;
