import React from 'react';

function Card({ NFT }) {
    return (
        <div className="trade">
            <img className="img" alt={NFT.name} src={process.env.PUBLIC_URL + NFT.imgPath} />
            <div>
                <h2>{NFT.name}</h2>
                <p>{NFT.description}</p>
                <p>Owner: {NFT.owner}</p>
            </div>
        </div>
    );
}

export default Card;