import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWeb3 } from "@3rdweb/hooks";

import KiftLogo from "./Icons/KiftLogo";

const Container = styled.nav`
  display: flex;
  background: #f1ebd9;
  justify-content: space-between;
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
        <KiftLogo />
      </div>

      <div>
        <a href="https://kift.io/">Gallery</a>
        <a href="https://kift.io/">About</a>

        {address && <>Wallet: {address}</>}

        {!address && (
          <div>
            <div>Please connect to Metamask to continue</div>
            <button onClick={() => connectWallet("injected")}>Connect</button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Navbar;
