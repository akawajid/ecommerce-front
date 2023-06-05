import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 0 20px;

  @media(max-width:480px){
    max-width: 90%;
    padding: 0 10px;
  }
`;

export default function Center({children}) {
  return (
    <StyledDiv>{children}</StyledDiv>
  );
}