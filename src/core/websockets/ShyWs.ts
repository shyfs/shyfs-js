import io, { Socket } from 'socket.io-client'
import { AbstractShy } from '../helpers/AbstractShy'
import { ShyClient } from '../ShyClient'

export class ShyWs extends AbstractShy {
  public socket: Socket

  public uri: string

  public isReady = false

  constructor(protected client: ShyClient) {
    super(client)

    this.uri = this.client.url.replace(/(http|https):\/\//g, 'ws://')
    this.socket = io(this.uri, {})
  }

  public async boot() {
    return new Promise<void>((resolve) => {
      this.socket.io.on('open', () => {
        this.isReady = true
        resolve()
      })

      this.socket.io.on('close', () => {
        this.socket.off()
      })

      this.socket.io.on('error', (err) => {
        console.error('[Shy][WebSocket][Error]', err)
      })
    })
  }
}
