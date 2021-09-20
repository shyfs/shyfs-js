import { AxiosRequestConfig } from 'axios'
import { Shy } from '../../contracts'
import { AbstractShy } from '../helpers/AbstractShy'
import { ShyUploadHttpClient } from './ShyUploadHttpClient'
import { ShyUploadLocalClient } from './ShyUploadLocalClient'
import { ShyUploadTorrentClient } from './ShyUploadTorrentClient'

export class ShyUploadClient extends AbstractShy {
  public torrent() {
    return new ShyUploadTorrentClient(this.client)
  }

  public http() {
    return new ShyUploadHttpClient(this.client)
  }

  public local() {
    return new ShyUploadLocalClient(this.client)
  }

  public async upload(
    data:
      | Shy.Upload.TorrentUploadProps
      | Shy.Upload.HttpUploadProps
      | Shy.Upload.LocalUploadProps,
    eventName: 'upload:torrent' | 'upload:http' | 'upload:local',
    axiosConfig?: AxiosRequestConfig
  ) {
    return this.client.http
      .post<Shy.File>(`/downloads/${data.from}`, data, axiosConfig)
      .then((res) => res.data)
      .then((file) => {
        this.client.events.emit(eventName, file)
        this.client.events.emit('upload', file)

        return file
      })
  }
}
