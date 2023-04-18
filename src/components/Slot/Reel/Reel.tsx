import React from "react";
import styles from "./Reel.module.css";
import {observer} from "mobx-react";
import {Symbol} from "../Symbol/Symbol";

interface ReelProps {
    reel: string[];
    index: number;
}

export const Reel: React.FC<ReelProps> = observer((props) => {
    const { reel } = props;

    return (
        <div className={styles.Reel}>
            {reel.map((symbol, index) => <Symbol key={index} symbol={symbol}/>)}
        </div>
    );
});