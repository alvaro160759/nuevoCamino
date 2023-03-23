
const url_api= import.meta.env.VITE_URL_API;

export const sincronizeMaquinaria= async () => {
    const formData = new FormData();
    formData.append('empresa', '001');
    formData.append('modelo', 'Maquinaria');
    formData.append('metodo', 'sincronizarDatos'); 
    
    return fetch(url_api, {
      body: formData,
      method: "POST"})
      .then(res =>res.json())
      .catch((e) => {      
        console.log(e)
      })  
};