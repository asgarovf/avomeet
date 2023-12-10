import React, { useEffect, useMemo, useRef, useState } from "react";
import { MeetingDetailsScreen } from "../MeetingDetailsScreen";
import { createMeeting, getToken, validateMeeting } from "../../api";
import { CheckCircleIcon } from "@heroicons/react/outline";
import SettingDialogueBox from "../SettingDialogueBox";
import ConfirmBox from "../ConfirmBox";
import useIsMobile from "../../hooks/useIsMobile";
import { createPopper } from "@popperjs/core";
import WebcamOffIcon from "../../icons/WebcamOffIcon";
import WebcamOnIcon from "../../icons/Bottombar/WebcamOnIcon";
import MicOffIcon from "../../icons/MicOffIcon";
import MicOnIcon from "../../icons/Bottombar/MicOnIcon";
import { SettingsIcon } from "../../icons/SettingsIcon";
import { ButtonWithTooltip } from "../JoiningScreenConfigButton";
import { Navbar } from "../Navbar";

export function JoiningScreen({
  participantName,
  setParticipantName,
  setMeetingId,
  setToken,
  setSelectedMic,
  setSelectedWebcam,
  onClickStartMeeting,
  micEnabled,
  webcamEnabled,
  setWebcamOn,
  setMicOn,
}) {
  const [setting, setSetting] = useState("video");
  const [{ webcams, mics }, setDevices] = useState({
    devices: [],
    webcams: [],
    mics: [],
  });

  const [videoTrack, setVideoTrack] = useState(null);

  const [dlgMuted, setDlgMuted] = useState(false);
  const [dlgDevices, setDlgDevices] = useState(false);

  const videoPlayerRef = useRef();
  const popupVideoPlayerRef = useRef();
  const popupAudioPlayerRef = useRef();

  const videoTrackRef = useRef();
  const audioTrackRef = useRef();
  const audioAnalyserIntervalRef = useRef();

  const [settingDialogueOpen, setSettingDialogueOpen] = useState(false);

  const [audioTrack, setAudioTrack] = useState(null);

  const handleClickOpen = () => {
    setSettingDialogueOpen(true);
  };

  const handleClose = (value) => {
    setSettingDialogueOpen(false);
  };

  const isMobile = useIsMobile();

  const webcamOn = useMemo(() => !!videoTrack, [videoTrack]);
  const micOn = useMemo(() => !!audioTrack, [audioTrack]);

  const _handleTurnOffWebcam = () => {
    const videoTrack = videoTrackRef.current;

    if (videoTrack) {
      videoTrack.stop();
      setVideoTrack(null);
      setWebcamOn(false);
    }
  };
  const _handleTurnOnWebcam = () => {
    const videoTrack = videoTrackRef.current;

    if (!videoTrack) {
      getDefaultMediaTracks({ mic: false, webcam: true });
      setWebcamOn(true);
    }
  };

  const _toggleWebcam = () => {
    const videoTrack = videoTrackRef.current;

    if (videoTrack) {
      _handleTurnOffWebcam();
    } else {
      _handleTurnOnWebcam();
    }
  };
  const _handleTurnOffMic = () => {
    const audioTrack = audioTrackRef.current;

    if (audioTrack) {
      audioTrack.stop();

      setAudioTrack(null);
      setMicOn(false);
    }
  };
  const _handleTurnOnMic = () => {
    const audioTrack = audioTrackRef.current;

    if (!audioTrack) {
      getDefaultMediaTracks({ mic: true, webcam: false });
      setMicOn(true);
    }
  };
  const _handleToggleMic = () => {
    const audioTrack = audioTrackRef.current;

    if (audioTrack) {
      _handleTurnOffMic();
    } else {
      _handleTurnOnMic();
    }
  };

  const changeWebcam = async (deviceId) => {
    const currentvideoTrack = videoTrackRef.current;

    if (currentvideoTrack) {
      currentvideoTrack.stop();
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId },
    });
    const videoTracks = stream.getVideoTracks();

    const videoTrack = videoTracks.length ? videoTracks[0] : null;

    setVideoTrack(videoTrack);
  };
  const changeMic = async (deviceId) => {
    const currentAudioTrack = audioTrackRef.current;
    currentAudioTrack && currentAudioTrack.stop();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId },
    });
    const audioTracks = stream.getAudioTracks();

    const audioTrack = audioTracks.length ? audioTracks[0] : null;
    clearInterval(audioAnalyserIntervalRef.current);

    setAudioTrack(audioTrack);
  };

  const getDefaultMediaTracks = async ({ mic, webcam, firstTime }) => {
    if (mic) {
      const audioConstraints = {
        audio: true,
      };

      const stream = await navigator.mediaDevices.getUserMedia(
        audioConstraints
      );
      const audioTracks = stream.getAudioTracks();

      const audioTrack = audioTracks.length ? audioTracks[0] : null;

      setAudioTrack(audioTrack);
      if (firstTime) {
        setSelectedMic({
          id: audioTrack?.getSettings()?.deviceId,
        });
      }
    }

    if (webcam) {
      const videoConstraints = {
        video: {
          width: 1280,
          height: 720,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(
        videoConstraints
      );
      const videoTracks = stream.getVideoTracks();

      const videoTrack = videoTracks.length ? videoTracks[0] : null;
      setVideoTrack(videoTrack);
      if (firstTime) {
        setSelectedWebcam({
          id: videoTrack?.getSettings()?.deviceId,
        });
      }
    }
  };

  async function startMuteListener() {
    const currentAudioTrack = audioTrackRef.current;

    if (currentAudioTrack) {
      if (currentAudioTrack.muted) {
        setDlgMuted(true);
      }

      currentAudioTrack.addEventListener("mute", (ev) => {
        setDlgMuted(true);
      });
    }
  }

  const getDevices = async ({ micEnabled, webcamEnabled }) => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      const webcams = devices.filter((d) => d.kind === "videoinput");
      const mics = devices.filter((d) => d.kind === "audioinput");

      const hasMic = mics.length > 0;
      const hasWebcam = webcams.length > 0;

      setDevices({ webcams, mics, devices });

      if (hasMic) {
        startMuteListener();
      }

      getDefaultMediaTracks({
        mic: hasMic && micEnabled,
        webcam: hasWebcam && webcamEnabled,
        firstTime: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    audioTrackRef.current = audioTrack;

    startMuteListener();

    return () => {
      const currentAudioTrack = audioTrackRef.current;
      currentAudioTrack && currentAudioTrack.stop();
      audioTrackRef.current = null;
    };
  }, [audioTrack]);

  useEffect(() => {
    videoTrackRef.current = videoTrack;

    var isPlaying =
      videoPlayerRef.current.currentTime > 0 &&
      !videoPlayerRef.current.paused &&
      !videoPlayerRef.current.ended &&
      videoPlayerRef.current.readyState >
        videoPlayerRef.current.HAVE_CURRENT_DATA;

    if (videoTrack) {
      const videoSrcObject = new MediaStream([videoTrack]);

      if (videoPlayerRef.current) {
        videoPlayerRef.current.srcObject = videoSrcObject;
        if (videoPlayerRef.current.pause && !isPlaying) {
          try {
            videoPlayerRef.current.play();
          } catch (err) {
            console.log("error in playing video", err);
          }
        }
      }

      setTimeout(() => {
        if (popupVideoPlayerRef.current) {
          popupVideoPlayerRef.current.srcObject = videoSrcObject;
          try {
            popupVideoPlayerRef.current.play();
          } catch (err) {
            console.log("error in playing video", err);
          }
        }
      }, 1000);
    } else {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.srcObject = null;
      }
      if (popupVideoPlayerRef.current) {
        popupVideoPlayerRef.current.srcObject = null;
      }
    }
  }, [videoTrack, setting, settingDialogueOpen]);

  useEffect(() => {
    getDevices({ micEnabled, webcamEnabled });
  }, []);

  return (
    <div className="overflow-y-auto flex flex-col flex-1 min-h-screen bg-gray-800">
      <Navbar />
      <div className="flex flex-col justify-center w-full">
        <div className="flex w-[90%] md:w-[50%] flex-col items-center justify-center mx-auto my-20">
          <div className="flex w-full h-full justify-center relative">
            <video
              autoPlay
              playsInline
              muted
              ref={videoPlayerRef}
              controls={false}
              className={
                "rounded-[32px] h-[520px] bg-gray-150 w-full object-cover flex items-center justify-center"
              }
            />

            {!isMobile ? (
              <>
                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                  {!webcamOn ? (
                    <p className="text-xl xl:text-lg 2xl:text-xl text-white">
                      The camera is off
                    </p>
                  ) : null}
                </div>
              </>
            ) : null}

            <div className="absolute xl:bottom-6 bottom-4 left-0 right-0">
              <div className="container grid grid-flow-col space-x-4 items-center justify-center md:-m-2">
                <ButtonWithTooltip
                  onClick={_handleToggleMic}
                  onState={micOn}
                  OnIcon={MicOnIcon}
                  OffIcon={MicOffIcon}
                  onText={"Turn off microphone"}
                  offText={"Turn on micophone"}
                />
                <ButtonWithTooltip
                  onClick={_toggleWebcam}
                  onState={webcamOn}
                  OnIcon={WebcamOnIcon}
                  OffIcon={WebcamOffIcon}
                  onText={"Turn off camera"}
                  offText={"Turn on camera"}
                />
                {!isMobile ? (
                  <ButtonWithTooltip
                    onClick={handleClickOpen}
                    onState={true}
                    OnIcon={SettingsIcon}
                    OffIcon={SettingsIcon}
                    onText={"Video/Audio Settings"}
                    offText={"Video/Audio Settings"}
                  />
                ) : null}
              </div>
            </div>
          </div>

          <SettingDialogueBox
            open={settingDialogueOpen}
            onClose={handleClose}
            popupVideoPlayerRef={popupVideoPlayerRef}
            popupAudioPlayerRef={popupAudioPlayerRef}
            changeWebcam={changeWebcam}
            changeMic={changeMic}
            setting={setting}
            setSetting={setSetting}
            webcams={webcams}
            mics={mics}
            setSelectedMic={setSelectedMic}
            setSelectedWebcam={setSelectedWebcam}
            videoTrack={videoTrack}
            audioTrack={audioTrack}
          />

          <div className="w-full mt-12 flex flex-col">
            <MeetingDetailsScreen
              participantName={participantName}
              setParticipantName={setParticipantName}
              videoTrack={videoTrack}
              setVideoTrack={setVideoTrack}
              onClickStartMeeting={onClickStartMeeting}
              onClickJoin={async (id) => {
                const token = await getToken();
                const valid = await validateMeeting({
                  roomId: id,
                  token,
                });

                if (valid) {
                  setToken(token);
                  setMeetingId(id);
                  if (videoTrack) {
                    videoTrack.stop();
                    setVideoTrack(null);
                  }
                  onClickStartMeeting();
                  setParticipantName("");
                } else alert("Invalid Meeting Id");
              }}
              _handleOnCreateMeeting={async () => {
                const token = await getToken();
                const _meetingId = await createMeeting({ token });
                setToken(token);
                setMeetingId(_meetingId);
                setParticipantName("");
                return _meetingId;
              }}
            />
          </div>
        </div>
      </div>
      <ConfirmBox
        open={dlgMuted}
        successText="OKAY"
        onSuccess={() => {
          setDlgMuted(false);
        }}
        title="System mic is muted"
        subTitle="You're default microphone is muted, please unmute it or increase audio
            input volume from system settings."
      />

      <ConfirmBox
        open={dlgDevices}
        successText="DISMISS"
        onSuccess={() => {
          setDlgDevices(false);
        }}
        title="Mic or webcam not available"
        subTitle="Please connect a mic and webcam to speak and share your video in the meeting. You can also join without them."
      />
    </div>
  );
}
