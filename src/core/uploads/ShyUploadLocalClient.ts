import { AxiosRequestConfig } from 'axios'
import { AbstractShy } from '../helpers/AbstractShy'
import { FileChunk } from './helpers/FileChunk'

export class ShyUploadLocalClient extends AbstractShy {
  public async upload(
    data: Shy.Upload.LocalSendProps,
    axiosConfig?: AxiosRequestConfig
  ) {
    if (typeof window === 'undefined') {
      throw new Error(`Local upload only enabled on browsers`)
    }

    return this.client.uploads
      .upload(
        {
          from: 'local',
          local: {
            fileName: data.file.name,
            mimeType: data.file.type,
            size: data.file.size
          },
          folderItemId: data.folderItemId
        },
        'upload:local',
        axiosConfig
      )
      .then((file) => {
        this.uploadChunks(file, new FileChunk(data.file))

        return file
      })
  }

  public async uploadChunks(file: Shy.File, fileChunk: FileChunk) {
    await fileChunk.handle()

    for (const chunk of fileChunk.chunks) {
      await this.client.http.post(
        `/downloads/local/${file.uuid}/chunk`,
        chunk.formData()
      )
    }
  }
}
