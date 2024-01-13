export type Folder = {
    id: number,
    customer: {
        id: number,
        customerIdentification: {
            thirdParties: string,
            customerTitle: string
        }
    },
    projectHolder: {
        id: number,
        firstname: string,
        lastname: string,
        isInterlocutor: boolean,
        imageProfile?: string
    },
    priority: "urgent" | "high" | "normal" | "low",
    beginDate: string,
    deliverydate: string,
    comment: string,
    refFolder: string,
    name: string,
    folderTransactions: [],
    status?: "study" | "negociation" | "construction" | "finalized"
}