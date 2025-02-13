'use client'

import styles from "./cardContent.module.css";
import { usePathname, useParams } from 'next/navigation'
import Chat from "../../chat/page";
import Playlist from "../../playlist/page";

type CardContentProps = {
  cardNum: number,
  children?: React.ReactNode;  // Content inside the card
};

export default function CardContent({ cardNum, children } : CardContentProps) {
    const pathname = usePathname();
    const { chatId, playlistId } = useParams();

    if (cardNum == 0) {
        // left card content
        return (
            <div>
                { pathname.startsWith("/chat") && <Chat /> }
                { pathname.startsWith("/playlist") && <Playlist /> }
            </div>
        );
    } else if (cardNum == 1) {
        // right card content
        if (pathname === "/chat") {
            return <div>Click on a chat to view details...</div>;
        } else if (pathname === "/playlist") {
            return <div>Click on a playlist to view details...</div>;
        } else if (pathname.startsWith("/chat/") && chatId != null) {
            return <div className="h-full w-full">{children}</div>;
        } else if (pathname.startsWith("/playlist/") && playlistId != null) {
            return <div className="h-full w-full">{children}</div>;
        } else {
            return <div>Click on a tab!!</div>;
        }
    } else {
        return <></>;
    }
}