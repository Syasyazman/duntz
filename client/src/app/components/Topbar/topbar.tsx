import styles from "./topbar.module.css";
import React from 'react';
import Image from "next/image";
import Searchbar from "../Searchbar/searchbar";
import DuntzIcon from "../../../../public/images/duntz-icon.png";

export default function Topbar() {
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
                TestAccount
            </div>
        </div>
    )
}