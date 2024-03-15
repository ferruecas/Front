const getSex = async () => {
    const response = await fetch(`https://localhost:7048/api/Sexo`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const object = await response.json();
    return object;
};

const getRegion = async () => {
    const response = await fetch(`https://localhost:7048/api/Region`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const object = await response.json();
    return object;
};
const getCiudad = async () => {
    const response = await fetch(`https://localhost:7048/api/Ciudad`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const object = await response.json();
    return object;
};
const getComuna = async () => {
    const response = await fetch(`https://localhost:7048/api/Comuna`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const object = await response.json();
    return object;
};
export {

    getSex,
    getRegion,
    getCiudad,
    getComuna
    
};