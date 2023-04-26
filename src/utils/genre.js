import { API_BASE_URL } from "./Api";

export async function getGenre() {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const randomString = Math.random().toString(36).substring(7);
  const geturl = `${API_BASE_URL}/categories?token=${token}&${randomString}`;
  const getRes = await fetch(geturl);
  const genre = await getRes.json();
  return genre;
}
