import {State} from './index.d.ts'

interface Node {
  name: string
  title: string
  pins: Pin[]
  data?: any
  executable?: boolean
}

type Handler = ({userContext, node}:{userContext: any, node: Node} , ...args: any[]) => any[]

type Func = (userContext: any, ...args: any) => any[]

export declare class Runtime {
  defineNodeHandler (name: string, handler: Handler) {}

  build (state: State):  {}
}
