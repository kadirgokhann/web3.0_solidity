import "bootstrap/dist/css/bootstrap.css";
import WalletProvider from "../hooks/useWallet";
//BLOX
const contractAddress = "0xbCF26943C0197d2eE0E5D05c716Be60cc2761508";

//LOCAL
//const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider contractAddress={contractAddress}>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default MyApp;
