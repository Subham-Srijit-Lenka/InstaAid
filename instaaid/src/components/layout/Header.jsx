"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { logOut } from "../../redux/Auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Product", to: "/products" },
  { name: "FastAid", to: "/chatbot" },
  { name: "Contact", to: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [totalProduct, settotalProduct] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const linkClasses = (path) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-300 ${
      location.pathname === path
        ? "text-blue-600 border-b-2 border-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  const handleLogOut = async () => {
    // await axios.post("/api/v1/auth/logout");
    dispatch(logOut());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          InstaAid
        </Link>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          {navigation.map((item) => (
            <Link key={item.name} to={item.to} className={linkClasses(item.to)}>
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-6">
          {!user ? (
            <div>
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-700 hover:text-blue-600"
              >
                Login →
              </Link>
            </div>
          ) : (
            <div>
              <button
                className="text-sm font-semibold text-gray-700 hover:text-blue-600"
                onClick={handleLogOut}
              >
                LogOut
              </button>
            </div>
          )}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 hover:text-blue-600"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {totalProduct}
            </span>
          </Link>
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 bg-black/30 z-40" />
        <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-sm bg-white p-6 z-50 shadow-lg">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-blue-600">
              InstaAid
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.to
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4 flex items-center justify-between">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="relative flex items-center text-gray-700 hover:text-blue-600"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {totalProduct}
              </span>
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
