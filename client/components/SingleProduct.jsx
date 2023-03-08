import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PromoBanner from './UI/PromoBanner.jsx';
import box from '../../public/assets/box.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSingleProduct,
  fetchSingleProduct,
  resetStatusError,
  fetchAllProducts,
} from '../slices/product/productSlice.js';
import LikedProduct from './UI/LikedProduct.jsx';
import { addOneToCart } from '../slices/users/cartSlice.js';
import SimilarProducts from './SimilarProducts.jsx';
import toast, { Toaster } from 'react-hot-toast';

const singleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchAllProducts());
    return () => dispatch(resetStatusError());
  }, [dispatch, productId]);

  const singleProduct = useSelector(selectSingleProduct);

  function addToCart() {
    dispatch(addOneToCart(productId));
  }

  const notify = () => toast.success('Product added to cart!');

  return (
    <>
      <PromoBanner />
      <main className="font-serif flex h-[700px]">
        <section className="flex gap-20 justify-center mt-16 ">
          <div className="">
            <img
              className="h-5/6"
              src={`${singleProduct.imageURL}`}
              alt="error showing photo"
            />
          </div>
          <div className="w-1/3">
            <div className="flex justify-between items-center mb-8">
              <header className=" text-green-900 text-3xl">
                {singleProduct.name}
              </header>
              <LikedProduct />
            </div>

            <div className="flex justify-between border-b-4 pb-2 mb-4">
              <p>
                {singleProduct?.tags?.map(({ tagName }) => tagName).join(', ')}
              </p>
            </div>
            <p className="text-primary-deep-green text-3xl font-bold mb-4">
              ${singleProduct.price}
            </p>
            <p className="mb-8 leading-tight">{singleProduct.description}</p>
            <div className="border-b-4 pb-4 mb-3">
              <button
                onClick={() => {
                  notify();
                  addToCart();
                }}
                className="hover:bg-primary-button-green w-full bg-primary-deep-green text-white py-3 rounded-2xl mx-auto block text-xl hover:transition-all"
              >
                ADD TO CART
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <img src={box} alt="shipping box icon" className="w-6" />
              <p className="text-sm">Free shipping in the USA</p>
            </div>
          </div>
        </section>
      </main>
      <SimilarProducts />
      <Toaster />
    </>
  );
};

export default singleProduct;
