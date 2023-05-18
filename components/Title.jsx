import styled from "styled-components";

const StyledTitle = styled.div`
  font-size: 30px;
  margin: 25px 0;
  font-weight: 600;
`;

export default function Title({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}
