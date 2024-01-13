import { AppDispatch, store } from "@/app/appStore";
import { setTransactionForm } from "@/features/crm/transactions/reducers/TransactionForm.reducers";
import { DepartmentService } from "@/features/setting/department/services/Department.services";
import { UsersServices } from "@/features/users/services/Users.services";
import { HttpStatus } from "@/shared/config/Status";
import { Button } from "@/shared/ui/button/Button";
import { DatePicker } from "@/shared/ui/datePicker/DatePicker";
import { Divider } from "@/shared/ui/divider/Divider";
import { FormCustom } from "@/shared/ui/form/Form";
import { InputNumber } from "@/shared/ui/inputNumber/InputNumber";
import { Loader } from "@/shared/ui/loader/Loader";
import Select from "@/shared/ui/select/Select";
import Spinner from "@/shared/ui/spinner/Spinner";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Textarea } from "@/shared/ui/textarea/Textarea";
import { Title } from "@/shared/ui/title/Title";
import { UploadFile } from "@/shared/ui/upload/uploadFile/UploadFile";
import { renderPriority } from "@/shared/utils/flag";
import { Form } from "antd";
import dayjs from "dayjs";
import { FC, useState, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

type PropsType = {
  isLoading?: boolean;
  handlePrev: () => void;
  handleFinish: () => void;
};

const defaultState = {};

export const Transactions: FC<PropsType> = ({
  handleFinish,
  handlePrev,
  isLoading,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const allStateForm = (store?.getState() as any)?.transactionFormReducer
    ?.transactionForm;

  const [form] = Form.useForm();
  const [initialState, setInitialState] = useState<any>({
    transactions: [defaultState],
  });
  // const [transactionState, setTransactionState] = useState<any>([defaultState]);

  const [isLoadingOnMout, setIsLoadingOnMount] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allDepartment, setAllDepartment] = useState<any[]>([]);

  useEffect(() => {
    getAllUsers();
    getAllDepartment();
  }, []);

  useEffect(() => {
    setInitialState({ ...initialState, ...allStateForm });
  }, [allStateForm]);

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [initialState]);

  const handleLoading = () => {
    setIsLoadingOnMount((prev: any) => !prev);
  };

  const getAllUsers = async () => {
    try {
      handleLoading();
      const { status, data } = await UsersServices.getAllUsers({});

      if (status === HttpStatus.OK) {
        setAllUsers(
          data?.data?.map((item: any) => ({
            label: `${item?.firstname} ${item?.lastname}`,
            value: item?.id,
          }))
        );
      } else {
        setAllUsers([]);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      handleLoading();
    }
  };

  const getAllDepartment = async () => {
    try {
      handleLoading();
      const { status, data } = await DepartmentService.getAllDepartment({});

      if (status === HttpStatus.OK) {
        setAllDepartment(
          data?.data?.map((item: any) => ({
            label: `${item?.name}`,
            value: item?.id,
          }))
        );
      } else {
        setAllUsers([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleLoading();
    }
  };

  const onIncrementBusinessCode = () => {
    // setTransactionState((prev: any) => [...prev, defaultState]);
    setInitialState((prev: any) => ({
      ...prev,
      transactions: [...prev?.transactions, defaultState],
    }));
    dispatch(
      setTransactionForm({
        ...initialState,
        transactions: [...initialState?.transactions, defaultState],
      })
    );
  };

  const onRemoveBusinessCode = (key: number) => {
    // setTransactionState((prev: any) =>
    //   prev?.filter((_: any, index: number) => index !== key)
    // );
    setInitialState((prev: any) => ({
      ...prev,
      transactions: prev?.transactions?.filter(
        (_: any, index: number) => index !== key
      ),
    }));
    dispatch(
      setTransactionForm({
        ...initialState,
        transactions: initialState?.transactions?.filter(
          (_: any, index: number) => index !== key
        ),
      })
    );
  };

  const handleChange = (e: any) => {
    setInitialState((prev: any) => ({ ...prev, ...e }));
  };

  const handelChangeTransaction = (e: any, index: number) => {
    setInitialState((prev: any) => ({
      ...prev,
      transactions: prev?.transactions?.map((item: any, stateKey: number) => {
        if (stateKey !== index) {
          return item;
        } else {
          return {
            ...item,
            ...e,
          };
        }
      }),
    }));
    dispatch(
      setTransactionForm({
        ...initialState,
        transactions: initialState?.transactions?.map(
          (item: any, stateKey: number) => {
            if (stateKey !== index) {
              return item;
            } else {
              return {
                ...item,
                ...e,
              };
            }
          }
        ),
      })
    );
  };

  const handleSubmit = () => {
    try {
      handleFinish();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Loader isLoading={isLoadingOnMout} />
      <FormCustom
        form={form}
        onSubmit={handleSubmit}
        className="flex flex-col justify-between"
      >
        <div className="">
          <div className="mb-[20px]">
            <Title size={15}>Information générale</Title>
            <Divider />
          </div>
          <div className="flex gap-[20px] w-full">
            <div className="w-[30%]">
              <TextInput
                label="Nom du dossier"
                name="folderName"
                isDisable
                value={initialState["folder"]?.["name"]}
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                label="Client"
                name="folderCustomer"
                isDisable
                value={
                  initialState["folder"]?.["customer"]?.[
                    "customerIdentification"
                  ]?.["thirdParties"]
                }
                onChange={handleChange}
              />
            </div>
            <div className="w-[30%]">
              <TextInput
                isDisable
                label="Porteur du projet"
                name="folderProjectOwner"
                value={`${initialState["folder"]?.["projectHolder"]?.["firstname"]} ${initialState["folder"]?.["projectHolder"]?.["lastname"]}`}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-[20px] flex-col">
            {initialState?.transactions?.map((item: any, index: number) => (
              <div
                key={index}
                className="border border-accent rouded-[8px] p-[20px]"
              >
                <div className="mb-[20px]">
                  <div className="flex justify-between">
                    <Title size={15}>
                      Supplémentaire
                      {index !== 0 ? (
                        <span>
                          {" "}
                          - {index < 10 ? "0" + (index + 1) : index + 1}
                        </span>
                      ) : (
                        ""
                      )}
                    </Title>
                    {index !== 0 ? (
                      <MdOutlineDeleteOutline
                        onClick={() => onRemoveBusinessCode(index)}
                        className="cursor-pointer h-[25px] w-[25px] hover:bg-primary rounded-[50%] p-[2px] hover:text-white"
                      />
                    ) : (
                      <div className="h-[25px] w-[25px]"></div>
                    )}
                  </div>
                  <Divider />
                </div>

                <div className="flex gap-[20px] w-full">
                  <div className="w-[30%]">
                    <TextInput
                      label="Nom de la transaction"
                      name="name"
                      value={item["name"]}
                      onChange={(e) => handelChangeTransaction(e, index)}
                    />
                  </div>
                  <div className="w-[30%]">
                    <Select
                      label="Attribution de département"
                      name="department"
                      placeholder="-- Sélectionner --"
                      value={item["department"]}
                      options={allDepartment}
                      onChange={(e) => handelChangeTransaction(e, index)}
                    />
                  </div>
                  <div className="w-[30%]">
                    <Select
                      label="Chargé d'etude"
                      name="responsibleBusiness"
                      value={item["responsibleBusiness"]}
                      placeholder="-- Sélectionner --"
                      options={allUsers}
                      onChange={(e) => handelChangeTransaction(e, index)}
                    />
                  </div>
                </div>

                <div className="flex gap-[20px] w-full">
                  <div className="w-[30%]">
                    <TextInput
                      label="Code affaire"
                      name="accountCode"
                      value={item["accountCode"]}
                      onChange={(e) => handelChangeTransaction(e, index)}
                    />
                  </div>
                  <div className="w-[30%]">
                    <Select
                      label="Contact(s) client(s)"
                      name="clientContact"
                      mode="multiple"
                      value={item["clientContact"]}
                      onChange={(e) => handelChangeTransaction(e, index)}
                      placeholder="-- Sélectionner --"
                      options={allStateForm?.folder?.customer?.customerContact?.map(
                        (item: any) => ({ label: item?.name, value: item?.id })
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-[20px] w-full">
                  <div className="w-[30%]">
                    <UploadFile
                      label="Pièce jointe"
                      name="attachmentFile"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-[30%]">
                    <InputNumber
                      label="Délais de livraison souhaité"
                      name="deliveryTime"
                      value={item["deliveryTime"]}
                      min={0}
                      onChange={(e) => handelChangeTransaction(e, index)}
                    />
                    {/* <DatePicker
                      label="Délais de livraison souhaité"
                      name="deliveryTime"
                      value={
                        item?.["deliveryTime"]
                          ? dayjs(item?.["deliveryTime"])
                          : ""
                      }
                      onChange={(e) => handelChangeTransaction(e, index)}
                    /> */}
                  </div>
                </div>

                <div className="flex gap-[20px] w-full">
                  <div className="w-[93.33%]">
                    <Textarea
                      label="Commentaire/Brief"
                      name="comments"
                      value={item["comments"]}
                      onChange={(e) => handelChangeTransaction(e, index)}
                      placeholder="Ecrire..."
                    />
                  </div>
                </div>

                <div className="flex gap-[20px] w-full">
                  <div className="w-[30%]">
                    <Select
                      label="Niveau de priorité"
                      name="priority"
                      value={item["priority"]}
                      onChange={(e) => handelChangeTransaction(e, index)}
                      options={[
                        {
                          label: (
                            <span className="flex justify-between">
                              Urgent {renderPriority("urgent")}
                            </span>
                          ),
                          value: "urgent",
                        },
                        {
                          label: (
                            <span className="flex justify-between">
                              Elevé {renderPriority("high")}
                            </span>
                          ),
                          value: "high",
                        },
                        {
                          label: (
                            <span className="flex justify-between">
                              Normal {renderPriority("normal")}
                            </span>
                          ),
                          value: "normal",
                        },
                        {
                          label: (
                            <span className="flex justify-between">
                              Basse {renderPriority("low")}
                            </span>
                          ),
                          value: "low",
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className="flex gap-[20px] w-full">
                  <div className="w-[30%]">
                    <DatePicker
                      label="Date limite devis"
                      name="quoteDeadline"
                      value={
                        item["quoteDeadline"]
                          ? dayjs(item["quoteDeadline"])
                          : ""
                      }
                      onChange={(e) => handelChangeTransaction(e, index)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code affaire  */}

        <div className="my-[20px]">
          <div
            className="bg-primary text-white w-[200px] py-[10px] rounded-[8px] flex justify-center items-center cursor-pointer"
            onClick={onIncrementBusinessCode}
          >
            {" "}
            Ajouter code affaire{" "}
          </div>
        </div>

        <div className="w-full flex justify-end gap-[20px] h-[40px]">
          <Button typeButton="secondary-rounded" onClick={handlePrev}>
            Précédent
          </Button>
          <Button typeButton="secondary-rounded" isTypeSubmit>
            {isLoading ? <Spinner /> : "Terminer"}
          </Button>
        </div>
      </FormCustom>
    </>
  );
};
