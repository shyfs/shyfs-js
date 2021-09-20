import { AbstractShy } from '../helpers/AbstractShy'
import { ShyClient } from '../ShyClient'
import { ShySettingsOrganizationClient } from './ShySettingsOrganizationClient'

export class ShyOrganizationClient extends AbstractShy {
  public settings: ShySettingsOrganizationClient

  constructor(protected client: ShyClient) {
    super(client)

    this.settings = new ShySettingsOrganizationClient(this.client)
  }
}
