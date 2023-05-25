import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StylesHeader = styled.header`
  background-color: #111;
`;

const Logo = styled(Link)`
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavWrapper = styled.nav`
  display: flex;
  gap: 2rem;
  color: #fff;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  padding:10px 0;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);

  return (
    <StylesHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <NavWrapper>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Products</NavLink>
            <NavLink href={"/"}>Categories</NavLink>
            <NavLink href={"/"}>My Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts?.length || 0})</NavLink>
          </NavWrapper>
        </Wrapper>
      </Center>
    </StylesHeader>
  );
}
