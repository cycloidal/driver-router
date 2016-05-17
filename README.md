# driver-router
A router for cycle.js using uniloc and history.

Install:

```bash
$ npm install --save git+https://github.com/cycloidal/driver-router.git
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
