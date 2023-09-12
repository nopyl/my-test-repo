import React from 'react'
import { ProductCard } from '../ProductCard';

export const Index = () => {
  return (

    <div className="container">

        <div className="row">
        
            <div className="col-md-2 p-2">
                <ProductCard/>
            </div>
            <div className="col-md-2 p-2">
                <ProductCard/>
            </div>
            <div className="col-md-2 p-2">
                <ProductCard/>
            </div>
            <div className="col-md-2 p-2">
                <ProductCard/>
            </div>
            <div className="col-md-2 p-2">
                <ProductCard/>
            </div>

            <div className="col-md-2 p-2">
                <ProductCard/>
            </div>
            <div className="col-md-2 p-2">
                <ProductCard/>
            </div>

        </div>
    </div>

    );
}
