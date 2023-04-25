import React from "react";
import {observer} from "mobx-react";
import {useAppStore} from "../../../stores/appStore";
import styles from "./SoundButton.module.css";
import soundIcon from "../../../assets/images/sound-loud.png";
import soundIconOff from "../../../assets/images/sound-off.png";

export const SoundButton: React.FC = observer(() => {
    const {playSound, toggleSound} = useAppStore();

    return (
        <button className={styles.SoundButton} onClick={toggleSound}>
            {playSound ?
                <img src={soundIcon} alt="Sound button"/> :
                <img src={soundIconOff} alt="Sound button"/>
            }
        </button>
    );
});