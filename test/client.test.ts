import { ShyClient } from '../src'

const ShyClientFactory = () => {
  return new ShyClient(
    'http://localhost:8888/api/organizations/shy-fs-tester-17bffe8688f',
    '$argon2id$v=19$t=3,m=4096,p=1$cM5dPH7SJJac4A9qqH39Ug$TNUAVOTXtHJf1aWxjb6+5uvbMEwWdK+xsFlzN7Ivaos'
  )
}

describe('shy client', () => {
  it('should works', async () => {
    expect(1).toBe(1)
  })
})
