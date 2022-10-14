import React from 'react';
import StackGrid from "react-stack-grid";

function Card({ NFT }: { NFT: any }) {
    return (
        
        <div className="trade">
            <StackGrid //supposed to give things a gallery type of view, but it's not working
                columnWidth={100}
                duration={0}
            >
                <div className="nftBox">
                    <img className="nftimg" width="auto" alt={NFT.name} src={process.env.PUBLIC_URL + NFT.imgPath} />
                </div>
                
                <div>
                    <h2>{NFT.name}</h2>
                    <p>{NFT.description}</p>
                    <p>Owner: {NFT.owner}</p>
                </div>
            </StackGrid>
        </div>
        
    );
}

export default Card;