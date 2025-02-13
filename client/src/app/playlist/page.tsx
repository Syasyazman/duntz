import React from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "./playlist.module.css";
import PlaylistIcon from "../../../public/images/playlist.png";

export default function Playlist() {

    // temporary
    const playlists = [
        { id: "123", name: "sad hip hop music" },
        { id: "456", name: "just chilling and gaming" },
        { id: "789", name: "Feeling happy vibes" },
        { id: "1011", name: "reccs from ppl" },
        { id: "1213", name: "IM THE BADDEST BITCH ON EARTH" },
        { id: "1415", name: "just shut up" },
        { id: "1618", name: "kpop playlist" }
    ];
    
    return (
        <div>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        <Link href={`/playlist/${playlist.id}`} className={styles.playlistBody}>
                            <div className={styles.playlistProfile}>
                                <Image src={PlaylistIcon} alt="Playlist picture" height={50} width={50} />
                            </div>
                            <div className={styles.playlistInfo}>
                                <div className={styles.playlistName}>
                                    {playlist.name}
                                </div>
                                <div className={styles.playlistCreator}>
                                    Sayasa
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}