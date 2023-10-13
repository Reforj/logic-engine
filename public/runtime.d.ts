import { State } from './index.d.ts'

interface Node {
  name: string
  title: string
  pins: Pin[]
  data?: any
  executable?: boolean
}

type Handler = ({ context, node }:{context: any, node: Node}, ...args: any[]) => any[]

export declare class Runtime {
  defineNodeHandler (name: string, handler: Handler): void

  build (state: State): (contextData: any = {}, ...args:any) => any[]
}
