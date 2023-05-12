import Image from "next/image";
import styled from "styled-components";

const Relative = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

export default function Img(props) {
  return (
    <Relative>
      <Image {...props} alt={props?.alt || 'product image'} />
    </Relative>
  );
}
