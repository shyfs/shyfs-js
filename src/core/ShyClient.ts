import axios, { AxiosInstance } from 'axios'
import { ShyBotsClient } from './bots/ShyBotsClient'
import { ShyFilesClient } from './files/ShyFilesClient'
import { ShyFoldersClient } from './folders/ShyFoldersClient'
import { ShyOrganizationClient } from './organization/ShyOrganizationClient'
import { TypedEmitter } from 'tiny-typed-emitter'
import { ShyWs } from './websockets/ShyWs'
import { ShyUploadClient } from './uploads/ShyUploadClient'

export class ShyClient {
  public http: AxiosInstance

  public bots: ShyBotsClient

  public organization: ShyOrganizationClient

  public folders: ShyFoldersClient

  public files: ShyFilesClient

  public events: TypedEmitter<Shy.Events.GlobalEvents>

  public uploads: ShyUploadClient

  public io: ShyWs

  constructor(public url: string, private token: string) {
    this.http = axios.create({
      baseURL: this.url,
      params: {
        api_token: this.token
      }
    })

    this.events = new TypedEmitter()

    this.bots = new ShyBotsClient(this)
    this.organization = new ShyOrganizationClient(this)
    this.folders = new ShyFoldersClient(this)
    this.files = new ShyFilesClient(this)
    this.io = new ShyWs(this)
    this.uploads = new ShyUploadClient(this)

    this.settings()
    this.ws()
  }

  public async infos() {
    return this.http.get<Shy.ApiInfos>('/api-infos').then((res) => res.data)
  }

  public async query<T>(url: string, query: Shy.QueryString<T>) {
    return this.http
      .get<Shy.Pagination<T[]>>(url, { params: query })
      .then((res) => res.data)
  }

  private async ws() {
    if (this.io.isReady) return this.io

    await this.io.boot().then(() => {
      this.ready()
    })

    return this.io
  }

  private async settings() {
    this.organization.settings.setup().then(() => {
      this.ready()
    })
  }

  private ready() {
    if (this.io.isReady && this.organization.settings.isReady) {
      this.events.emit('ready')
    }
  }
}
