import {  url_comun } from "../Config/Variables";

const getSex = async () => {
    const response = await fetch(`${url_comun}Sexo`, {
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
    const response = await fetch(`${url_comun}Region`, {
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
    const response = await fetch(`${url_comun}Ciudad`, {
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
    const response = await fetch(`${url_comun}Comuna`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const object = await response.json();
    return object;
};
const getPersona = async () => {
    const response = await fetch(`${url_comun}Persona`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    const object = await response.json();
    return object;
};

const deletePersona = async (id) => {
    
    const response = await fetch(`${url_comun}Persona/`+id, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
   
    const object = await response.json();
    return object;
};

const putPersona = async (id,data) => {
    
    const response = await fetch(`${url_comun}Persona/`+id, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
   
    const object = await response.json();
    return object;
};

const postPersona = async (data) => {
    debugger
    const response = await fetch(`${url_comun}Persona`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
   
    const object = await response.json();
    return object;
};
export {
    postPersona,
    getPersona,
    getSex,
    getRegion,
    getCiudad,
    getComuna,
    deletePersona,
    putPersona

};