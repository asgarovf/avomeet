import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Button } from "../ui/Button";

export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  setParticipantName,
  videoTrack,
  setVideoTrack,
  onClickStartMeeting,
}) {
  const [meetingId, setMeetingId] = useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);

  const isJoinButtonDisabled =
    participantName.length < 3 || meetingId.trim() === "";

  return (
    <div
      className={`flex flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >
      {iscreateMeetingClicked ? (
        <div className="border border-solid border-gray-400 rounded-xl px-4 py-3  flex items-center justify-center">
          <p className="text-white text-base">
            {`Meeting code : ${meetingId}`}
          </p>
          <button
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(meetingId);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5 text-green-400" />
            ) : (
              <ClipboardIcon className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      ) : isJoinMeetingClicked ? (
        <>
          <input
            defaultValue={meetingId}
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
            placeholder={"Enter meeting Id"}
            className="px-4 py-3 bg-gray-650 rounded-xl text-white w-full text-center"
          />
          {meetingIdError && (
            <p className="text-xs text-red-600">{`Please enter valid Meeting ID`}</p>
          )}
        </>
      ) : null}

      {(iscreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          <input
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Enter your name"
            className="px-4 py-3 mt-3 bg-gray-650 rounded-xl text-white w-full text-center"
          />
          <div className="flex space-x-2 mt-3">
            <Button
              color="secondary"
              onClick={() => {
                setMeetingId("");
                setParticipantName("");
                setIsJoinMeetingClicked(false);
              }}
            >
              Back
            </Button>
            <Button
              disabled={isJoinButtonDisabled}
              className={`w-full text-white ${
                isJoinButtonDisabled ? "opacity-50" : ""
              }`}
              onClick={(e) => {
                if (iscreateMeetingClicked) {
                  if (videoTrack) {
                    videoTrack.stop();
                    setVideoTrack(null);
                  }
                  onClickStartMeeting();
                } else {
                  if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                    onClickJoin(meetingId);
                  } else setMeetingIdError(true);
                }
              }}
            >
              {iscreateMeetingClicked ? "Start a meeting" : "Join a meeting"}
            </Button>
          </div>
        </>
      )}

      {!iscreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="w-full md:mt-0 mt-4 flex flex-col">
          <div className="flex items-center justify-center flex-col w-full">
            <Button
              onClick={async (e) => {
                const meetingId = await _handleOnCreateMeeting();
                console.log(meetingId);
                setMeetingId(meetingId);
                setIscreateMeetingClicked(true);
              }}
              className="w-full"
            >
              Create a meeting
            </Button>
            <Button
              className="mt-2"
              color="secondary"
              onClick={(e) => {
                setIsJoinMeetingClicked(true);
              }}
            >
              Join a meeting
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
