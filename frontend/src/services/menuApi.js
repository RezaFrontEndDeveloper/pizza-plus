export async function getMenu() {
    const res = await fetch("http://localhost:8000/api/menu");
    if (!res.ok) throw new Error("error in fetching data");

    const data = res.json();
    return data;
}
