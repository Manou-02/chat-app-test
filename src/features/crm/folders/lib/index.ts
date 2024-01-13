import { RootState } from "@/app/appStore";
import { useAppSelector } from "@/app/hooks/app.hooks";
import { Folder } from "@/entities/crm/folders/Folders";

export const useFoldersData = () => useAppSelector((state: RootState) => state?.foldersReducers?.response?.data || []);
export const useFoldersIsLoading = () => useAppSelector((state: RootState) => state?.foldersReducers?.isLoading);
export const useFoldersPagination = () => useAppSelector((state: RootState) => state?.foldersReducers?.response?.pagination);
export const useFoldersRequests = () => useAppSelector((state: RootState) => state?.foldersReducers?.request || {
    page: 1,
    itemsPerPage: 10
});

export const usefoldersFakeData = () =>
    [{
        id: 1,
        folder: {
            id: 1,
            name: "Pose clim",
            assign: {
                id: 1,
                name: "John Doe",
            }
        },
        affair: [{
            id: 1,
            code: "CA892",
        }],
        customer: {
            id: 1,
            refCustomer: "First IMMO",
        },
        department: [{
            id: 1,
            name: "Solaire",
        },
        {
            id: 2,
            name: "chauffage",
        }],
        priority: "urgent",
        deliveryDate: "2023-12-01",
        startDate: "2023-11-01",
        state: "study",
        comment: "comment 1"
    },
    {
        id: 2,
        folder: {
            id: 1,
            name: "Batiment B",
            assign: {
                id: 2,
                name: "David",
            }
        },
        affair: [{
            id: 1,
            code: "CA892",
        },
        {
            id: 1,
            code: "CA889",
        }],
        customer: {
            id: 2,
            refCustomer: "Jean",
        },
        department: [{
            id: 2,
            name: "electricite MT",
        },
        {
            id: 3,
            name: "climatisation",
        }],
        priority: "normal",
        deliveryDate: "2023-12-01",
        state: "negociation",
        comment: "comment 2"
    },
    {
        id: 3,
        folder: {
            id: 1,
            name: "Pose clim",
            assign: {
                id: 3,
                name: "John Doe",
            }
        },
        affair: [{
            id: 1,
            code: "CA892",
        }],
        customer: {
            id: 1,
            refCustomer: "First IMMO",
        },
        department: [{
            id: 1,
            name: "Solaire",
        },
        {
            id: 2,
            name: "chauffage",
        }],
        priority: "high",
        deliveryDate: "2023-12-01",
        startDate: "2023-11-01",
        state: "construction",
        comment: "comment 3"
    },
    {
        id: 4,
        folder: {
            id: 1,
            name: "Batiment B",
            assign: {
                id: 4,
                name: "David",
            }
        },
        affair: [{
            id: 1,
            code: "CA892",
        },
        {
            id: 1,
            code: "CA889",
        }],
        customer: {
            id: 2,
            refCustomer: "Jean",
        },
        department: [{
            id: 2,
            name: "electricite MT",
        },
        {
            id: 3,
            name: "climatisation",
        }],
        priority: "urgent",
        deliveryDate: "2023-12-01",
        startDate: "2023-11-01",
        state: "finalized",
        comment: "comment 4"
    }
    ] as unknown as Folder[]