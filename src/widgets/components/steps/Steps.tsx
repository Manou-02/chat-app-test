import React, { FC } from "react";
import { Steps as ASteps } from "antd";

type ItemsType = {
  key: number;
  title: string | React.ReactNode;
  content: React.ReactNode;
};

type PropsType = {
  data: Array<ItemsType>;
  isShowFooter?: boolean;
  activeKey?: number;
  onNext?: () => void;
  onPrev?: () => void;
};

export const Steps: FC<PropsType> = ({ data, activeKey = 0 }) => {
  return (
    <>
      <ASteps items={data} current={activeKey} />
      <div className=" mt-[30px] w-full min-h-[calc(100vh_-_300px)] flex flex-col justify-between">
        <div className="w-full h-[calc(100vh_-_300px)]">
          {data[activeKey]?.content}
        </div>
      </div>
    </>
  );
};
