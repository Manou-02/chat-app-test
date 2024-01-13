import React, { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";

type Props = {
  isLoading?: boolean;
  fullscreen?: boolean;
  count?: number;
  max?: number;
  isShowCounter?: boolean;
};

export const Loader: React.FC<Props> = ({
  isLoading = false,
  fullscreen = true,
  count = 0,
  max = 1,
  isShowCounter = false,
}) => {
  const [step, setStep] = useState<number>(0);
  useEffect(() => {
    setStep(count);
  }, [count]);
  const LoadingRender = (
    <div style={loadingStyles.loadingText(isShowCounter)}>
      {isShowCounter ? (
        <span>
          Chargement... {step}/{max}
        </span>
      ) : (
        <span className="flex  justify-center items-center">
          <Spinner /> &nbsp;&nbsp;&nbsp;
        </span>
      )}
    </div>
  );
  if (fullscreen)
    return (
      <div
        style={{
          position: "fixed",
          ...loadingStyles.container,
          display: isLoading ? "flex" : "none",
        }}
      >
        {LoadingRender}
      </div>
    );
  if (isLoading)
    return <div className="flex justify-center">{LoadingRender}</div>;
  return null;
};

const loadingStyles = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7e829900",
    zIndex: 9999999999,
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "none",
  },
  loadingText: (isShowCounter?: boolean) => ({
    backgroundColor: "#131628",
    padding: "7px 20px",
    borderRadius: 7,
    boxShadow: "0 0 7px #131628",
    color: "#FFF",
    marginTop: 30,
    maxWidth: isShowCounter ? 300 : 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
};
