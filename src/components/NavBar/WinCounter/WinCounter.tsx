import React from "react";
import { observer } from "mobx-react";
import { useAppStore } from "../../../stores/appStore";
import styles from "./WinCounter.module.css";
import {transformBalance} from "../../../utils";

export const WinCounter: React.FC = observer(() => {
    const {slotStore} = useAppStore()

    return (
        <div className={styles.WinCounter}>
            <p>Win:</p>
            <p>{transformBalance(slotStore.win)}</p>
        </div>
    );
})