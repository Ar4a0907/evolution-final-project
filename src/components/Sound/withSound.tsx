import React from "react";
import {BET_SOUND_ID, SPIN_SOUND_ID} from "./SoundContainer";

interface WithSoundProps {
    soundType: "spin" | "bet";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type ButtonWithSoundProps =
    WithSoundProps &
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function withSound<P extends WithSoundProps>(Component: React.FC<P>): React.FC<P> {
    const ButtonWithSound: React.FC<P> = ({ soundType, onClick, ...props }) => {
        const playSound = React.useCallback(() => {
            const audioElement = document.getElementById(soundType === "bet" ?
                BET_SOUND_ID : SPIN_SOUND_ID) as HTMLAudioElement || null;
            if (audioElement !== null) {
                audioElement.play();
            }
        }, [soundType]);

        const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                onClick(event);
            }
            playSound();
        }, [onClick, playSound]);

        return <Component {...props as P} onClick={handleClick} />;
    };

    return ButtonWithSound;
}
