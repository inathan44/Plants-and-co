import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Homepage, AllProducts, SingleProduct, NavBar, Login } from './index';
import { selectAuth, attemptTokenLogin } from '../slices/users/authSlice';

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptTokenLogin());
  }, []);

  const { auth } = useSelector(selectAuth);

  return (
    <>
      <div className="font-fraunces text-primary-deep-green">
        <NavBar auth={auth} />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
        </Routes>
      </div>
    </>
  );
}
