const host = 'http://localhost:8080/api/v1'
const mock = true;

type TiktokDownloadResponse = {
    url: URL | null;
};

type TiktokDownloadRequest = {
    tiktokShareUrl: URL;
};

export async function getTiktokDownloadUrl(url: TiktokDownloadRequest): Promise<TiktokDownloadResponse> {
    if (mock) {
        return (
            {url: URL.parse('http://localhost:8080/api/v1/tiktok/12321321')}
        )
    }
    const apiUrl = `${host}/api/v1/tiktok?url=${url.tiktokShareUrl}`;
    const response = await fetch(apiUrl);
    return (await response.json()) as TiktokDownloadResponse;
}