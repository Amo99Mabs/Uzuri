const BASE_URL = 'http://localhost:5004/api/products';
export const getProducts = async () => {
    const res = await fetch(BASE_URL);
    return res.json();
};
export const createProduct =  async (payload) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringifly(payload),
    });
    return res.json();
};
export const updateProduct = async (id, payload) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
};
export const deleteProduct = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`{
        method: 'DELETE'
    });
    return res.json();
};