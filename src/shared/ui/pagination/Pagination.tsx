import { FC } from "react";
import { Pagination as APagination } from "antd";

type PropsType = {
  total: number;
  pageSize?: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  responsive?: boolean;
  onChange?: () => void;
};

export const Pagination: FC<PropsType> = ({
  defaultCurrent = 1,
  total,
  pageSize = 10,
  onChange,
}) => {
  return (
    <APagination
      defaultCurrent={defaultCurrent}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
    />
  );
};
