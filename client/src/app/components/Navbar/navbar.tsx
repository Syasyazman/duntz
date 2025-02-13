'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className={styles.navbarBody}>
      {/* Chat Tab */}
      <Link href="/chat" className="w-[50%]">
        <button className={`${styles.navbarButton} ${pathname.startsWith("/chat") ? styles.navbarButtonActive : ""}`}>
          Chats
        </button>
      </Link>

      {/* Playlist Tab */}
      <Link href="/playlist" className="w-[50%]">
        <button className={`${styles.navbarButton} ${pathname.startsWith("/playlist") ? styles.navbarButtonActive : ""}`}>
          Playlists
        </button>
      </Link>
    </div>
  );
}