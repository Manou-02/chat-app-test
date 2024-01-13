import { Button } from "@/shared/ui/button/Button";
import { TextInput } from "@/shared/ui/textInput/TextInput";
import styles from "./styles.module.scss";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { PasswordInput } from "@/shared/ui/passwordInput/PasswordInput";
import { DatePicker } from "@/shared/ui/datePicker/DatePicker";
import { RangePicker } from "@/shared/ui/range/RangePicker";
import Switch from "@/shared/ui/switch/Switch";
// import Table from "@/shared/ui/table/Table";
// import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Modal from "./components/Modal";
import { DrawerComponent } from "./components/drawer/DrawerComponent";
import { InputNumber } from "@/shared/ui/inputNumber/InputNumber";
import { InputMoney } from "@/shared/ui/inputMoney/InputMoney";
import { Toast } from "@/shared/components/toast/ToastHelper";
// import { CustomTable } from "./components/table/CustomTable";

// type Person = {
//   id: number;
//   email: string;
//   name: string;
// };

// type Product = {
//   id: number;
//   price: number;
//   desc: string;
// };

export const StyleGuides = () => {
  const [form] = Form.useForm();
  const [initialAmount, setInitialAmount] = useState<number>(30000);
  const [changed, setChanged] = useState<boolean>(false);
  useEffect(() => {
    form.setFieldsValue({
      text: "efa ato e",
    });
  }, [changed]);
  useEffect(() => {
    setChanged(true);
  }, []);

  const handleClickButton = () => {
    // console.log("Click");
  };

  const handleChangeMoney = (e: any) => {
    // console.log(+Object.values(e)[0]);
    setInitialAmount(+(Object.values(e) as any)[0]);
  };
  const handleChange = (e: any) => {
    console.log(e);

    form.setFieldsValue({ [Object.keys(e)[0]]: Object.values(e)[0] });
  };

  const handleSubmitForm = () => {
    console.log(form.getFieldsValue());
  };

  // const data: Person[] = [
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //   },
  // ];

  // const data1: Product[] = [
  //   {
  //     id: 1,
  //     price: 500,
  //     desc: "prod ds,dlef",
  //   },
  //   {
  //     id: 2,
  //     price: 5555,
  //     desc: "jjjj jjjjjjjjjj",
  //   },
  // ];
  // const columnHelperPerson = createColumnHelper<Person>();
  // const columnHelperProduct = createColumnHelper<Product>();
  // const columns: ColumnDef<Person, any>[] = [
  //   columnHelperPerson.accessor("id", {
  //     header: () => <span>Numero</span>,
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnHelperPerson.accessor("name", {
  //     header: () => <span>Name</span>,
  //     cell: (info) => info.row.original?.name,
  //   }),
  //   columnHelperPerson.accessor("email", {
  //     header: () => <span>Email</span>,
  //     cell: (info) => info.row.original.email,
  //   }),
  // ];

  // const columns1: ColumnDef<Product>[] = [
  //   {
  //     id: "id",
  //     header: "Id",
  //     accessorKey: "id",

  //     cell: (ctx) => ctx.getValue(),
  //   },
  //   {
  //     id: "price",
  //     header: "Name",
  //     accessorKey: "price",
  //     cell: (ctx) => ctx.getValue(),
  //   },
  //   {
  //     id: "desc",
  //     header: "desc",
  //     cell: (ctx) => {
  //       const { desc } = ctx.row.original;
  //       return <span className="font-bold">{desc}</span>;
  //     },
  //   },
  // ];

  // const sizeData = useMemo(() => {
  //   return data.length;
  // }, [data]);

  const handleSwitch = (e: any) => {
    console.log("Event\n", e);
  };

  const notify = () => {
    Toast.success("Toast success");
  };

  return (
    <>
      <div>
        <h3>StylesGuides</h3>
        <hr />
      </div>

      <div className={styles.styles_guide__container}>
        {/* Buttons  */}

        <div className="">
          <p>Button</p>
          <div className="my-[10px]">
            <Button onClick={handleClickButton}>Primary</Button>
          </div>
          <div className="my-[10px]">
            <Button onClick={handleClickButton} typeButton="primary-rounded">
              Primary rounded
            </Button>
          </div>
          <div className="my-[10px]">
            <Button onClick={handleClickButton} typeButton="secondary">
              Secondary
            </Button>
          </div>
          <div className="my-[10px]">
            <Button onClick={handleClickButton} typeButton="secondary-rounded">
              Secondary Rounded
            </Button>
          </div>
          <div className="my-[10px]">
            <Button onClick={handleClickButton} typeButton="dark">
              Dark
            </Button>
          </div>

          <div className="my-[10px]">
            <Button onClick={handleClickButton} typeButton="dark-rounded">
              Dark rounded
            </Button>
          </div>

          <div className="my-[10px]">
            <Button onClick={handleClickButton} typeButton="dark-transparent">
              Dark- trasparent
            </Button>
          </div>

          <div className="my-[10px]">
            <Button
              onClick={handleClickButton}
              typeButton="dark-transparent-rounded"
            >
              Dark- trasparent rounded
            </Button>
          </div>
        </div>

        {/* Inputs  */}

        <div className="">
          <p>Input Form</p>
          <Form
            className=""
            form={form}
            // initialValues={{
            //   zaza: "zaza",
            // }}
            onFinish={handleSubmitForm}
          >
            <TextInput
              label="TextField"
              required
              name="text"
              // errorMessage="zaza"
              value={form.getFieldValue("text")}
              onChange={handleChange}
            />
            {/* <TextInput
              label="zaza"
              required
              name="zaza"
              // errorMessage="zaza"
              //value={form.getFieldValue("zaza")}
              // value={"fffff"}
              //onChange={handleChange}
            /> */}
            <PasswordInput
              label="Password"
              name="password"
              required
              value={form.getFieldValue("password")}
              onChange={handleChange}
            />
            <DatePicker name="date" label="Date" onChange={handleChange} />
            <RangePicker
              name="range"
              label="Range picker"
              onChange={handleChange}
            />
            <Switch
              label="switch"
              name="switch"
              checkedText="OUI"
              uncheckedText="NON"
              onChange={handleSwitch}
            />
            <InputNumber
              label="Input Number"
              name="inputNumber"
              onChange={handleChange}
            />
            <InputMoney
              label="Input money"
              name="money"
              value={initialAmount}
              onChange={handleChangeMoney}
            />
            <Button isTypeSubmit onClick={handleSubmitForm}>
              Submit
            </Button>
          </Form>
        </div>

        {/* End Inputs  */}

        {/* The manual of the component modal is in this Component  */}
        <Modal />

        {/* The manual of the Drawer component is in the component Below  */}
        <DrawerComponent />

        {/* Custom table is in the code below  */}
        {/* <CustomTable /> */}
        <Button onClick={notify}>Toast</Button>

        {/* <div>
          <div>
            <h2>Liste personne </h2>
            <Table data={data} columns={columns} />
          </div>
          <div>
            <h2>Liste produit</h2>
            <Table data={data1} columns={columns1} />
          </div>
        </div> */}
      </div>
    </>
  );
};
