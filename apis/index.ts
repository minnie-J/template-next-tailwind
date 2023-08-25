const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const listMain = () =>
  fetch(`${API_BASE_URL}/mains`)
    .then((res) => res.json())
    .catch((error) => console.log("error: ", error));

export const listSub1 = ({ id }: { id: string }) =>
  fetch(`${API_BASE_URL}/mains/${id}/subs1`)
    .then((res) => res.json())
    .catch((error) => console.log("error: ", error));

export const listSub2 = ({ id }: { id: string }) =>
  fetch(`${API_BASE_URL}/mains/${id}/subs2`)
    .then((res) => res.json())
    .catch((error) => console.log("error: ", error));
