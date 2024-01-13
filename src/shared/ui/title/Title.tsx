import React from "react";

type PropsType = {
  size?: any;
  children: string | React.ReactNode;

};
export const Title = ({ size = "11", children }: PropsType) => {
  return (
    <p style={{ fontSize: `${size}px` }} className={`font-bold text-secondary`}> {children} </p>
  );
};
