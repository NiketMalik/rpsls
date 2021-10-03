import { memo, useCallback, useEffect } from "react";

import type { StoreState } from "store/types";

import { STORAGE_PREFRENCES_KEYS } from "constants/storage";

import { useDispatchAction } from "hooks/useDispatchAction";
import { useSelector } from "hooks/useSelector";
import { useAudio } from "hooks/useAudio";

import {
  setIsAudioEnabledAction,
  setIsMusicEnabledAction,
} from "store/actionCreators";
import { storage } from "services/storage";

import { OverlayTrigger, Tooltip, Image, Button } from "react-bootstrap";

import audioIcon from "static/images/icon-volume.svg";
import audioMuteIcon from "static/images/icon-volume-mute.svg";
import musicIcon from "static/images/icon-audio.svg";
import musicMuteIcon from "static/images/icon-audio-mute.svg";

const backgroundAudio: string = require("static/audio/background.mp3").default;

const getIsAudioEnabled = (state: StoreState) => state.isAudioEnabled;
const getIsMusicEnabled = (state: StoreState) => state.isMusicEnabled;

export const Volume = memo(() => {
  const isAudioEnabled = useSelector(getIsAudioEnabled),
    isMusicEnabled = useSelector(getIsMusicEnabled);

  const setIsAudioEnabled = useDispatchAction(setIsAudioEnabledAction),
    setIsMusicEnabled = useDispatchAction(setIsMusicEnabledAction);

  const [play, { stop }] = useAudio(backgroundAudio, {
    id: "background",
    loop: true,
    volume: 0.25,
    isAudio: true,
  });

  const handleAudioClick = useCallback(() => {
    storage
      .set(STORAGE_PREFRENCES_KEYS.AUDIO_ENABLED, !isAudioEnabled)
      .then(() => {
        setIsAudioEnabled(!isAudioEnabled);

        window.gtag("event", "toolbar_action_sound_audio", {
          event_label: "Toolbar Action",
          event_category: "toolbar",
          is_enabled: !isAudioEnabled,
        });
      });
  }, [isAudioEnabled, setIsAudioEnabled]);

  const handleMusicClick = useCallback(() => {
    storage
      .set(STORAGE_PREFRENCES_KEYS.MUSIC_ENABLED, !isMusicEnabled)
      .then(() => {
        setIsMusicEnabled(!isMusicEnabled);

        window.gtag("event", "toolbar_action_sound_music", {
          event_label: "Toolbar Action",
          event_category: "toolbar",
          is_enabled: !isMusicEnabled,
        });
      });
  }, [isMusicEnabled, setIsMusicEnabled]);

  useEffect(() => {
    storage
      .get<boolean>(STORAGE_PREFRENCES_KEYS.AUDIO_ENABLED)
      .then((isAudioEnabled) => setIsAudioEnabled(!!isAudioEnabled));
  }, [setIsAudioEnabled]);

  useEffect(() => {
    storage
      .get<boolean>(STORAGE_PREFRENCES_KEYS.MUSIC_ENABLED)
      .then((isMusicEnabled) => setIsMusicEnabled(!!isMusicEnabled));
  }, [setIsMusicEnabled]);

  useEffect(() => {
    if (isAudioEnabled) {
      play();
    } else {
      stop();
    }

    return () => {
      stop();
    };
  }, [isAudioEnabled, play, stop]);

  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={(props) => (
          <Tooltip
            id="toolbar-audio-tooltip"
            {...props}
            data-testid="audio-tooltip"
          >
            {isAudioEnabled ? "Disable" : "Enable"} game audio
          </Tooltip>
        )}
      >
        <Button
          variant="transparent"
          aria-label="audio"
          onClick={handleAudioClick}
          data-testid="audio-trigger"
        >
          <Image
            width="32"
            height="32"
            src={isAudioEnabled ? audioIcon : audioMuteIcon}
            alt="audio volume"
          />
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={(props) => (
          <Tooltip
            id="toolbar-music-tooltip"
            {...props}
            data-testid="music-tooltip"
          >
            {isMusicEnabled ? "Disable" : "Enable"} game music
          </Tooltip>
        )}
      >
        <Button
          variant="transparent"
          aria-label="music"
          onClick={handleMusicClick}
          data-testid="music-trigger"
        >
          <Image
            width="28"
            height={isMusicEnabled ? "24" : "28"}
            src={isMusicEnabled ? musicIcon : musicMuteIcon}
            alt="music volume"
          />
        </Button>
      </OverlayTrigger>
    </>
  );
});
