import React, { useEffect, useRef, useState } from "react";

const WaitingToJoinScreen = () => {
  const waitingMessages = [
    { index: 0, text: "Creating a room for you..." },
    { index: 1, text: "Almost there..." },
  ];
  const [message, setMessage] = useState(waitingMessages[0]);

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMessage((s) =>
        s.index === waitingMessages.length - 1
          ? s
          : waitingMessages[s.index + 1]
      );
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className="bg-gray-800"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        // backgroundColor: theme.palette.darkTheme.main,
      }}
    >
      <div className="flex flex-col">
        <img src={"/logo.png"} className="w-[240px]" alt="logo" />
        <h1 className="text-white text-center font-medium mt-2 text-xl">
          {message.text}
        </h1>
      </div>
    </div>
  );
};

export default WaitingToJoinScreen;
