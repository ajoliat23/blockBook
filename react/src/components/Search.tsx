import React, { useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';

function Search({ details }: { details: any }) {

    const [searchField, setSearchField] = useState("");

    const filteredNFTs = details.filter(
        (NFT: { name: string; description: string; owner: string; }) => {
            return (
                NFT
                    .name
                    .toLowerCase()
                    .includes(searchField.toLowerCase()) ||
                NFT
                    .description
                    .toLowerCase()
                    .includes(searchField.toLowerCase()) ||
                NFT
                    .owner
                    .toLowerCase()
                    .includes(searchField.toLowerCase())
            );
        }
    );

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchField(e.target.value);
    };

    function searchList() {
        return (
            <Scroll>
                <SearchList filteredNFTs={filteredNFTs} />
            </Scroll>
        );
    }

    return (
        <section className="midcol">
            <div className="midcol">
                <h2 className="midcol">Search for NFTs</h2>
            </div>
            <div className="midcol">
                <input
                    className="midcol"
                    type="search"
                    placeholder="Search"
                    onChange={handleChange}
                />
            </div>
            {searchList()}
        </section>
    );
}

export default Search;