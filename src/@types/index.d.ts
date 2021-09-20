declare namespace Shy {
  interface Model {
    id: number
    created_at: Date
    updated_at: Date
  }

  export interface File extends Shy.Model {
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

  export interface Folder extends Shy.Model {
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

  export interface FileUpload extends Shy.Model {
    provider: 'discord'
    status: 'waiting' | 'uploading' | 'uploaded' | 'error'
    static_url: string
    cloud_id: string
    started_at: Date
    finished_at: Date
  }

  export interface FileDownload extends Shy.Model {
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

  export interface User extends Shy.Model {
    username: string
    avatar: string
    email: string
    remember_me_token: string
    role: 'admin' | 'user'
    organization_id: number
    organization: Shy.Organization
  }

  export interface Organization extends Shy.Model {
    name: string
    uuid: string
    avatar: string
    cover: string
    slug: string
    is_boot?: 0 | 1
    users: Shy.User[]
  }

  export interface DiscordBot extends Shy.Model {
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

  export interface ApiToken extends Shy.Model {
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
}
