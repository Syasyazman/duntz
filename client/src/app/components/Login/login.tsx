'use client'

import styles from "./login.module.css";
import React from 'react';

export default function Login() {

    const handleLogin = async () => {
        const width = 500, height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        // open spotify login popup
        window.open(
            "http://localhost:8080/api/auth/spotify",
            "Spotify Login",
            `width=${width},height=${height},top=${top},left=${left}`
        )

        // listens to spotify popup's message and stores token/user details in local storage
        const handleMessage = (event: MessageEvent) => {
            // takes into account cross origin
            if (event.origin !== "http://localhost:8080") {
                return;
            }

            const { accessToken, user } = event.data;

            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("user", decodeURIComponent(user));

            // trigger topbar re-render
            window.dispatchEvent(new Event("authChange"));
        }


        window.addEventListener("message", handleMessage);
    };

    return (
        <div className={styles.loginBody}>
            <button 
                className={styles.loginButton}
                onClick={handleLogin}
            >
                Login with Spotify
            </button>
        </div>
    )
}