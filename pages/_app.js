import "bootstrap/dist/css/bootstrap.css";
import WalletProvider from "../hooks/useWallet";
//BLOX
const contractAddress = "0x71C95911E9a5D330f4D621842EC243EE1343292e";

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
