import io, { Socket } from 'socket.io-client'
import { TypedEmitter } from 'tiny-typed-emitter'
import { Shy } from '../..'
import { AbstractShy } from '../helpers/AbstractShy'
import { ShyClient } from '../ShyClient'

export class ShyWs extends AbstractShy {
  public socket: Socket

  public uri: string

  public isReady = false

  public events: TypedEmitter<Shy.Events.RealtimeOrganizationEvent>

  private eventsNames: (keyof Shy.Events.RealtimeOrganizationEvent)[] = ['new:file']

  constructor(protected client: ShyClient) {
    super(client)

    // this.uri = this.client.url.replace(/(http|https):\/\//g, 'ws://')
    this.uri = this.client.url
    this.socket = io(this.uri, {})
    this.events = new TypedEmitter()
  }

  public async boot() {
    return new Promise<void>((resolve) => {
      this.socket.io.on('open', () => {
        this.isReady = true
        this.addEventsPipers()
        resolve()
      })

      this.socket.io.on('close', () => {
        this.socket.off()
      })

      this.socket.io.on('error', (err) => {
        this.socket.off()
        console.error('[Shy][WebSocket][Error]', err)
      })
    })
  }

  private addEventsPipers() {
    const pipe = (eventName: keyof Shy.Events.RealtimeOrganizationEvent) => {
      this.socket.on(eventName, (args) => {
        this.events.emit(eventName, args)
      })
    }

    for (const eventName of this.eventsNames) {
      pipe(eventName)
    }
  }
}
