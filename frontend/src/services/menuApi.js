import baseUrl from './baseUrl';

export async function getMenu() {
    const res = await fetch(`${baseUrl}/api/menu`);
    if (!res.ok) throw new Error('error in fetching data');

    const data = await res.json();
    return data;
}
