import { useEffect, useRef, useState } from "react";

export const OutlinedButton = ({
  bgColor,
  onClick,
  Icon,
  isFocused,
  badge,
  disabledOpacity,
  renderRightComponent,
  disabled,
  large,
  btnID,
  color,
  focusIconColor,
  isRequestProcessing,
  buttonText,
}) => {
  const [blinkingState, setBlinkingState] = useState(1);

  const btnRef = useRef();

  const intervalRef = useRef();

  const iconSize = 24 * (large ? 1.7 : 1);

  const startBlinking = () => {
    intervalRef.current = setInterval(() => {
      setBlinkingState((s) => (s === 1 ? 0.4 : 1));
    }, 600);
  };

  const stopBlinking = () => {
    clearInterval(intervalRef.current);

    setBlinkingState(1);
  };

  useEffect(() => {
    if (isRequestProcessing) {
      startBlinking();
    } else {
      stopBlinking();
    }
  }, [isRequestProcessing]);

  useEffect(() => {
    return () => {
      stopBlinking();
    };
  }, []);

  return (
    <>
      <div ref={btnRef}>
        <div
          className={`flex items-center justify-center rounded-full ${
            bgColor
              ? `${bgColor}`
              : isFocused
              ? "bg-white hover:bg-gray-100"
              : "bg-gray-750 hover:bg-gray-800"
          } md:m-2 m-1`}
          style={{
            transition: "all 200ms",
            transitionTimingFunction: "ease-in-out",
            opacity: blinkingState,
          }}
        >
          <button
            className={`${
              disabled ? "cursor-default" : "cursor-pointer"
            } flex items-center justify-center`}
            id={btnID}
            disabled={disabled}
            onClick={onClick}
          >
            <div
              className="flex items-center justify-center p-1 m-1 rounded-lg"
              style={{
                opacity: disabled ? disabledOpacity || 0.7 : 1,
                transition: `all ${200 * 1}ms`,
                transitionTimingFunction: "linear",
              }}
            >
              {Icon && (
                <>
                  <Icon
                    style={{
                      color: isFocused
                        ? focusIconColor || "#1C1F2E"
                        : color
                        ? color
                        : "#fff",
                      height: iconSize,
                      width: iconSize,
                    }}
                    fillcolor={
                      isFocused
                        ? focusIconColor || "#1C1F2E"
                        : color
                        ? color
                        : "#fff"
                    }
                  />
                  {badge && (
                    <p
                      className={`${
                        isFocused ? "text-black" : "text-white"
                      } text-base ml-2`}
                    >
                      {badge}
                    </p>
                  )}
                </>
              )}
            </div>
            {buttonText ? (
              <p className="text-sm text-white font-semibold mr-2 text-center">
                {buttonText}
              </p>
            ) : null}
          </button>
          {typeof renderRightComponent === "function" && renderRightComponent()}
        </div>
      </div>
    </>
  );
};
