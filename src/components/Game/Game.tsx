import React from "react";
import styles from "./Game.module.css";
import {NavBar} from "../NavBar/NavBar";

export const Game: React.FC = () => {
    return (
        <div className={styles.Game}>
            <div className={styles.background}></div>
            <NavBar/>
        </div>
    );
}