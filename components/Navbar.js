import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWeb3 } from "@3rdweb/hooks";

import KiftLogo from "./Icons/KiftLogo";
import DiscordLogo from "./Icons/DiscordLogo";
import InstagramLogo from "./Icons/InstagramLogo";

const Container = styled.nav`
  background: #f1ebd9;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const NavbarRight = styled.div`
  display: flex;
`;

const Navbar = () => {
  const { address, chainId, connectWallet, disconnectWallet } = useWeb3();
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);

  useEffect(() => {
    setMetamaskInstalled(!!window?.ethereum);
  }, []);

  return (
    <Container>
      <div>
        <KiftLogo size={24} />
      </div>

      <NavbarRight>
        <a href="https://kift.io/">
          <DiscordLogo />
        </a>

        <a href="https://kift.io/">
          <InstagramLogo />
        </a>

        <a href="https://kift.io/">About</a>

        {address && <>Wallet: {address}</>}

        {!address && (
          <button onClick={() => connectWallet("injected")}>Connect</button>
        )}
      </NavbarRight>
    </Container>
  );
};

export default Navbar;
