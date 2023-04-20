import React from "react";
import styles from "./Slot.module.css";
import {observer} from "mobx-react";
import {Reel} from "./Reel/Reel";
import {useAppStore} from "../../stores/appStore";

export const Slot: React.FC = observer(() => {
    const { slotStore } = useAppStore();
    const { currentSymbols, nextSymbols } = slotStore;

    return (
        <div className={styles.Slot}>
            {currentSymbols.map((reel, index) => (
                <Reel
                    key={index}
                    reel={reel}
                    index={index}
                    nextSymbols={nextSymbols[index]}
                />))}
        </div>
    );
});
