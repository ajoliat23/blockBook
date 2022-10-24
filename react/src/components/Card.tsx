import React from 'react';

function Card({ NFT }: { NFT: any }) {
    return (

        
        <div className="">
               
            <div className="nftBox">
                <img className="nftimg" width="auto" alt={NFT.name} src={process.env.PUBLIC_URL + NFT.imgPath} />
                    <div>
                        <h2>{NFT.name}</h2>
                        <p>{NFT.description}</p>
                        <p>Owner: {NFT.owner}</p>
                    </div>
            </div>
      
        </div>
    );
}

export default Card;