export class SingletonsContainer<T> {
  private items: Record<string, T> = {}

  public exists(index: string) {
    return !!this.items[index]
  }

  public get(index: string) {
    return this.items[index]
  }

  public add(index: string, factory: () => T) {
    if (this.exists(index)) return this.get(index)

    const instance = factory()

    this.items[index] = instance

    return instance
  }

  public remove(index: string) {
    delete this.items[index]
  }
}
