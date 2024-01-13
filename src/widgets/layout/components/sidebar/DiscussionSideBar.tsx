import { Tabs } from "@/widgets/components/tabs/Tabs";
import { DiscussionsGroup } from "@/widgets/discussionGroup/DiscussionsGroup";
import { Discussions } from "@/widgets/discussions/Discussions";
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
      children: <Discussions />,
    },
    {
      key: "1",
      label: "Groupes",
      children: <DiscussionsGroup />,
    },
  ]);

  return (
    <>
      <Tabs activeKey="0" data={data} />
    </>
  );
};
