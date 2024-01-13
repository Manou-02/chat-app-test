export type Vehicle = {
    id?: number,
    registrationNumber: string,
    state: number,
    averageConsumption: number,
    firstCirculationAt: string,
    chassisNumber: string,
    hasTag: boolean,
    hasBuzzer: boolean,
    power: number,
    unloadedWeight: number,
    reservoirCapacity: number,
    reservoirOilCapacity: number,
    payload: number,
    utility: number,
    typeOfEngine: number,
    mileage: number,
    gender: string,
    vehicleBrand: {
        id: number,
        name: string
    },
    vehicleModel: {
        id: number,
        name: string
    },
    type: number
}