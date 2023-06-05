import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";

const Relative = styled.div`
  position:relative;
  display: flex;
  justify-content:center;
  align-items:center;
  width: 100%;
  height: ${(props) => props.height || 300}px;
`;

export default function Img(props) {
  return (
    <Relative height={props?.height}>
      <Image {...props} alt={props?.alt || "product image"} />
    </Relative>
  );
}
