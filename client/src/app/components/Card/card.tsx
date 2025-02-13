import styles from "./card.module.css";
import React from 'react';

type CardProps = {
  height: string;  // Dynamic height
  width: string;   // Dynamic width
  children?: React.ReactNode;  // Content inside the card
};

export default function Card({ height, width, children } : CardProps) {
    return (
        <div
            className={styles.cardBody} 
            style={{ height: height, width: width }}
        >
            <h1>testing value</h1>
            {children}
        </div>
    )
}