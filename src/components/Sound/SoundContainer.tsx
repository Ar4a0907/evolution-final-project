import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";

import backgroundMusicSrc from "../../assets/sounds/background-music.mp3";
import betChangeSoundSrc from "../../assets/sounds/bet-change.wav";
import spinSoundSrc from "../../assets/sounds/spin.wav";
import reelSpinEndSrc from "../../assets/sounds/reel-spin-end.mp3";
import { useAppStore } from "../../stores/appStore";


const BACKGROUND_MUSIC_ID = "background-music";
export const BET_SOUND_ID = "bet-sound";
export const SPIN_SOUND_ID = "spin-sound";
export const REEL_SPIN_END_ID = "reel-spin-end-sound";

export const SoundContainer: React.FC = observer(() => {
    const { playSound, addAudioElements } = useAppStore();
    const backgroundMusicElement = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (backgroundMusicElement.current !== null) {
            backgroundMusicElement.current.volume = 0.3;
            if (playSound) {
                backgroundMusicElement.current.play();
            } else {
                backgroundMusicElement.current.pause();
            }
        }
    }, [backgroundMusicElement, playSound]);

    return (
        <div style={ { position: "fixed", top: -100, left: -100 } }>
            <audio
                ref={ backgroundMusicElement }
                id={ BACKGROUND_MUSIC_ID }
                src={ backgroundMusicSrc as string }
                loop={ true }
            />
            <audio ref={ addAudioElements } id={ BET_SOUND_ID } src={ betChangeSoundSrc as string }/>
            <audio ref={ addAudioElements } id={ SPIN_SOUND_ID } src={ spinSoundSrc as string }/>
            <audio ref={ addAudioElements } id={ REEL_SPIN_END_ID } src={ reelSpinEndSrc as string }/>
        </div>
    );
});