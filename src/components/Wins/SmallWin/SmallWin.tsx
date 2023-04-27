import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { useAppStore } from "../../../stores/appStore";
import { transformBalance } from "../../../utils";
import { SMALL_WIN_ID } from "../../Sound/SoundContainer";

import styles from "./SmallWin.module.css";

export const SmallWin: React.FC = observer(() => {
    const { slotStore, isWinBlocksVisible, audioElements } = useAppStore();

    useEffect(() => {
        const playSound = () => {
            audioElements[SMALL_WIN_ID].play();
        };

        if (isWinBlocksVisible && !slotStore.bigWin) {
            playSound();
        }
    }, [isWinBlocksVisible, audioElements, slotStore.bigWin]);

    if ( isWinBlocksVisible && !slotStore.bigWin ) {
        return (
            <div className={styles.SmallWin}>
                <h2>You won:</h2>
                { transformBalance(slotStore.win) }
            </div>
        );
    }
    return null;
});