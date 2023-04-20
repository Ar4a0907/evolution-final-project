import React from "react";
import styles from "./Reel.module.css";
import {observer} from "mobx-react";
import {Symbol} from "../Symbol/Symbol";
import {useAppStore} from "../../../stores/appStore";

interface ReelProps {
    reel: string[];
    index: number;
    nextSymbols: string[];
}

export const Reel: React.FC<ReelProps> = observer((props) => {
    const { reel, index, nextSymbols } = props;
    const { slotStore } = useAppStore();

    return (
        <div ref={slotStore.addReelsElements} id={`reel-${index}`} className={styles.Reel}>
            {reel.map((symbol, index) => <Symbol key={index} symbol={symbol}/>)}
            {slotStore.isSpinning ?
                slotStore.generateRandomSymbols(index).map((symbol, index) => <Symbol key={index} symbol={symbol}/>)
                : null
            }
            {slotStore.isSpinning ?
                nextSymbols.map((symbol, index) => <Symbol symbol={symbol} key={index}/>)
                : null
            }
        </div>
    );
});