import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { useAppStore } from "../../../stores/appStore";
import { BIG_WIN_ID } from "../../Sound/SoundContainer";
import { transformBalance } from "../../../utils";

import styles from "./BigWin.module.css";

export const BigWin: React.FC = observer(() => {
    const { slotStore, isWinBlocksVisible, hideWinBlocks, audioElements } = useAppStore();

    const handleClick = () => {
        hideWinBlocks();
        audioElements[BIG_WIN_ID].pause();
        slotStore.closeBigWin();
    };

    useEffect(() => {
        if (isWinBlocksVisible && slotStore.bigWin) {
            audioElements[BIG_WIN_ID].currentTime = 0;
            audioElements[BIG_WIN_ID].play();
        }
    }, [isWinBlocksVisible, audioElements, slotStore.bigWin]);

    return (
        <div
            onClick={handleClick}
            className={styles.BigWin}
            style={{ visibility: isWinBlocksVisible && slotStore.bigWin ? "visible" : "hidden" }}
        >
            <div className={styles.textWrap}>
                <div className={[styles.text, styles.text1].join(" ")}>B</div>
                <div className={[styles.text, styles.text2].join(" ")}>I</div>
                <div className={[styles.text, styles.text3].join(" ")}>G</div>
                <br/>
                <div className={[styles.text, styles.text4].join(" ")}>W</div>
                <div className={[styles.text, styles.text1].join(" ")}>I</div>
                <div className={[styles.text, styles.text2].join(" ")}>N</div>
            </div>
            <h2>{transformBalance(slotStore.win)}</h2>
        </div>
    );
});
