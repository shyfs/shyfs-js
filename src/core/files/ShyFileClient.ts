import { TypedEmitter } from 'tiny-typed-emitter'
import { Shy } from '../../contracts'
import { AbstractShy } from '../helpers/AbstractShy'
import { ShyClient } from '../ShyClient'

export class ShyFileClient extends AbstractShy {
  public events: TypedEmitter<Shy.Events.RealtimeFileEvent>

  constructor(protected client: ShyClient, protected fileUUID: string) {
    super(client)
    this.events = new TypedEmitter()
    this.realtime()
  }

  public realtime() {
    this.client.io.socket.on('file:upload:progress', (args) => {
      if (args.uuid === this.fileUUID) {
        this.events.emit('upload:progress', args)
      }
    })

    this.client.io.socket.on('file:download:progress', (args) => {
      if (args.uuid === this.fileUUID) {
        this.events.emit('download:progress', args)
      }
    })

    this.client.io.socket.on('file:status', (args) => {
      if (args.uuid === this.fileUUID) {
        this.events.emit('status', args)
      }
    })
  }
}
