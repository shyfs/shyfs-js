interface Chunks {
  start: number
  end: number
  formData: () => FormData
}

export class FileChunk {
  public chunks: Chunks[] = []

  constructor(private file: File, private maxChunkSize = 2097152 /* 2mbs */) {}

  public async handle() {
    const { size } = this.file
    const chunksCount = Math.ceil(this.file.size / this.maxChunkSize)

    for (let i = 1; i <= chunksCount; i++) {
      const start = this.maxChunkSize * i - this.maxChunkSize
      const startByte = start <= 0 ? 0 : start
      const end = size < this.maxChunkSize * i ? size : this.maxChunkSize * i

      this.chunks.push({
        start: startByte,
        end,
        formData: () => {
          const formData = new FormData()
          formData.append('blob', this.file.slice(startByte, end))
          formData.append('start', String(startByte))
          formData.append('end', String(end))
          formData.append('order', String(i))
          formData.append('total', String(chunksCount))

          return formData
        }
      })
    }
  }
}
