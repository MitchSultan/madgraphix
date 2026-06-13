export async function getData() {
    const response = await fetch('https://dummyjson.com/posts');
    const data = await response.json();
    return data.posts;
}