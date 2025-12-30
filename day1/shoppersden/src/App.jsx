import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import ShopperHeader from "./components/molecules/ShopperHeader/ShopperHeader.jsx";

import Login from "./components/molecules/Login/Login.jsx";
import Registration from "./components/molecules/Registration/Registration.jsx";
import Dashboard from "./components/organisms/Dashboard/Dashboard.jsx";

import Accounts from "./components/molecules/Accounts/Accounts.jsx";
import Admin from "./components/molecules/Admin/Admin.jsx";
import Books from "./components/molecules/Books/Books.jsx";
import Clothing from "./components/molecules/Clothing/Clothing.jsx";
import Gifts from "./components/molecules/Gifts/Gifts.jsx";
import FAQ from "./components/molecules/FAQ/FAQ.jsx";
import Help from "./components/molecules/Help/Help.jsx";
import Home from "./components/molecules/Home/Home.jsx";
import Sports from "./components/molecules/Sports/Sports.jsx";
import Page404 from "./components/molecules/Page404/Page404.jsx";
import BookDetails from "./components/molecules/BookDetails/BookDetails.jsx";
import ProtectedRoute from "./components/molecules/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [newUser, setNewUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <ShopperHeader />

      <Routes>
        {/* ✅ Default route */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/dashboard/home" : "/login"} replace />}
        />

        {/* ✅ Login / Register routes */}
        <Route
          path="/login"
          element={
            newUser ? (
              <Registration newUserState={setNewUser} />
            ) : (
              <Login newUserState={setNewUser} isLoggedInState={setIsLoggedIn} />
            )
          }
        />

        {/* ✅ Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="accounts" element={<Accounts />} />
          <Route path="admin" element={<Admin />} />
          <Route path="books" element={<Books />} />
          <Route path="books/:bookId" element={<Books />} />
          <Route path="clothing" element={<Clothing />} />
          <Route path="gifts" element={<Gifts />} />
          <Route path="faqs" element={<FAQ />} />
          <Route path="help" element={<Help />} />
          <Route path="home" element={<Home />} />
          <Route path="sports" element={<Sports />} />
          <Route path="*" element={<Page404 />} />
        </Route>

        {/* ✅ Global 404 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
