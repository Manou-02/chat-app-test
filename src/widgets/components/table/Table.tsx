import React, { Fragment, ReactNode, useEffect, useState } from "react";
import "./style.scss";

import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  // getSortedRowModel,
} from "@tanstack/react-table";

import type { ColumnDef, Row, SortingState } from "@tanstack/react-table";
import classNames from "classnames";
import { Pagination, Input, Popover, Tooltip, Alert, Button } from "antd";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { GrEdit, GrTrash } from "react-icons/gr";
import { BsEye, BsSearch } from "react-icons/bs";
import { TableHeader } from "./TableHeader";
import { Drawer } from "@/shared/ui/drawer/Drawer";
import PopUp from "@/shared/ui/popUp/PopUp";
import { Http } from "@/features/http/repository/http";
import Spinner from "@/shared/ui/spinner/Spinner";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "@/entities/flotte/Vehicle";
import { Color } from "@/shared/config/Colors";
import { useAppSelector } from "@/app/hooks/app.hooks";
import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";
import {
  resetSelectedItemTable,
  setSelectedItemTable,
} from "@/shared/reducers/table/Table.reducer";

type DrawerTypes = {
  label: string;
  value: string;
  component?: React.ReactNode;
};

enum DrawerEnum {
  Add = "ADD",
  Edit = "EDIT",
  Show = "SHOW",
}

interface ReactTableProps<T, P extends object> {
  data: T[];
  tableTitle?: ReactNode;
  columns: ColumnDef<T, any>[];
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  onPaginationChange?: (pagination: any) => void;
  className?: string;
  paginationData?: P;
  title?: string;
  isCanHiddenColumn?: boolean;
  isShowHeader?: boolean;
  isCanClickOnRow?: boolean;
  isCanShow?: boolean;
  isCanEdit?: boolean;
  isCanDelete?: boolean;
  isEnableAdd?: boolean;
  isEnableExportPDF?: boolean;
  isEnableExportCSV?: boolean;
  isEnableExportExcel?: boolean;
  isDrawerFullScreen?: boolean;
  isDetailsDrawerFull?: boolean;
  ressource?: string;
  addFormContent?: React.ReactNode;
  editFornContent?: React.ReactNode;
  detailsContent?: React.ReactNode;
  onLoad?: () => void;
  onSearch: (event: any) => void;
  onFilter: (event: any) => void;
  onGetValue: (value: any) => void;
  onChangePage?: (value: any) => void;
  drawerWidth?: number;
  detailsDrawerWidth?: number;
  children?: string | React.ReactNode;
  pagination?: {
    defaultCurrentPage: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

function Table<T, P extends object>({
  data,
  tableTitle,
  columns,
  renderSubComponent,
  onPaginationChange,
  paginationData,
  className,
  isCanHiddenColumn,
  isCanShow,
  isCanEdit,
  isCanDelete,
  isEnableAdd,
  isEnableExportPDF,
  isEnableExportExcel,
  isEnableExportCSV,
  isDrawerFullScreen,
  isShowHeader = true,
  onSearch,
  addFormContent,
  editFornContent,
  onFilter,
  pagination,
  onGetValue,
  ressource,
  title,
  drawerWidth,
  children,
  isCanClickOnRow,
  detailsContent,
  onLoad,
  onChangePage,
}: ReactTableProps<T, P>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  useEffect(() => {
    let final = {};
    for (let i = 0; i < sorting.length; i++) {
      const name = `order[${sorting[i].id?.replace("_", ".")}]`;
      final = {
        ...final,
        [name]: sorting[i].desc ? "desc" : "asc",
      };
    }
    Object.keys(final).length && onFilter(final);
  }, [sorting]);

  const { drawerState } = useAppSelector((state) => state);
  const dispatch: AppDispatch = useDispatch();

  const [activateComponent, setActivateComponent] = useState<
    React.ReactNode | undefined
  >();

  const [activateAction, setActivateAction] = useState<
    DrawerTypes | undefined
  >();
  const [DrawerItem] = useState<Array<DrawerTypes>>([
    {
      label: "Nouveau",
      value: "ADD",
    },
    {
      label: "Modification",
      value: "EDIT",
    },
    {
      label: "Détails",
      value: "SHOW",
    },
  ]);

  const [isShowModalDelete, setIsShowModalDelete] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    switch (activateAction?.value) {
      case DrawerEnum.Add:
        setActivateComponent(addFormContent);
        break;

      case DrawerEnum.Edit:
        setActivateComponent(editFornContent);
        break;

      case DrawerEnum.Show:
        setActivateComponent(detailsContent);
        break;

      default:
        break;
    }
  }, [activateAction]);

