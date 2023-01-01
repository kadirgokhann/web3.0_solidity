import "bootstrap/dist/css/bootstrap.css";
import WalletProvider from "../hooks/useWallet";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider contractAddress={contractAddress}>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default MyApp;
