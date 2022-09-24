import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import this library
import * as solanaWeb3 from '@solana/web3.js';

const MyComponent = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    
  
    
    return (
    	<div>
            <WalletMultiButton />
        </div>
    )
}

export default MyComponent