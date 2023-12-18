import { Button } from "../../ui/Button";
import { Navbar } from "../Navbar";

export function LeaveScreen({ setIsMeetingLeft }) {
  return (
    <>
      <Navbar />
      <div className="bg-gray-800 h-[90vh] flex flex-col flex-1 items-center justify-center">
        <h1 className="text-white text-4xl">You left the meeting</h1>
        <div className="mt-12">
          <Button
            className="w-full"
            onClick={() => {
              setIsMeetingLeft(false);
            }}
          >
            Rejoin the Meeting
          </Button>
        </div>
      </div>
    </>
  );
}
