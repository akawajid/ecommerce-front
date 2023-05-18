import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 10px;
  border-collapse: separate;
  
  th{
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: .8rem;
  }
  td{
    border-top: 1px solid rgba(0,0,0,.1);
    padding: 8px 0;
    margin-right:20px;
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />
}