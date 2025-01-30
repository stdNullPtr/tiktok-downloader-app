const host: string = import.meta.env.VITE_DOWNLOADER_API_HOST

type TiktokDownloadRequest = {
    url: URL;
};

export async function download(request: TiktokDownloadRequest): Promise<void> {
    const response = await fetch(`${host}/tiktok-downloader/api/v1/download`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        alert('Failed to download the video. Check the link and try again.');
        throw new Error('Failed to download the video.');
    }

    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'video.mp4';
    if (contentDisposition) {
        const match = RegExp(/filename="(.+)"/).exec(contentDisposition);
        if (match?.[1]) {
            filename = match[1];
        }
    }

    const videoBlob = await response.blob();

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(videoBlob);
    downloadLink.download = filename;
    downloadLink.style.display = 'none';

    document.body.appendChild(downloadLink);
    downloadLink.click(); // Trigger download
    document.body.removeChild(downloadLink); // Clean up
    URL.revokeObjectURL(downloadLink.href); // Free memory
}