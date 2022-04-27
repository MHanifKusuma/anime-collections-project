import styled from "@emotion/styled";

const MainWrapper = styled.main`
  h1,
  h2,
  h3,
  h4,
  p,
  a {
    color: white;
  }
`;

export const Button = styled.button`
  padding: 8px 20px;
  margin: 0 10px;
  font-weight: 600;
  background-color: rgba(180, 254, 231, 0.8);
  border: none;
  border-radius: 5px;

  &.active {
    background-color: rgba(180, 254, 231, 0.4);
  }
`;

export default MainWrapper;
