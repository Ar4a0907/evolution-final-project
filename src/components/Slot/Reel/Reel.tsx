import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";

import { Symbol } from "../Symbol/Symbol";
import { useAppStore } from "../../../stores/appStore";
import { REEL_SPIN_END_ID } from "../../Sound/SoundContainer";


import styles from "./Reel.module.css";

interface ReelProps {
    reel: string[];
    index: number;
    nextSymbols: string[];
    lastItem: boolean;
}

export const Reel: React.FC<ReelProps> = observer((props) => {
    const { reel, index, nextSymbols, lastItem } = props;
    const { slotStore, audioElements } = useAppStore();
    const reelRef = useRef<HTMLDivElement>(null);

    const playSound = () => {
        audioElements[REEL_SPIN_END_ID].play();
    };

    useEffect(() => {
        const reelRefCurrent = reelRef.current;

        if (reelRefCurrent !== null && lastItem) {
            reelRefCurrent.addEventListener("animationend", slotStore.onAnimationEnd);
        }

        reelRefCurrent?.addEventListener("animationend", playSound);

        return () => {
            if (reelRefCurrent !== null && lastItem) {
                reelRefCurrent.removeEventListener("animationend", slotStore.onAnimationEnd);
            }
            reelRefCurrent?.removeEventListener("animationend", playSound);
        };
    });

    return (
        <div
            ref={ reelRef }
            id={ `reel-${ index }` }
            className={ slotStore.isSpinning ? [styles.Reel, styles.isSpinning].join(" ") : styles.Reel }
            style={ {
                "--spin-duration": `${ slotStore.factor(index) }s`,
            } as React.CSSProperties }
        >
            { reel.map((symbol, index) => <Symbol key={ index } symbol={ symbol }/>) }
            { slotStore.isSpinning ?
                slotStore.generateRandomSymbols(index).map((symbol, index) => <Symbol key={ index } symbol={ symbol }/>)
                : null
            }
            { slotStore.isSpinning ?
                nextSymbols.map((symbol, index) => <Symbol symbol={ symbol } key={ index }/>)
                : null
            }
        </div>
    );
});