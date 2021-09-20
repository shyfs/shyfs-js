import { AbstractShy } from '../helpers/AbstractShy'

interface CreateBotProps {
  token: string
}

export class ShyBotsClient extends AbstractShy {
  public async create({ token }: CreateBotProps) {
    return this.client.http
      .post<Shy.DiscordBot>('/discord/bots', { token })
      .then((res) => res.data)
  }

  public async get(query: Shy.QueryString<Shy.DiscordBot>) {
    return this.client.query('/discord/bots', query)
  }
}
