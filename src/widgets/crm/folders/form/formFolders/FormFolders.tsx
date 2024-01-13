import { Button } from "@/shared/ui/button/Button";
import { DatePicker } from "@/shared/ui/datePicker/DatePicker";
import Select from "@/shared/ui/select/Select";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import { Textarea } from "@/shared/ui/textarea/Textarea";
import { Avatar, Divider, Form } from "antd";
import { FC, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AppDispatch, store, useDispatch } from "@/app/appStore";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";
import { ClientsServices } from "@/features/clients/services/Clients.services";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { UsersServices } from "@/features/users/services/Users.services";
import { useUsersRequests } from "@/features/users/lib";
import { renderPriority } from "@/shared/utils/flag";
import { Loader } from "@/shared/ui/loader/Loader";
import { FormCustom } from "@/shared/ui/form/Form";
import dayjs from "dayjs";

interface IFormFolders {
  handleSubmit: (e: any, handleReset: () => void) => void;
}

export const FormFolders: FC<IFormFolders> = ({ handleSubmit }) => {
  const [form] = Form.useForm();
  const [folder, setFolder] = useState<any>();
  const dispatch: AppDispatch = useDispatch();
  const usersRequests = useUsersRequests();

  const [allCustomer, setAllCustomer] = useState<any[]>();
  const [allUser, setUser] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selected] = useState<any>(
    (store.getState() as any)?.tableReducer?.selected
  );

  useEffect(() => {
    if (selected) {
      setFolder({
        ...selected,
        beginDate: dayjs(selected?.beginDate),
        deliverydate: dayjs(selected?.deliverydate),
        customer: selected?.customer?.id
          ? {
              label: selected?.customer?.customerIdentification?.customerTitle,
              value: selected?.customer?.id,
            }
          : null,
        projectHolder: {
          label: (
            <div className="m-[4px]">
              <Avatar icon={<FaUserCircle size="small" />} />
              <span className="ml-[12px]">{`${selected?.projectHolder?.firstname} ${selected?.projectHolder?.lastname}`}</span>
            </div>
          ),
          value: selected?.projectHolder?.id,
        },
        priority: {
          label: handleSwithcPriorityLabel(selected?.priority),
          value: selected?.priority,
        },
      });
    }
  }, [selected]);

  useEffect(() => {
    form.setFieldsValue(folder);
  }, [folder]);

  useEffect(() => {
    getAllCustomers();
    getAllUsers();
  }, []);

  const handleChange = (e: any) => {
    setFolder((prev: any) => ({ ...prev, ...e }));
  };

  const getAllCustomers = async () => {
    try {
      setIsLoading(true);
      const { status, data } = await ClientsServices.getAllClients({});
      if (status === HttpStatus.OK) {
        setAllCustomer(data?.data);
      } else {
        Toast.error("Une erreur s'est produite, veuillez réessayer");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const { status, data } = await UsersServices.getAllUsers(usersRequests);
      if (status === HttpStatus.OK) {
        setUser(data?.data);
      } else {
        Toast.error("Une erreur s'est produite, veuillez réessayer");
      }
    } catch (error) {
      console.log(error);
      // Toast.error("Une erreur s'est produite, veuillez réessayer");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwithcPriorityLabel = (
    type: "urgent" | "high" | "normal" | "low"
  ) => {
    switch (type) {
      case "urgent":
        <span className="flex justify-between">
          Urgent {renderPriority("urgent")}
        </span>;
        break;
      case "high":
        <span className="flex justify-between">
          Elevé {renderPriority("high")}
        </span>;
        break;
      case "normal":
        <span className="flex justify-between">
          Normal {renderPriority("normal")}
        </span>;
        break;
      case "low":
        <span className="flex justify-between">
          Basse {renderPriority("low")}
        </span>;
        break;

      default:
        break;
    }
  };

  const handleReset = () => {
    setFolder({});
  };

  const onSumitHandler = () => {
    handleSubmit(folder, handleReset);
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <FormCustom
        form={form}
        onSubmit={onSumitHandler}
        className="my-[50px] flex flex-col gap-[20px]"
      >
        <div className="flex flex-wrap w-full justify-between">
          <div className="w-[30%]">
            <Select
              name="customer"
              label="Client"
              required
              placeholder="-- Sélectionner --"
              value={folder?.customer}
              options={allCustomer?.map((customer: any) => ({
                label: customer?.customerIdentification?.customerTitle,
                value: customer?.id,
              }))}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <TextInput
              label="Nom du dossier"
              name="name"
              required
              value={folder?.name}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <Select
              label="Porteur de projet"
              placeholder="-- Sélectionner --"
              name="projectHolder"
              required
              value={folder?.projectHolder}
              options={allUser?.map((user: any) => ({
                label: (
                  <div className="m-[4px]">
                    <Avatar icon={<FaUserCircle size="small" />} />
                    <span className="ml-[12px]">{`${user?.firstname} ${user?.lastname}`}</span>
                  </div>
                ),
                value: user?.id,
              }))}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <Select
              name="priority"
              label="Priorite"
              placeholder="-- Sélectionner --"
              required
              value={folder?.priority}
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
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <DatePicker
              label="Date de commencement"
              name="beginDate"
              required
              value={folder?.beginDate}
              onChange={handleChange}
            />
          </div>
          <div className="w-[30%]">
            <DatePicker
              label="Date de livraison"
              name="deliverydate"
              required
              value={folder?.deliverydate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex w-full">
          <Textarea
            placeholder="ecrire"
            label="Commmentaire"
            name="comment"
            value={folder?.comment}
            onChange={handleChange}
          />
        </div>
        <Divider />
        <div className="flex justify-end gap-[10px] h-[40px]">
          <Button
            typeButton="secondary"
            onClick={() => dispatch(ActionReducer.setShowDrawer(false))}
          >
            Annuler
          </Button>
          <Button isTypeSubmit>Enregistrer</Button>
        </div>
      </FormCustom>
    </>
  );
};
