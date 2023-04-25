import React from "react";
import styles from "./Game.module.css";
import { NavBar } from "../NavBar/NavBar";
import { Slot } from "../Slot/Slot";

export const Game: React.FC = () => {
    return (
        <div className={styles.Game}>
            <div className={styles.background}></div>
            <Slot/>
            <NavBar/>
        </div>
    );
}