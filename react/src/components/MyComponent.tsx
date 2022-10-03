import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import this library
import * as solanaWeb3 from '@solana/web3.js';
import React from 'react';

function MyComponent(){
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    
    
    
    return (
    	
        <WalletMultiButton />
        
    )
}

export default MyComponent