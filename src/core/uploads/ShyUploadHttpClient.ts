import { Shy } from '../../contracts'
import { AbstractShy } from '../helpers/AbstractShy'

export class ShyUploadHttpClient extends AbstractShy {
  public upload(data: Shy.Upload.HttpUploadProps) {
    return this.client.uploads.upload(data, 'upload:http')
  }
}
