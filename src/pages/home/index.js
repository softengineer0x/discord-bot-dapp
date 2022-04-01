import AOS from 'aos';
import 'aos/dist/aos.css';

import WalletConnect from "../../components/wallet/walletconnect";

AOS.init();

function Home() {
    return (
        <div>
            <div> <WalletConnect /></div>
        </div>
    );
}

export default Home;
