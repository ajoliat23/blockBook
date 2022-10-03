import React, { useState } from 'react';
import Search from './components/Search';
import initialDetails from './data/initialDetails';

function NFTSearch() {
    return (
        <>
            <div className="content">
                <Search details={initialDetails} />
            </div>
        </>

    );
}

export default NFTSearch;