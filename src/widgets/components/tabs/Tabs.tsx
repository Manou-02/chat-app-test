import React, { FC } from "react";
import { Tabs as ATabs } from "antd";

type ItemsType = {
  key: string;
  label: string | React.ReactNode;
  children: React.ReactNode;
};

type PropsType = {
  data: Array<ItemsType>;
  isShowFooter?: boolean;
  activeKey?: string;
  onNext?: () => void;
  onPrev?: () => void;
};

export const Tabs: FC<PropsType> = ({ data, activeKey = "0" }) => {
  return (
    <>
      <ATabs items={data} defaultActiveKey={activeKey} />
    </>
  );
};
