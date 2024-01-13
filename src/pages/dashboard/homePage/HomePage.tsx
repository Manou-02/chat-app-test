// import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
// import Table from "@/widgets/components/table/Table";
// import { useEffect } from "react";
// import { Http } from "@/features/http/repository/http";
// import { Loader } from "@/shared/ui/loader/Loader";

// type Person = {
//   id: number;
//   email: string;
//   name: string;
//   contact?: {
//     type: string;
//     content: string;
//   };
// };

// type Product = {
//   id: number;
//   price: number;
//   desc: string;
// };
export const HomePage = () => {
  // const data: Person[] = [
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721335",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721384",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721336",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721337",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721335",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721384",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721336",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721337",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721335",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721384",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721336",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721337",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721335",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721384",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721336",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721337",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721335",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721384",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721336",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721337",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721335",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721384",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721336",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721337",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721335",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721384",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721336",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721337",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721335",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721384",
  //     },
  //   },
  //   {
  //     id: 1,
  //     name: "manou",
  //     email: "manou@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721336",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Onja",
  //     email: "daonja@gmail.com",
  //     contact: {
  //       type: "Phone",
  //       content: "+2465721337",
  //     },
  //   },
  // ];
  //   const columns1: ColumnDef<Product>[] = [
  //     {
  //       id: "id",
  //       header: "Id",
  //       accessorKey: "id",

  //       cell: (ctx) => ctx.getValue(),
  //     },
  //     {
  //       id: "price",
  //       header: "Name",
  //       accessorKey: "price",
  //       cell: (ctx) => ctx.getValue(),
  //     },
  //     {
  //       id: "desc",
  //       header: "desc",
  //       cell: (ctx) => {
  //         const { desc } = ctx.row.original;
  //         return <span className="font-bold">{desc}</span>;
  //       },
  //     },
  //   ];
  //   const data1: Product[] = [
  //     {
  //       id: 1,
  //       price: 500,
  //       desc: "prod ds,dlef",
  //     },
  //     {
  //       id: 2,
  //       price: 5555,
  //       desc: "jjjj jjjjjjjjjj",
  //     },
  //   ];

  // const columnHelperPerson = createColumnHelper<Person>();
  //   const columnHelperProduct = createColumnHelper<Product>();
  // const columns: ColumnDef<Person, any>[] = [
  //   columnHelperPerson.accessor("id", {
  //     header: () => <span>Numero</span>,
  //     cell: (props) => props.getValue(),
  //     enableColumnFilter: true,
  //     enableSorting: true,
  //     // enableHiding: true,
  //   }),
  //   columnHelperPerson.accessor("name", {
  //     header: () => <span>Name</span>,
  //     cell: (props) => props.getValue().toUpperCase(),
  //     enableColumnFilter: true,
  //     enableSorting: true,
  //     enableHiding: true,
  //   }),
  //   columnHelperPerson.accessor("email", {
  //     header: () => <span>Email</span>,
  //     cell: (props) => (
  //       <span>
  //         {" "}
  //         {`${props.row.original?.id} - ${props.row.original.email}`}{" "}
  //       </span>
  //     ),
  //     enableColumnFilter: false,
  //     enableSorting: false,
  //     enableHiding: true,
  //   }),
  //   columnHelperPerson.accessor("contact.content", {
  //     header: () => <span>Phone</span>,
  //     cell: (props) => props.getValue().toUpperCase(),

  //     enableColumnFilter: false,
  //     enableSorting: false,
  //     // enableHiding: true,
  //   }),
  // ];
  return (
    <div>
      <p className="my-[30px]"> Test table - react table </p>
      {/* <Loader isLoading={true} /> */}
      {/* <Table
        data={data}
        columns={columns}
        isCanHiddenColumn
        onSearch={(e: any) => console.log(e)}
        onFilter={(e: any) => console.log(e)}
        addFormContent={
          <div>
            <p>Add form content </p>
          </div>
        }

        // onSearchByColumn={(e : any) => console.log()}
      /> */}
    </div>
  );
};
