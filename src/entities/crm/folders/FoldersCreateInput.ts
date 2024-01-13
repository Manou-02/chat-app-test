export type FoldersCreateInput = {
    customer: string,
    projectHolder: string,
    priority: "urgent" | "eleve" | "normal",
    beginDate: string,
    deliverydate: string,
    comment: string,
    name: string,
    state?: "study" | "negociation" | "construction" | "finalized"
    // folder: {
    //     id: number;
    //     name: string;
    // },
    // affair: {
    //     id: number; 
    //     code: string;
    // },
    // customer: {
    //     id: number;
    //     refCustomer: string;
    // },
    // department: {
    //     id: number;
    //     name: string;
    // },
    // priority: "urgent" | "eleve" | "normal",
    // deliveryDate: "string",
    // state: "study" | "negociation" | "construction" | "finalized"
}