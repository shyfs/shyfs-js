import { TypedEmitter } from 'tiny-typed-emitter'
import { Shy } from '../../contracts'
import { AbstractShy } from '../helpers/AbstractShy'
import { ShyClient } from '../ShyClient'

export class ShyFileClient extends AbstractShy {
  public events: TypedEmitter<Shy.Events.RealtimeFileEvent>

  private eventsNames: (keyof Shy.Events.RealtimeFileEvent)[] = [
    'status',
    'download:finish',
    'download:progress',
    'download:start',
    'upload:finish',
    'upload:progress',
    'upload:start'
  ]

  constructor(protected client: ShyClient, protected fileUUID: string) {
    super(client)
    this.events = new TypedEmitter()
    this.realtime()
  }

  private realtime() {
    const pipe = (eventName: keyof Shy.Events.RealtimeFileEvent) => {
      this.client.realtime.socket.on(`file:${eventName}`, (args) => {
        if (args.uuid === this.fileUUID) {
          console.log(`file:${eventName}`, args)
          this.events.emit(eventName, args)
        }
      })
    }

    for (const eventName of this.eventsNames) {
      pipe(eventName)
    }
  }
}
