import React from "react";
import style from "./style.module.scss";

type PropsType = {
  path: string;
  children: string | React.ReactNode;
};

export default function Link({ children, path }: PropsType) {
  return (
    <a className={style.link__content} href={path}>
      {" "}
      {children}{" "}
    </a>
  );
}
