import { Modal } from "antd";
import { ReactNode } from "react";

type Props = {
  isModalOpen: boolean;
  hanldeCloseModal: () => void;
  children: ReactNode;
  title?: string;
  width?: number | string;
  centered?: boolean;
};

export default function PopUp({
  isModalOpen,
  hanldeCloseModal,
  title,
  children,
  width,
  centered,
}: Props) {
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={hanldeCloseModal}
        onCancel={hanldeCloseModal}
        width={width}
        footer={null}
        centered={centered}
      >
        {children}
      </Modal>
    </>
  );
}
