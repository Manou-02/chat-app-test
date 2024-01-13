import { Button } from "@/shared/ui/button/Button";
import React, { useState, useEffect } from "react";
// import { Popover } from "antd";
// import {
//   BsFileEarmarkPdf,
//   BsFileEarmarkExcel,
//   BsFiletypeCsv,
// } from "react-icons/bs";
import { useAppSelector } from "@/app/hooks/app.hooks";
import { useDispatch } from "react-redux";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { IMAGES } from "@shared/config/Images";
import { Toast } from "@/shared/components/toast/ToastHelper";

enum TypeExport {
  Excel = "EXCEL",
  Pdf = "PDF",
  Csv = "CSV",
}

type PropsType = {
  isEnableExportCSV?: boolean;
  isEnableExportExcel?: boolean;
  isEnableExportPDF?: boolean;
  isEnableAdd?: boolean;
  isFullScreen?: boolean;
  title?: string;
  widthDrawer?: number;
  addFormContent?: React.ReactNode;
  handleOpenDrawer: () => void;
  onClose?: () => void;
};

export const TableHeader = ({
  isEnableAdd,
  isEnableExportCSV,
  isEnableExportExcel,
  isEnableExportPDF,
  title,
  handleOpenDrawer,
}: PropsType) => {
  //const [isShowAddDrawer, setIsShowAddDrawer] = useState<boolean>(false);
  const { drawerState } = useAppSelector((state) => state);
  const dispatch = useDispatch();

  const [isLoadingExport, setIsLoadingExport] = useState<boolean>(false);

  useEffect(() => {
    isLoadingExport && Toast.loading("Export en cours...");
  }, [isLoadingExport]);

  const handleShowAddDrawer = () => {
    //setIsShowAddDrawer((prev: boolean) => !prev);
    dispatch(ActionReducer.setShowDrawer(!drawerState));
  };

  const handleClickAdd = () => {
    handleShowAddDrawer();
    handleOpenDrawer();
  };

  const handleLoading = () => setIsLoadingExport((prev: boolean) => !prev);

  const handleClickExport = (types: string) => {
    console.log(types);
    handleLoading();

    setTimeout(() => {
      handleLoading();
    }, 3000);

    return;
  };

  // const content = () => {
  //   return (
  //     <>
  //       {isEnableExportPDF ? (
  //         <div className="w-[200px] flex gap-[10px] items-center border-b-2 border-accent cursor-pointer p-[10px]">
  //           <BsFileEarmarkPdf />
  //           <span>Export PDF</span>
  //         </div>
  //       ) : (
  //         ""
  //       )}
  //       {isEnableExportExcel ? (
  //         <div className="w-[200px] flex gap-[10px] items-center border-b-2 border-accent cursor-pointer p-[10px]">
  //           <BsFileEarmarkExcel />
  //           <span>Export Excel</span>
  //         </div>
  //       ) : (
  //         ""
  //       )}
  //       {isEnableExportCSV ? (
  //         <div className="w-[200px] flex gap-[10px] items-center border-b-2 border-accent cursor-pointer p-[10px]">
  //           <BsFiletypeCsv />
  //           <span>Export CSV</span>
  //         </div>
  //       ) : (
  //         ""
  //       )}
  //     </>
  //   );
  // };

  return (
    <div className="flex justify-between items-center my-[20px] mt-[10px]">
      <p className="font-bold text-[28px] text-secondary">{title}</p>
      <div className="flex justify-end gap-[20px] ">
        {isEnableExportCSV ? (
          <img
            src={IMAGES.CSV_IMAGE}
            alt="pdf"
            className="w-[40px] h-[40px] cursor-pointer"
            onClick={() => handleClickExport(TypeExport.Csv)}
          />
        ) : (
          ""
        )}
        {isEnableExportPDF ? (
          <img
            src={IMAGES.PDF_IMAGE}
            alt="pdf"
            className="w-[40px] h-[40px] cursor-pointer"
            onClick={() => handleClickExport(TypeExport.Pdf)}
          />
        ) : (
          ""
        )}
        {isEnableExportExcel ? (
          <img
            src={IMAGES.EXCEL_IMAGE}
            alt="excel"
            className="w-[40px] h-[40px] cursor-pointer"
            onClick={() => handleClickExport(TypeExport.Excel)}
          />
        ) : (
          ""
        )}
        {/* {isEnableExportCSV || isEnableExportExcel || isEnableExportPDF ? (
          <Popover placement="bottom" content={content} trigger="click">
            <Button typeButton="secondary" onClick={handleClickExport}>
              Export
            </Button>
          </Popover>
        ) : (
          ""
        )} */}
        {isEnableAdd ? (
          <Button typeButton="primary" onClick={handleClickAdd}>
            Nouveau
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
