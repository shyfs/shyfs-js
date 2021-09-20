import { Shy } from '../../contracts'
import { AbstractShy } from '../helpers/AbstractShy'

interface CreateFolderProps {
  name: string
}

export class ShyFoldersClient extends AbstractShy {
  public get(query: Shy.QueryString<Shy.Folder>) {
    return this.client.query('/folders', query)
  }

  public async create(data: CreateFolderProps) {
    return this.client.http
      .post<Shy.Folder>('/folders', data)
      .then((res) => res.data)
  }
}
