// import Table from "@/widgets/components/table/Table";
// import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

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
export const CustomTable = () => {
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
  return (
    <div>
      {/* <p> CustomTable </p> */}
      {/* <Table data={data} columns={columns} /> */}
    </div>
  );
};
