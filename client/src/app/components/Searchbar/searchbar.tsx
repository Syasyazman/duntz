import styles from "./searchbar.module.css";
import React from 'react';
import Image from "next/image";
import SearchIcon from "../../../../public/images/search-grey.png";

export default function Searchbar() {
    return (
        <div className={styles.searchbarBody}>
            <Image src={SearchIcon} alt="Search icon" width={20} height={20} />
            <div className={styles.searchBox}>
                Search for a song...
            </div>
        </div>
    )
}