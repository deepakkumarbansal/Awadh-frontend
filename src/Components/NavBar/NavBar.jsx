import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";
import { Search } from '../index';
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { font } from '../../utility/font';
import { GiIndiaGate } from "react-icons/gi";
import { TiWorld } from "react-icons/ti";
import { LiaPrayingHandsSolid } from "react-icons/lia";
import { TbUniverse } from "react-icons/tb";
import { FaHandHoldingWater } from "react-icons/fa";
import { RiMentalHealthLine } from "react-icons/ri";
import { GiLifeInTheBalance } from "react-icons/gi";
import { HiNewspaper } from "react-icons/hi2";
const Navbar = () => {
    const navItemsData = [
        { name: 'देश', slug: '/category/देश', icon: <GiIndiaGate />},
        { name: 'विदेश', slug: '/category/विदेश', icon: <TiWorld /> },
        {
            name: 'राज्य',
            slug: '/category/राज्य',
            subMenu: [
                { name: 'महाराष्ट्र', slug: '/category/महाराष्ट्र' },
                { name: 'उत्तराखंड', slug: '/category/उत्तराखंड' },
                { name: 'बिहार', slug: '/category/बिहार' },
                { name: 'मध्य प्रदेश', slug: '/category/मध्य प्रदेश' },
                { name: 'झारखंड', slug: '/category/झारखंड' },
                { name: 'राजस्थान', slug: '/category/राजस्थान' },
                { name: 'हरियाणा', slug: '/category/हरियाणा' },
            ],
        },
        {
            name: 'उत्तर प्रदेश',
            slug: '/category/उत्तर प्रदेश',
            subMenu: [
                { name: 'लखनऊ', slug: '/category/लखनऊ' },
                { name: 'वाराणसी', slug: '/category/वाराणसी' },
                { name: 'जौनपुर', slug: '/category/जौनपुर' },
                { name: 'कानपुर', slug: '/category/कानपुर' },
            ],
        },
        { name: 'राजनीतिक', slug: '/category/राजनीतिक', icon: <LiaPrayingHandsSolid /> },
        // {
        //     name: 'अर्थजगत',
        //     slug: '/category/अर्थजगत',
        //     icon: <TbUniverse />,
        //     subMenu: [
        //         { name: 'गैजेट्स', slug: '/category/गैजेट्स' },
        //     ],
        // },
        // { name: 'कैरियर', slug: '/category/' },
        // { name: 'जल व स्वच्छता', slug: '/category/जल व स्वच्छता', icons: <FaHandHoldingWater /> },
        // { name: 'सिने जगत', slug: '/category/' },
        { name: 'हेल्थ', slug: '/category/हेल्थ', icon: <RiMentalHealthLine /> },
        {
            name: 'जीवन शैली',
            slug: '/category/जीवन शैली',
            icon: <GiLifeInTheBalance />,
            subMenu: [
                { name: 'खेल', slug: '/category/खेल' },
                { name: 'सामाजिक', slug: '/category/सामाजिक' },
                { name: 'साहित्य Re-mix', slug: '/category/साहित्य Re-mix' },
            ],
        },
        // { name: 'अवध केसरी लाइव', slug: '/category/' },
        // { name: 'All', slug: '/category/' },
        {
            name: 'ई-पेपर', slug: '#', icon: <HiNewspaper />,
            subMenu: [
                {name: 'दैनिक', slug: '/category/दैनिक'},
                {name: 'साप्ताहिक', slug: '/category/साप्ताहिक'}
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
            <ul className="nav-list absolute z-[100] top-20 lg:static bg-white opacity-0 lg:opacity-100 transition-opacity duration-700 lg:flex lg:justify-between lg:w-full font-bold items-center shadow-md shadow-black lg:shadow-none"> {/* error of opacity on large screen */}
                {navItems.map((item, index) => (
                    <li key={index} className="relative group border-b-2 lg:border-none pt-2 lg:pt-0 mx-2 lg:mx-0">
                        <Link to={item.slug} className={`text-xl flex justify-start items-center hover:text-orange-600 ${item.name === 'ई-पेपर' ? 'text-purple-600 ml-[1rem]' : ''}`}>
                            <div className='flex items-center gap-2'>
                                <p>{item.icon && item.icon}</p>
                                <p className='text-nowrap'>{item.name}</p>     
                            </div>
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
                <div className='absolute right-0 bg-blue-50 top-16 z-[100]'>
                    <Search />
                </div>
            }
        </div>
    );
};

export default Navbar;
