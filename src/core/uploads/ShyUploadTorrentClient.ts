import { AbstractShy } from '../helpers/AbstractShy'

export class ShyUploadTorrentClient extends AbstractShy {
  public async metadata(magnet: string) {
    return this.client.http
      .post<Shy.Responses.TorrentMetadata>('/torrents/metadata', { magnet })
      .then((res) => res.data)
      .then((metadata) => {
        this.client.events.emit('upload:torrent:metadata', metadata)

        return metadata
      })
  }

  public async upload(data: Shy.Upload.TorrentUploadProps) {
    return this.client.uploads.upload(data, 'upload:torrent')
  }
}
