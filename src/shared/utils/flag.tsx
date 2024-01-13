import { FaFlag } from "react-icons/fa";

export const renderPriority = (state: "urgent" | "high" | "normal" | "low") => {
  const urgentColor = {
    color: "#E31C23",
  };
  const highColor = {
    color: "#FFCC01",
  };
  const normalColor = {
    color: "#70DDFF",
  };
  const lowColor = {
    color: "#D8D8D8",
  };
  switch (state) {
    case "urgent":
      return (
        <div className="flex justify-center items-center mr-[20px]">
          <FaFlag style={urgentColor} />
        </div>
      );
    case "high":
      return (
        <div className="flex justify-center items-center mr-[20px]">
          <FaFlag style={highColor} />
        </div>
      );
    case "normal":
      return (
        <div className="flex justify-center items-center mr-[20px]">
          <FaFlag style={normalColor} />
        </div>
      );
    case "low":
      return (
        <div className="flex justify-center items-center mr-[20px]">
          <FaFlag style={lowColor} />
        </div>
      );
    default:
      return;
  }
};
