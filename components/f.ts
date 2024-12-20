export async function fetcher(url : URL | string, options: RequestInit | null = null ) {
  const
    response = options? await fetch(url, options) : await fetch(url);
  if (!response.ok) throw new Error('fetch' + response.status);
  return await response.json();
}