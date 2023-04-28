import React from "react";
import { observer } from "mobx-react";

import { useAppStore } from "../../../stores/appStore";

import styles from "./LineCounter.module.css";


export const LineCounter: React.FC = observer(() => {
    const { slotStore } = useAppStore();

    return (
        <div className={ styles.LineCounter }>
            <p>Lines:</p>
            <p>{ slotStore.winLines }</p>
        </div>
    );
});