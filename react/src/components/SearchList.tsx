import React from 'react';
import Card from './Card';

function SearchList({ filteredNFTs }) {
    const filtered = filteredNFTs.map(NFT => <Card key={NFT.id} NFT={NFT} />);
    return (
        <div>
            {filtered}
        </div>
    );
}

export default SearchList;