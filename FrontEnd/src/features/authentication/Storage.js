export const setlocalStorage = (data, token) => {
    localStorage.setItem("userdata", JSON.stringify(data));
    localStorage.setItem("token", JSON.stringify(token));
};
  
export const getLocalStorage = () => {
    let userdata, token;
    userdata = JSON.parse(localStorage.getItem("userdata"));
    token = JSON.parse(localStorage.getItem("token"));
    return { userdata, token };
};
  
export const clearLocalStorage = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("token");
};
  