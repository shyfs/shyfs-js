export namespace Shy {
  // MODULES
  interface Model {
    id: number
    created_at: Date
    updated_at: Date
  }

  export interface File extends Model {
    uuid: string
    size: number
    mime_type: string
    name: string
    original_name: string
    status: 'processing' | 'downloading' | 'uploading' | 'none' | 'error'
    metadata: FileMetadata
    hls_file_path: string
    downloaded_at: Date
    uploaded_at: Date
    file_download_id: number
    file_upload_id: number
    url: string
    upload: Shy.FileUpload
    folder_item_id: number
    download: Shy.FileDownload
    folder: Shy.Folder
  }

  export interface Folder extends Model {
    name: string
    folder_item_id: number
    files: Shy.File[]
    folders: Shy.Folder[]
    folder: Shy.Folder
    meta: {
      folders_count: number
      files_count: number
    }
  }

  export interface FileUpload extends Model {
    provider: 'discord'
    status: 'waiting' | 'uploading' | 'uploaded' | 'error'
    static_url: string
    cloud_id: string
    started_at: Date
    finished_at: Date
  }

  export interface FileDownload extends Model {
    reference: string
    provider: 'http' | 'torrent' | 'local'
    torrent_index: number
    status: 'downloading' | 'downloaded' | 'error'
    size: string
    path: string
    exists_in_server: 0 | 1
    started_at: Date
    finished_at: Date
  }

  export interface User extends Model {
    username: string
    avatar: string
    email: string
    remember_me_token: string
    role: 'admin' | 'user'
    organization_id: number
    organization: Shy.Organization
  }

  export interface Organization extends Model {
    name: string
    uuid: string
    avatar: string
    cover: string
    slug: string
    is_boot?: 0 | 1
    users: Shy.User[]
  }

  export interface DiscordBot extends Model {
    token: string
    metadata: {
      id: string
      tag: string
      avatar: string
      verified: boolean
      username: string
      guilds: Array<{
        id: string
        name: string
        avatar: string
        channels: Array<{
          id: string
          name: string
          type: string
        }>
      }>
    }
  }

  export interface ApiToken extends Model {
    organization_id: number
    token: string
    is_active: 1 | 0
  }

  export interface VideoStoryboard {
    url: string
    positions: Array<{
      x: number
      y: number
    }>
  }

  export interface VideoScreenshot {
    url: string
    width: number
    height: number
  }

  export interface FileMetadata {
    screenshots?: VideoScreenshot[]
    storyboard?: VideoStoryboard
    duration?: number
  }

  export interface SettingsHistory<T> {
    key: keyof T
    value: any
  }

  export type SettingOrganization = {
    VIDEO_HLS_TIME: number
    GENERATE_VIDEO_SCREENSHOT: boolean
    GENERATE_VIDEO_STORYBOARD: boolean
    ENABLES_TORRENT_DOWNLOAD: boolean
    ENABLES_HTTP_DOWNLOAD: boolean
    ENABLES_LOCAL_DOWNLOAD: boolean
    ENABLES_DISCORD_UPLOAD: boolean
    DISCORD_BOT_ID: string
    DISCORD_SERVER_ID: string
    DISCORD_CHANNEL_ID: string
  }

  export interface ApiInfos {
    url: string
    tokens: Shy.ApiToken[]
  }

  // EVENTS
  export namespace Events {
    export type GlobalEvents = {
      ready: () => void
      'upload:torrent:metadata': (metadata: Shy.Responses.TorrentMetadata) => void
      upload: (file: Shy.File) => void
      'upload:torrent': (file: Shy.File) => void
      'upload:http': (file: Shy.File) => void
      'upload:local': (file: Shy.File) => void
      'organization:bots:create': (bot: Shy.DiscordBot) => void
      'realtime:ready': () => void
      'organization:settings': (
        settings: Shy.SettingsHistory<Shy.SettingOrganization>[]
      ) => void
    }

    export interface RealtimeFileEvent {
      'download:start': () => void
      'download:finish': () => void
      'download:progress': (progress: FileItemProgress) => void
      'upload:start': () => void
      'upload:finish': () => void
      'upload:progress': (progress: FileItemProgress) => void
      status: (status: FileItemStatus) => void
    }

    export interface RealtimeOrganizationEvent {
      'new:file': (file: Shy.File) => void
    }

    interface FileItemWsEventsProps {
      uuid: string
      id: number
    }

    export interface FileItemProgress extends FileItemWsEventsProps {
      title?: string
      progress: number
    }

    export interface FileItemStatus extends FileItemWsEventsProps {
      status: Shy.File['status']
    }
  }

  // RESPONSES
  export namespace Responses {
    export type OrganizationSettingsResponse = Record<
      keyof Shy.SettingOrganization,
      any
    >

    export interface TorrentMetadata {
      name: string
      infoHash: string
      peers: number
      size: number
      files: Array<{
        name: string
        size: number
      }>
    }
  }

  // UPLOADS
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

  type StrictType = string | number

  export interface Pagination<T> {
    meta: {
      total: number
      per_page: number
      current_page: number
      last_page: number
      first_page: number
      first_page_url: string
      last_page_url: string
      next_page_url: string
      previous_page_url: string
    }
    data: T
  }

  export interface QueryString<T> {
    fields: (keyof T | '*')[]
    between?: Partial<Record<keyof T, StrictType[]>>
    limit?: number
    page?: number
    preload?: {
      [K in keyof T]?: T[K] extends Array<any>
        ? QueryString<T[K][0]>
        : QueryString<T[K]>
    }
    in?: Partial<Record<keyof T, StrictType[]>>
    notIn?: Partial<Record<keyof T, StrictType[]>>
    startsWith?: Partial<Record<keyof T, StrictType[]>>
    counters?: (keyof T)[]
    distincts?: (keyof T)[]
    null?: (keyof T)[]
    notNull?: (keyof T)[]
    endsWith?: Partial<Record<keyof T, StrictType[]>>
    order?: Partial<Record<keyof T, 'desc' | 'asc'>> &
      Partial<Record<string, 'desc' | 'asc'>>
    lt?: Partial<Record<keyof T, StrictType>>
    lte?: Partial<Record<keyof T, StrictType>>
    gt?: Partial<Record<keyof T, StrictType>>
    gte?: Partial<Record<keyof T, StrictType>>
  }
}
