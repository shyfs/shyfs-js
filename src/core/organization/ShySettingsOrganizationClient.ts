import { AbstractShy } from '../helpers/AbstractShy'

export class ShySettingsOrganizationClient extends AbstractShy {
  private history: Shy.SettingsHistory<Shy.SettingOrganization>[] = []

  public settings: Shy.SettingsHistory<Shy.SettingOrganization>[] = []

  public isReady = false

  public async setup() {
    return this.client.http
      .get<Shy.Responses.OrganizationSettingsResponse>('/settings')
      .then((res) => res.data)
      .then((settings) => {
        this.setByResponse(settings)
        this.isReady = true
        return this.settings
      })
  }

  private setByResponse(response: Shy.Responses.OrganizationSettingsResponse) {
    this.settings = Object.keys(response).map((key) => {
      const value = response[key as keyof Shy.SettingOrganization]
      return {
        key: key as any,
        value: value
      }
    })
    this.client.events.emit('organization:settings', this.settings)

    return this
  }

  public async set(key: keyof Shy.SettingOrganization, value: any) {
    this.remove(key)
    this.history.push({
      key,
      value
    })

    return this
  }

  public remove(key: keyof Shy.SettingOrganization) {
    this.history = this.settings.filter((currentSetting) => {
      return currentSetting.key !== key
    })

    return this
  }

  public get(key: keyof Shy.SettingOrganization) {
    return this.settings.find((setting) => setting.key === key)?.value
  }

  public async commit() {
    return this.client.http
      .post<Shy.Responses.OrganizationSettingsResponse>('/settings', {
        settings: this.history
      })
      .then((res) => res.data)
      .then((settings) => {
        this.setByResponse(settings)

        return this.settings
      })
  }
}
