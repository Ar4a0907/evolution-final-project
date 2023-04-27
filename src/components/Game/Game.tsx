import React from "react";

import { NavBar } from "../NavBar/NavBar";
import { Slot } from "../Slot/Slot";
import { BigWin } from "../Wins/BigWin/BigWin";
import { SmallWin } from "../Wins/SmallWin/SmallWin";

import styles from "./Game.module.css";


export const Game: React.FC = () => {
    return (
        <div className={ styles.Game }>
            <div className={ styles.background }></div>
            <Slot/>
            <NavBar/>
            <BigWin/>
            <SmallWin/>
        </div>
    );
};