import { Button } from "@/shared/ui/button/Button";
import PopUp from "@/shared/ui/popUp/PopUp";
import { useState } from "react";

export default function Modal() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleIsShowModal = () => {
    setIsShowModal((prev: boolean) => !prev);
  };

  return (
    <div>
      <Button onClick={handleIsShowModal}>Show PopUp</Button>
      <PopUp isModalOpen={isShowModal} hanldeCloseModal={handleIsShowModal}>
        <p>Content</p>
      </PopUp>
    </div>
  );
}