  useEffect(() => {
    return () => {
      onGetValue(null);
    };
  }, [selectedItem]);

  useEffect(() => {
    if (onPaginationChange) {
      onPaginationChange({});
    }
  }, [paginationData, onPaginationChange]);

  const handleClickActions = (types: any, item?: any) => {
    setActivateAction(types);
    dispatch(ActionReducer.setShowDrawer(true));
    onGetValue(item ?? null);
    setSelectedItem(item ?? null);
    setActivateAction({
      ...(DrawerItem.find(
        (itemDraw: DrawerTypes) => itemDraw.value === types
      ) as any),
    });
    if (item) {
      dispatch(setSelectedItemTable(item ?? null));
    } else {
      dispatch(resetSelectedItemTable());
    }
  };

  const handleShowModalDelete = () => {
    setIsShowModalDelete((prev: boolean) => !prev);
  };

  const onClickDeleteHandler = (item: any) => {
    setSelectedItem(item);
    handleShowModalDelete();
  };

  const onDelete = async () => {
    try {
      setIsLoadingDelete(true);

      const { status } = await Http.delete(ressource ?? "", selectedItem.id);
      if (status === HttpStatus.OK) {
        Toast.success("Suppression effectué avec succès.");
        onLoad && onLoad();
      } else {
        Toast.error("Une erreur s'est produite, veuillez réessayer.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDelete(false);
      handleShowModalDelete();
    }
  };

  const handleChangePage = (data: any) => {
    onChangePage && onChangePage(data);
  };

  const Content = () => {
    return (
      <div className="flex flex-col gap-[5px]">
        <label>
          <input
            {...{
              type: "checkbox",
              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler(),
            }}
          />{" "}
          Tous
        </label>
        <hr className="" />
        {table.getAllLeafColumns().map((item, index) => (
          <div key={item.id} className="px-1">
            <label>
              <input
                {...{
                  type: "checkbox",
                  checked: item.getIsVisible(),
                  onChange: item.getToggleVisibilityHandler(),
                }}
              />{" "}
              {flexRender(
                item.columnDef.header,
                table.getHeaderGroups()?.[index]?.headers?.[index]?.getContext()
              )}
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className=" pr-[10px]" style={{ color: Color.SECONDARY }}>
      {isShowHeader ? (
        <TableHeader
          title={title}
          isFullScreen={isDrawerFullScreen}
          isEnableAdd={isEnableAdd}
          isEnableExportCSV={isEnableExportCSV}
          isEnableExportExcel={isEnableExportExcel}
          isEnableExportPDF={isEnableExportPDF}
          addFormContent={addFormContent}
          widthDrawer={drawerWidth}
          handleOpenDrawer={() => handleClickActions(DrawerEnum.Add, null)}
        />
      ) : (
        ""
      )}
      {children ? <div> {children} </div> : ""}

      <div
        className={`flex ${
          tableTitle ? "justify-between" : "justify-end"
        } mb-[20px]`}
      >
        {tableTitle && (
          <Title
            className="text-[16px]"
            level={4}
            style={{ color: Color.SECONDARY, fontSize: "18px" }}
          >
            {tableTitle}
          </Title>
        )}{" "}
        <div className="flex flex-col justify-end">
          <Input
            type="text"
            placeholder="Rechercher"
            className="outline-none p-[10px] max-w-[236px] rounded-[50px]"
            onChange={(e: any) =>
              e.target.value?.length > 2 || e.target.value?.length === 0
                ? onSearch({ search: e.target.value })
                : ""
            }
            suffix={<BsSearch />}
          />
        </div>
      </div>
      <table
        className={classNames(
          "table__container table__fixed_header",
          className
        )}
      >
        <thead className={"table__header"}>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr className="" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className={"table__header_item table__row-pair"}
                    key={header.id}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex justify-between pl-[10px] gap-[10px]">
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex gap-[5px] "
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <AiOutlineArrowUp />,
                            desc: <AiOutlineArrowDown />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>

                        {header.column.getCanFilter() ? (
                          <Popover
                            trigger={"click"}
                            content={
                              <Input
                                suffix={<BsSearch />}
                                placeholder="Recherche"
                                onChange={(e: any) =>
                                  e.target.value?.length >= 3 ||
                                  e.target.value?.length === 0
                                    ? onFilter({
                                        [header.id
                                          ?.replace("_", ".")
                                          .toString()]: e.target.value,
                                      })
                                    : ""
                                }
                              />
                            }
                          >
                            <BsSearch className="cursor-pointer hover:bg-white w-[15px] h-[15px]" />
                          </Popover>
                        ) : null}
                      </div>
                    )}
                  </th>
                ))}
                {(isCanEdit || isCanDelete || isCanShow) &&
                table.getHeaderGroups()[0]?.headers.length ? (
                  <th className="table__header_item table__row-pair">
                    Actions
                  </th>
                ) : (
                  ""
                )}
                {isCanHiddenColumn ? (
                  <th className="cursor-pointer w-[10px]  table__row-pair">
                    <Popover
                      content={Content}
                      trigger="click"
                      placement="bottom"
                    >
                      <Tooltip title="Afficher/Cacher">
                        <button className="bg-accent p-[10px] rounded-[50%]">
                          <BiMenuAltLeft />
                        </button>
                      </Tooltip>
                    </Popover>
                  </th>
                ) : (
                  ""
                )}
              </tr>
            );
          })}
        </thead>
        <tbody className={"table__body"}>
          {table.getRowModel().rows.map((row, index: number) => (
            <Fragment key={row.id}>
              <tr
                className={classNames(
                  {
                    "hover:bg-gray-100 bg-red-50 transition-colors dark:bg-black-300":
                      row.getIsExpanded(),
                  },
                  index % 2 ? "table__row-pair" : ""
                )}
                key={row.id}
                onClick={() => {
                  isCanClickOnRow &&
                    navigate(`/flotte/cars/${(row?.original as Vehicle)?.id}`);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="p-2 whitespace-nowrap"
                    style={{
                      width: cell.column.getSize(),
                    }}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                {(isCanEdit || isCanDelete || isCanShow) &&
                table.getHeaderGroups()[0]?.headers?.length ? (
                  <td className="p-2 whitespace-nowrap w-[50px]">
                    <div className="w-full flex gap-[5px] p-2 whitespace-nowrap ">
                      {isCanShow ? (
                        <BsEye
                          className="cursor-pointer  p-[2px] w-[20px] h-[20px]"
                          // onClick={() => handleClickShowHandler(row.original)}
                          onClick={() =>
                            handleClickActions(DrawerEnum.Show, row.original)
                          }
                        />
                      ) : (
                        ""
                      )}
                      {isCanEdit ? (
                        <GrEdit
                          className="cursor-pointer p-[2px] w-[20px] h-[20px]"
                          onClick={() =>
                            handleClickActions(DrawerEnum.Edit, row.original)
                          }
                        />
                      ) : (
                        ""
                      )}
                      {isCanDelete ? (
                        <GrTrash
                          className="cursor-pointer p-[2px] w-[20px] h-[20px]"
                          onClick={() => onClickDeleteHandler(row.original)}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                ) : (
                  ""
                )}
                {isCanHiddenColumn &&
                table.getHeaderGroups()[0]?.headers?.length ? (
                  <td></td>
                ) : (
                  ""
                )}
              </tr>

              {renderSubComponent ? (
                <tr key={row.id + "-expanded"}>
                  <td colSpan={columns.length}>
                    {renderSubComponent({ row })}
                  </td>
                </tr>
              ) : null}
            </Fragment>
          ))}
        </tbody>
      </table>
      {/* Pagination  */}
      {pagination ? (
        <div className="my-[20px] ml-auto">
          <Pagination
            className="w-full"
            defaultCurrent={pagination?.defaultCurrentPage || 1}
            pageSize={pagination?.itemsPerPage || 10}
            total={pagination?.totalItems || 0}
            onChange={(page, itemsPerPage) =>
              handleChangePage({ page, itemsPerPage })
            }
          />
        </div>
      ) : (
        ""
      )}

      {drawerState && activateComponent ? (
        <Drawer
          title={activateAction?.label || ""}
          width={drawerWidth || 1400}
          isFullWidth={isDrawerFullScreen}
          isOpenDrawer={drawerState}
          onClose={() => dispatch(ActionReducer.setShowDrawer(false))}
        >
          {activateComponent}
        </Drawer>
      ) : (
        ""
      )}
      <PopUp
        centered
        title="Suppression"
        isModalOpen={isShowModalDelete}
        hanldeCloseModal={handleShowModalDelete}
      >
        <>
          <Alert
            message="Voulez-vous vraiment supprimer cette élément ?"
            type="error"
            showIcon
          />
          <div className=" flex gap-[20px] my-[20px] justify-end">
            <Button onClick={handleShowModalDelete}>Annuler</Button>
            <Button className="bg-primary text-white" onClick={onDelete}>
              {isLoadingDelete ? <Spinner /> : "OK"}
            </Button>
          </div>
        </>
      </PopUp>
    </div>
  );
}

export default Table;
