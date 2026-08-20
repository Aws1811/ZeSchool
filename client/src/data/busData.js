export const busData = {
    default: {
        isRegistered: true,
        busNumber: "Bus 07",
        routeName: "Ramallah North Route",
        driverName: "Pending school assignment",
        status: "Mock location",
        statusTone: "blue",
        lastUpdated: "Just now",
        nextArrival: "07:35 AM",
        departureTime: "02:20 PM",
        pickupStop: "Friends School main gate",
        dropoffStop: "Friends School main gate",
        center: [31.9038, 35.2034],
        route: [
            [31.9091, 35.1988],
            [31.9063, 35.2011],
            [31.9038, 35.2034],
            [31.9002, 35.2058],
            [31.8968, 35.2085],
        ],
        busLocation: [31.9002, 35.2058],
        stops: [
            { name: "Al-Tireh stop", position: [31.9091, 35.1988] },
            { name: "Friends School", position: [31.9038, 35.2034] },
            { name: "Al-Irsal stop", position: [31.8968, 35.2085] },
        ],
    },
};

export function getBusDataForChild(child) {
    const data = busData[child?.name] || busData.default;
    return {
        ...data,
        isRegistered: child?.hasBus === false ? false : data.isRegistered,
    };
}
