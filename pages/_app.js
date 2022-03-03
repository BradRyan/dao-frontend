import { ThirdwebProvider } from "@3rdweb/react";
import "../styles/globals.css";

// Put the ethereum chain ids of the chains you want to support
const mumbaiChainId = 80001;
const ethMainNetChainId = 1;
const ethRinkebyChainId = 4;
const polygonMainNetChainId = 137;
const supportedChainIds = [
  ethMainNetChainId,
  ethRinkebyChainId,
  polygonMainNetChainId,
  mumbaiChainId,
];

const connectors = {
  // metamask
  injected: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
