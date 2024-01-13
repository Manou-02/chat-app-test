import { Button } from "@/shared/ui/button/Button";
import { Drawer } from "@/shared/ui/drawer/Drawer";
import { FC, useState } from "react";

export const DrawerComponent: FC = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const handleShowDrawer = () => {
    setIsOpenDrawer((prev: boolean) => !prev);
  };

  return (
    <>
      <Button onClick={handleShowDrawer}> Open Drawer </Button>
      <Drawer
        size="large"
        title="Drawer"
        isFullWidth
        width={1600}
        isOpenDrawer={isOpenDrawer}
        onClose={handleShowDrawer}
      >
        <p>Content of the drawer</p>
      </Drawer>
    </>
  );
};
