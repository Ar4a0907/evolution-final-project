import React from "react";
import styles from "./NavBar.module.css";
import { Balance } from "./Balance/Balance";
import { SoundButton } from "./SoundButton/SoundButton";
import { SpinButton } from "./SpinButton/SpinButton";
import { LineCounter } from "./LineCounter/LineCounter";
import { WinCounter } from "./WinCounter/WinCounter";

export const NavBar: React.FC = () => {
    return (
        <div className={styles.NavBar}>
            <Balance/>
            <LineCounter/>
            <SpinButton/>
            <WinCounter/>
            <SoundButton/>
        </div>
    );
}