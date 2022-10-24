import React from 'react';
import Card from './Card';
import StackGrid from "react-stack-grid";

function SearchList({ filteredNFTs }: { filteredNFTs: any }) {
    const filtered = filteredNFTs.map((NFT: { id: React.Key | null | undefined; }) => <Card key={NFT.id} NFT={NFT} />);
    return (
        <div className='gridWrap'>
            {filtered}
        </div>
    );
}

export default SearchList;