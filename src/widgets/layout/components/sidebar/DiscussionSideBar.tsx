import { Tabs } from "@/widgets/components/tabs/Tabs";
import { useState } from "react";

type ItemsType = {
  key: string;
  label: string | React.ReactNode;
  children: React.ReactNode;
};

export const DiscussionSideBar = () => {
  const [data] = useState<Array<ItemsType>>([
    {
      key: "0",
      label: "Discussions",
      children: <p>Simple discussion </p>,
    },
    {
      key: "1",
      label: "Groupes",
      children: <p>Groupes de discussion </p>,
    },
  ]);

  return (
    <>
      <Tabs activeKey="0" data={data} />
    </>
  );
};
