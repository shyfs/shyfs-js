declare namespace Shy {
  export namespace Upload {
    interface UploadProps {
      from: 'torrent' | 'http' | 'local'
      path?: string
      folderItemId?: number
    }

    export interface TorrentUploadProps extends UploadProps {
      torrent: {
        magnet: string
        index: number
      }
    }

    export interface LocalSendProps extends UploadProps {
      file: globalThis.File
    }

    export interface LocalUploadProps extends UploadProps {
      local: {
        mimeType: string
        size: number
        fileName: string
      }
    }

    export interface HttpUploadProps extends UploadProps {
      http: {
        url: string
        headers: Record<string, string>
      }
    }
  }
}
