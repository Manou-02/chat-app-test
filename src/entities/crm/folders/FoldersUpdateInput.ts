export type FoldersUpdateInput = () => {
    customer: string,
    projectHolder: string,
    priority: "urgent" | "high" | "normal" | "low",
    beginDate: string,
    deliverydate: string,
    comment: string,
    name: string,
    state?: "study" | "negociation" | "construction" | "finalized"
}