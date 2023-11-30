const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const listMain = () =>
  fetch(`${API_BASE_URL}/mains`)
    .then((res) => res.json())
    .catch((error) => console.log("error: ", error));

export const listSub = ({ id, tab }: { id?: string; tab: string }) => {
  const cat = tab === "sub1" ? "subs1" : "subs2";

  return fetch(`${API_BASE_URL}/mains/${id}/${cat}`)
    .then((res) => res.json())
    .catch((error) => console.log("error: ", error));
};
