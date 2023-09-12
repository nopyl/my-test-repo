import React from 'react'
import { Button } from '../Button';

export const ProductCard = (props) => {
    // to be refactored
    return (

    <a href="" className='text-decoration-none'>

        <div className="card" style={{maxWidth: "11rem"}}>

            <div className='card-top-img p-2'>
                <img src="/images/iphone13.jpeg" style={{width: "100%"}} alt="" />
            </div>

            <div className='card-body'>
                <h6 className="card-title">iPhone 13 128 GB</h6>
                <p className='text-muted'>13.000₺</p>
            </div>
            
            <Button
                text="Add to Cart"
                type="button"
                style={{ backgroundColor: "#fd7e14" }}
                className="btn text-light m-2"
                />

        </div>
    </a>

    );
}
