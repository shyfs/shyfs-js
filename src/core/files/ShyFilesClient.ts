import { Shy } from '../../contracts'
import { SingletonsContainer } from '../../helpers/SingletonsContainer'
import { AbstractShy } from '../helpers/AbstractShy'
import { ShyClient } from '../ShyClient'
import { ShyFileClient } from './ShyFileClient'

export class ShyFilesClient extends AbstractShy {
  public files: SingletonsContainer<ShyFileClient>

  constructor(protected client: ShyClient) {
    super(client)

    this.files = new SingletonsContainer()
  }

  public async get(query: Shy.QueryString<Shy.File>) {
    return this.client.query('/files', query)
  }

  public from(fileUUID: string) {
    return this.files.add(fileUUID, () => {
      return new ShyFileClient(this.client, fileUUID)
    })
  }
}
