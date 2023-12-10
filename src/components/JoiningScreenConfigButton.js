import { createPopper } from "@popperjs/core";
import { useRef, useState } from "react";

export const ButtonWithTooltip = ({
  onClick,
  onState,
  OnIcon,
  OffIcon,
  onText,
  offText,
}) => {
  const [tooltipShow, setTooltipShow] = useState(false);
  const btnRef = useRef();
  const tooltipRef = useRef();

  const openTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, {
      placement: "bottom",
    });
    setTooltipShow(true);
  };

  const closeTooltip = () => {
    setTooltipShow(false);
  };

  return (
    <div className="">
      <div className="relative" ref={btnRef}>
        <button
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
          onClick={onClick}
          className={`rounded-full min-w-auto w-11 h-11 flex items-center justify-center ${
            onState ? "bg-white" : "bg-red-650 text-white"
          }`}
        >
          {onState ? (
            <OnIcon fillcolor={onState ? "#050A0E" : "#fff"} />
          ) : (
            <OffIcon fillcolor={onState ? "#050A0E" : "#fff"} />
          )}
        </button>
      </div>
      {tooltipShow && (
        <div className="fixed" ref={tooltipRef}>
          <div className={"rounded-md p-1.5 bg-black "}>
            <p className="text-base text-white ">
              {onState ? onText : offText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
