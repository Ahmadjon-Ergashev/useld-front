export const fetchApi = async (url, data) => {
  try {
    const res = await fetch(`https://api.useldservice.com/${url}`, data);
    return res.ok ? res : res;
  } catch ({ message }) { 
    return message;
  }
};
