'use client'

import styles from "./logout.module.css";
import React from 'react';
import { clearUserSession } from "../../../utils/auth";

export default function Logout() {
    const handleLogout = () => {
        const user = localStorage.getItem("user");
        let userId = "";
        if (user !== null) {
            userId = JSON.parse(user)._id;
        }

        console.log("user ID", userId);
        fetch('http://localhost:8080/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // ensure the backend knows the body is JSON
            },
            body: JSON.stringify({
                userId: userId
            })
        }).then(res => {
            if (res.status == 200) {
                // successfully logged out from backend
                if (typeof window !== 'undefined') {
                    clearUserSession();
                    window.location.href = "http://localhost:3000";
                }
            } else {
                console.error("Logout failed");
            }
        })
    };

    return (
        <div className={styles.logoutBody}>
            <button 
                className={styles.logoutButton}
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}