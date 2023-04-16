import React from "react";
import styles from "./Symbol.module.css";
import {observer} from "mobx-react";


interface SymbolProps {
    symbol: string;
}

export const Symbol: React.FC<SymbolProps> = observer(function Symbol(props) {
    const { symbol } = props;

    return (
        <div className={styles.Symbol}>
            {symbol}
        </div>
    );
});
