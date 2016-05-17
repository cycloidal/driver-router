# driver-router
A router for cycle.js using uniloc and history.

Install:

```bash
$ npm install --save @cycloidal/driver-router
```

Usage:

```javascript
import Cycle from '@cycle/core'
import { createRouterDriver } from 'driver-router'

const routes = {
    'start': 'GET /'
}

Cycle.run(main, {
    Log: (state) => state.subscribe(update => console.log(update)),
    router: createRouterDriver(routes)
})
```

----

© 2016 by Jakob Hohlfeld, published under MIT license
