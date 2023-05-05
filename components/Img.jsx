import Image from "next/image";
import styled from "styled-components";

const Relative = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

export default function Img({ className, src, alt, fill }) {
  return (
    <Relative>
      <Image className={className} src={src} alt={alt || "image alt"} fill={fill} />
    </Relative>
  );
}
