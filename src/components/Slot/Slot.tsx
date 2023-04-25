import { observer } from "mobx-react";
import React from "react";

import { useAppStore } from "../../stores/appStore";

import styles from "./Slot.module.css";
import { Reel } from "./Reel/Reel";


export const Slot: React.FC = observer(() => {
    const { slotStore } = useAppStore();
    const { currentSymbols, nextSymbols } = slotStore;

    return (
        <div className={ styles.Slot }>
            { currentSymbols.map((reel, index) => (
                <Reel
                    key={ index }
                    reel={ reel }
                    index={ index }
                    nextSymbols={ nextSymbols[index] }
                    lastItem={ index === currentSymbols.length - 1 }
                />)) }
        </div>
    );
});
