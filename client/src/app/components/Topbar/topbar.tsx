'use client'

import styles from "./topbar.module.css";
import React from 'react';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Login from "../Login/login";
import Logout from "../Logout/logout";
import Searchbar from "../Searchbar/searchbar";
import DuntzIcon from "../../../../public/images/duntz-icon.png";

export default function Topbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const updateAuthStatus = () => {
            setIsLoggedIn(!!localStorage.getItem("access_token"));
        };
    
        window.addEventListener("authChange", updateAuthStatus);
    
        return () => {
            window.removeEventListener("authChange", updateAuthStatus);
        };
    }, [])

    return (
        <div className={styles.topbarBody}>
            <div className={styles.topbarLogo}>
                <Image src={DuntzIcon} alt="Duntz icon" width={80} height={20} />
                <div>Duntz</div>
            </div>
            <div className={styles.topbarSearch}>
                <Searchbar />
            </div>
            <div className={styles.topbarAccount}>
                { isLoggedIn ? <Logout /> : <Login /> }
            </div>
        </div>
    )
}