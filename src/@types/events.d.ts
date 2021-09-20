declare namespace Shy {
  export namespace Events {
    export type GlobalEvents = {
      ready: () => void
      'upload:torrent:metadata': (metadata: Shy.Api.TorrentMetadata) => void
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
      'download:progress': (progress: FileItemProgress) => void
      'upload:progress': (progress: FileItemProgress) => void
      status: (status: FileItemStatus) => void
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
}
