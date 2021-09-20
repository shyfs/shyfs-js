import { ShyClient } from '../ShyClient'

export abstract class AbstractShy {
  constructor(protected client: ShyClient) {}
}
