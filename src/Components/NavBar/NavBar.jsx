import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";
import { Search } from '../index';
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { font } from '../../utility/font';
const Navbar = () => {
    const navItemsData = [
        { name: 'देश', slug: '/' },
        { name: 'विदेश', slug: '/' },
        {
            name: 'राज्य',
            slug: '/',
            subMenu: [
                { name: 'महाराष्ट्र', slug: '/' },
                { name: 'उत्तराखंड', slug: '/' },
                { name: 'बिहार', slug: '/' },
                { name: 'मध्य प्रदेश', slug: '/' },
                { name: 'झारखंड', slug: '/' },
                { name: 'राजस्थान', slug: '/' },
                { name: 'हरियाणा', slug: '/' },
            ],
        },
        {
            name: 'उत्तर प्रदेश',
            slug: '/',
            subMenu: [
                { name: 'लखनऊ', slug: '/' },
                { name: 'वाराणसी', slug: '/' },
                { name: 'जौनपुर', slug: '/' },
                { name: 'कानपुर', slug: '/' },
            ],
        },
        { name: 'राजनीतिक', slug: '/' },
        {
            name: 'अर्थजगत',
            slug: '/',
            subMenu: [
                { name: 'गैजेट्स', slug: '/' },
            ],
        },
        { name: 'कैरियर', slug: '/' },
        { name: 'जल व स्वच्छता', slug: '/' },
        { name: 'सिने जगत', slug: '/' },
        { name: 'हेल्थ', slug: '/' },
        {
            name: 'जीवन शैली',
            slug: '/',
            subMenu: [
                { name: 'खेल', slug: '/' },
                { name: 'सामाजिक', slug: '/' },
                { name: 'साहित्य Re-mix', slug: '/' },
            ],
        },
        // { name: 'अवध केसरी लाइव', slug: '/' },
        // { name: 'All', slug: '/' },
        {
            name: 'ई-पेपर', slug: '#',
            subMenu: [
                {name: 'अवध केसरी हिंदी दैनिक', slug: '/'},
                {name: 'अवध केसरी हिंदी साप्ताहिक', slug: '/'}
            ]
        }
    ];

    const [navItems, setNavItems] = useState(navItemsData);
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };
    const toggleMenu = () => {
        const navList = document.getElementsByClassName('nav-list')[0];
        navList.classList.remove('opacity-0', 'opacity-1');
        showMenu ? navList.classList.add('opacity-0') : navList.classList.add('opacity-1')
        setShowMenu(!showMenu);
    }
    return (
        <div className={`flex justify-between items-center border-t-red-500 border-t-4 border-b-2 border-b-gray-400 py-7 h-10 relative gap-2 text-xl`} style={{fontFamily: font.heading}}>
            <span onClick={toggleMenu} className='lg:hidden'>{showMenu ? <IoClose className='text-xl' /> : <FaBars />}</span>
            <ul className="nav-list absolute z-[100] top-20 lg:static bg-white opacity-0 lg:opacity-100 transition-opacity duration-700 lg:flex font-bold gap-3 items-center shadow-md shadow-black lg:shadow-none"> {/* error of opacity on large screen */}
                {navItems.map((item, index) => (
                    <li key={index} className="relative group border-b-2 lg:border-none pt-2 lg:pt-0 mx-2 lg:mx-0">
                        <Link to={item.slug} className={`flex items-center ${item.name === 'ई-पेपर' ? 'text-purple-600 ml-[1rem]' : ''}`}>
                            {item.name}
                            {item.subMenu && <FaAngleDown className="ml-1" />}
                        </Link>
                        {item.subMenu && (
                            <div className='absolute z-[1000] hidden group-hover:block'>
                                <div className='bg-white shadow-lg mt-2 px-4 shadow-gray-900'>
                                    <ul className="space-y-1">
                                        {item.subMenu.map((subItem, subIndex) => (
                                            <li key={subIndex} className="whitespace-nowrap border-b border-gray-300 hover:bg-gray-100 mt-5">
                                                <Link to={subItem.slug} className="block py-2 px-4">{subItem.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={toggleSearch} className="p-2 rounded hover:bg-gray-200">
                {showSearch ? <IoClose className='text-2xl' /> : <FaSearch className='w-6 h-6' />}
            </button>
            {showSearch &&
                <div className='absolute right-0 bg-blue-50 top-16'>
                    <Search />
                </div>
            }
        </div>
    );
};

export default Navbar;
