# Reforj / Logic engine


## Instalation
`yarn add @reforj/logic-engine`

`npm i --add @reforj/logic-engine`

Requirements as peer dependencies
```
react
react-redux
react-dnd
react-dnd-html5-backend
```

By defaul LogicEngine creates DnDProvder, you can pass `useDndProvider={false}` to disabled it.

## Documentation

The engine splited in two parts as logic builder ui and runtime.

Follow the [wiki](https://github.com/Reforj/logic-engine/wiki) or the [examples](#examples) section to check how to use UI and Runtime.

## Examples

Builder UI integration

```javascript
import { createRoot } from 'react-dom/client';
import { LogicEngine, getState } from '@reforj/logic-engine'
import '@reforj/logic-engine/style.css'

const root = createRoot(document.getElementById('container'));
root.render(<div style={{width: '100%', height: '90vh'}}>
  <LogicEngine />
</div>);
```

Runtime running

```javascript
import { Runtime } from '@reforj/logic-engine/runtime'
const runtime = new Runtime()

const fn = runtime.build(data) // data represents getState from @reforj/logic-engine
fn()
```

## Contributing

Pull requests and suggestions are welcome.

### License

MIT License

Copyright (c) Fedor Tarasov
