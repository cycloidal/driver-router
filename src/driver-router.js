import { createHistory } from 'history'
import uniloc from 'uniloc'

export function createRouterDriver(routes, aliases) {

    const router = uniloc(routes, aliases)
    const history = createHistory()

    const history$ = Rx.Observable.create(obs =>
        history.listen(location => obs.onNext(location))
    )

    const route$ = history$
        .map(location => router.lookup(`${location.pathname}${location.search}${location.hash}`))
        .replay(1)
    route$.connect()

    var _currentRoute = null

    route$.subscribe(route => _currentRoute = route)

    function to(name, options) {
        history.push(router.generate(name, options))
    }

    return function(vtree$) {

        return {
            onRouteChanged: route$,
            to,
            routeTo: (...route) => {
                return () => to(...route)
            },
            currentRoute: () => _currentRoute
        }
    }

}
