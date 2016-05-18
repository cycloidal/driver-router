import {
    createHistory
} from 'history'
import uniloc from 'uniloc'

function createRouterDriver(routes) {

    const history = createHistory()

    const history$ = Rx.Observable.create(obs =>
        history.listen(location => obs.onNext(location))
    )

    const route$ = history$
        .map(location => routes.lookup(`${location.pathname}${location.search}${location.hash}`))
        .replay(1)
    route$.connect()

    var _currentRoute = null

    route$.subscribe(route => _currentRoute = route)

    function to(name, options) {
        history.push(routes.generate(name, options))
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

function createRoutes(routes, aliases) {
    return uniloc(routes, aliases)
}

export {
    createRouterDriver,
    createRoutes
}
