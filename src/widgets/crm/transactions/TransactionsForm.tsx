// import { AppDispatch } from "@/app/appStore";
import { FC, useEffect, useState } from "react";
import { FolderForm } from "./components/FolderForm";
import { Transactions } from "./components/Transactions";
import { Loader } from "@/shared/ui/loader/Loader";
import { Steps } from "../../components/steps/Steps";
import { AppDispatch, store } from "@/app/appStore";
import { useDispatch } from "react-redux";
import { resetTransactionForm } from "@/features/crm/transactions/reducers/TransactionForm.reducers";
import dayjs from "dayjs";
import { TransactionServices } from "@/features/crm/transactions/services/Transactions.services";
import { HttpStatus } from "@/shared/config/Status";
import { Toast } from "@/shared/components/toast/ToastHelper";
import { ActionReducer } from "@/shared/reducers/drawer/drawer.action";

type PropsType = {
  selected: any;
  handleSuccess: () => void;
};
export const TransactionsForm: FC<PropsType> = ({ handleSuccess }) => {
  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    return () => {
      dispatch(resetTransactionForm());
    };
  }, []);

  const handleNext = () => {
    setCurrent((prev: number) => (prev += 1));
  };

  const handlePrev = () => {
    setCurrent((prev: number) => (prev -= 1));
  };

  const handleFinish = async () => {
    const allStateForm = (store?.getState() as any)?.transactionFormReducer
      ?.transactionForm;

    try {
      setIsLoading(true);
      const dataToPost = {
        ...allStateForm,
        folder: `/folders/${allStateForm?.folder?.id}`,
        transactions: allStateForm?.transactions?.length
          ? allStateForm?.transactions?.map((item: any) => ({
              ...item,
              quoteDeadline: item?.quoteDeadline
                ? dayjs(item?.quoteDeadline).format("YYYY-MM-DD")
                : null,
              department: item?.department?.value
                ? `/departments/${item?.department?.value}`
                : null,
              responsibleBusiness: item?.responsibleBusiness?.value
                ? `/users/${item?.responsibleBusiness?.value}`
                : null,
              clientContact: item?.clientContact?.length
                ? item?.clientContact?.map(
                    (cc: any) => `/customer_contacts/${cc?.value}`
                  )
                : [],
              priority: item?.priority ? item?.priority?.value : null,
            }))
          : null,
      };

      const { data, status } = await TransactionServices.createTransactions(
        dataToPost
      );
      if (status === HttpStatus.CREATED) {
        handleSuccess();
        Toast.success("Ajouter avec succès");
        dispatch(ActionReducer.setShowDrawer(false));
        dispatch(resetTransactionForm());
      } else {
        Toast.error(
          data?.status?.message ||
            "Une erreur s'est produite, veuillez réessayer."
        );
      }
      console.log(">>>>>\n", dataToPost);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [data] = useState<any>([
    {
      key: 0,
      title: "Sélection dossier",
      content: <FolderForm onNext={handleNext} />,
    },
    {
      key: 1,
      title: "Transactions",
      content: (
        <Transactions
          isLoading={isLoading}
          handleFinish={handleFinish}
          handlePrev={handlePrev}
        />
      ),
    },
  ]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Steps activeKey={current} data={data} />
    </>
  );
};
