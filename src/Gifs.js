import React from 'react'
import Masonry from 'react-masonry-css'


function Gifs({ data }) {


    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };
    
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {data.map((gif) => (

                <img
                    key={gif.id}
                    src={gif.images.fixed_height.url}
                    alt={gif.title}
                    className="rounded "
                />
            ))}
        </Masonry>
    )
}

export default Gifs
