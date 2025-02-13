import React from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "./chat.module.css";
import UserIcon from "../../../public/images/user.png";

export default function Chat() {

    // temporary
    const users = [
        { id: "123", name: "Hwaeyee" },
        { id: "456", name: "Kamkam" },
        { id: "789", name: "Horniri" },
        { id: "1011", name: "Regina" },
        { id: "1213", name: "BadKatty" },
        { id: "1415", name: "Degendubu" },
        { id: "1618", name: "SforSphua" }
    ];
    
    return (
        <div>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link href={`/chat/${user.id}`} className={styles.chatBody}>
                            <div className={styles.chatProfile}>
                                <Image src={UserIcon} alt="User profile" height={50} width={50} />
                            </div>
                            <div className={styles.chatInfo}>
                                <div className={styles.chatName}>
                                    {user.name}
                                </div>
                                <div className={styles.chatBox}>
                                    <div className={styles.chatBoxMessage}>
                                        Shared a song
                                    </div>
                                    <div className={styles.chatBoxTime}>
                                        - 3h
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}