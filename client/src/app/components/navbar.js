'use client'
import Link from 'next/link'
import { useState } from 'react';



function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fungsi untuk toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='flex justify-between items-center p-4 px-8'>
      {/* Spacer kosong untuk menyeimbangkan flex */}
      <div className="flex-1"></div>

      {/* Link di tengah */}
      <Link
        href="/"
        className='py-2 font-sans font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-gray-400 hover:from-stone-400 hover:to-slate-300 text-center'
      >
        Signature Verification Tools
      </Link>

      {/* Button di pojok kanan */}
      <div className="flex-1 flex justify-end">
        {/* Dropdown Button */}
        <button
          id="dropdownDefaultButton"
          onClick={toggleDropdown}
          data-dropdown-toggle="dropdown"
          className="w-40 text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:text-white dark:focus:ring-gray-600"
          type="button"
        >
          Test Network
          <svg
            className="w-2.5 h-2.5 ms-7"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div
            id="dropdown"
            className="z-10 absolute top-20 right-8 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Test Network
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dev Network (Soon)
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar