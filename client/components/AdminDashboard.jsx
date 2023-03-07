import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../slices/users/authSlice';
import {
  fetchAllUsers,
  selectUsers,
  resetStatus as resetUserStatus,
} from '../slices/users/userSlice';
import {
  fetchAllProducts,
  selectAllProducts,
  resetStatusError,
} from '../slices/product/productSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const { auth, token } = useSelector(selectAuth);
  const { users } = useSelector(selectUsers);

  const [userTable, setUserTable] = useState('collapse');
  const [productTable, setProductTable] = useState('collapse');
  const [promoTable, setPromoTable] = useState('collapse');

  const inactiveButtonClass =
    'hover:bg-green-900 hover:text-primary-bright-white p-5 rounded-r-full mr-5';

  const activeButtonClass =
    'bg-green-900 text-primary-bright-white p-5 rounded-r-full mr-5';

  const [prodButtonStatus, setProdButtonStatus] = useState(inactiveButtonClass);

  const [userButtonStatus, setUserButtonStatus] = useState(inactiveButtonClass);

  const [promoButtonStatus, setPromoButtonStatus] =
    useState(inactiveButtonClass);

  useEffect(() => {
    dispatch(fetchAllUsers({ token }));
    dispatch(fetchAllProducts());

    return () => {
      resetAuthStatus();
      resetUserStatus();
      resetStatusError();
    };
  }, [auth]);

  return (
    <div className="bg-cover bg-center h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/admin.jpg')]">
      <div className="flex flex-row">
        <aside
          id="default-sidebar"
          className=" w-1/4 h-[calc(100vh_-_5rem)] transition-transform -translate-x-full sm:translate-x-0 flex flex-col gap-10"
          aria-label="Sidebar"
        >
          <div className="">
            <div className="">
              <p className="p-5">ADMIN DASHBOARD</p>
            </div>
            <div className="flex flex-col">
              <div className={prodButtonStatus}>
                <button
                  onClick={() => {
                    setProductTable('visible');
                    setPromoTable('collapse');
                    setUserTable('collapse');
                    setProdButtonStatus(activeButtonClass);
                    setUserButtonStatus(inactiveButtonClass);
                    setPromoButtonStatus(inactiveButtonClass);
                  }}
                  className=""
                >
                  PRODUCTS
                </button>
              </div>
              <div className={promoButtonStatus}>
                <button
                  onClick={() => {
                    setProductTable('collapse');
                    setPromoTable('visible');
                    setUserTable('collapse');
                    setProdButtonStatus(inactiveButtonClass);
                    setPromoButtonStatus(activeButtonClass);
                    setUserButtonStatus(inactiveButtonClass);
                  }}
                  className=""
                >
                  PROMOCODES
                </button>
              </div>
              <div className={userButtonStatus}>
                <button
                  onClick={() => {
                    setProductTable('collapse');
                    setPromoTable('collapse');
                    setUserTable('visible');
                    setProdButtonStatus(inactiveButtonClass);
                    setPromoButtonStatus(inactiveButtonClass);
                    setUserButtonStatus(activeButtonClass);
                  }}
                  className=""
                >
                  USER MANAGEMENT
                </button>
              </div>
              <div className={inactiveButtonClass}>
                <p className="">PLANTS&CO SHOPS</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="p-4 w-3/4  h-[calc(100vh_-_5rem)] overflow-auto">
          <div className="p-4 border-2 border-primary-button-hover border-dashed rounded-lg">
            <div className="flex flex-col h-[calc(100vh_-_10rem)] rounded bg-gray-50 dark:bg-gray-800 overflow-auto">
              <div id="users" className={userTable}>
                <table
                  id="userTable"
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white rounded-xl overflow-x-auto"
                >
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-xl sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 sticky top-0">
                        USER ID
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        NAME
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        EMAIL
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.length
                      ? users.map((user) => {
                          return (
                            <tr
                              key={user.id}
                              className="text-xs odd:bg-white even:bg-slate-50"
                            >
                              <th scope="col" className="px-6 py-3">
                                {user.id}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {user.fullName}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {user.email}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {user.role}
                              </th>
                            </tr>
                          );
                        })
                      : ''}
                  </tbody>
                </table>
              </div>
              <div id="products" className={productTable}>
                <table
                  id="productTable"
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white rounded-xl overflow-x-auto"
                >
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-xl sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 sticky top-0">
                        PRODUCT ID
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        NAME
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        PRICE
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        QTY
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products && products.length
                      ? products.map((product) => {
                          return (
                            <tr
                              key={product.id}
                              className="text-xs odd:bg-white even:bg-slate-50"
                            >
                              <th scope="col" className="px-6 py-3">
                                {product.id}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {product.name}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                ${product.price}
                              </th>
                              <th scope="col" className="px-6 py-3 text-center">
                                {product.qty}
                              </th>
                            </tr>
                          );
                        })
                      : ''}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;