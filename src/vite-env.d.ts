/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_DOWNLOADER_API_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}