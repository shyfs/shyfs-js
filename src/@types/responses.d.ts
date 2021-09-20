declare namespace Shy {
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
}
