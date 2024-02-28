export const fetchApi = async (url, data) => {
  try {
    // const res1 = fetch("http://127.0.0.1:8000/banners/")
    // .then((res) => res.json());
    // console.log(res1);
    const res = await fetch(`https://ahmadjonergashev.pythonanywhere.com/${url}`, data);
    // const res = await fetch(`http://localhost:5001/${url}`, data);
    return res.ok ? res : res;
  } catch ({ message }) { 
    return message;
  }
};
