'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRoutes = exports.createRouterDriver = undefined;

var _history = require('history');

var _uniloc = require('uniloc');

var _uniloc2 = _interopRequireDefault(_uniloc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRouterDriver(routes) {

    var history = (0, _history.createHistory)();

    var history$ = Rx.Observable.create(function (obs) {
        return history.listen(function (location) {
            return obs.onNext(location);
        });
    });

    var route$ = history$.map(function (location) {
        return routes.lookup('' + location.pathname + location.search + location.hash);
    }).replay(1);
    route$.connect();

    var _currentRoute = null;

    route$.subscribe(function (route) {
        return _currentRoute = route;
    });

    function to(name, options) {
        history.push(routes.generate(name, options));
    }

    return function (vtree$) {

        return {
            onRouteChanged: route$,
            to: to,
            routeTo: function routeTo() {
                for (var _len = arguments.length, route = Array(_len), _key = 0; _key < _len; _key++) {
                    route[_key] = arguments[_key];
                }

                return function () {
                    return to.apply(undefined, route);
                };
            },
            currentRoute: function currentRoute() {
                return _currentRoute;
            }
        };
    };
}

function createRoutes(routes, aliases) {
    return (0, _uniloc2.default)(routes, aliases);
}

exports.createRouterDriver = createRouterDriver;
exports.createRoutes = createRoutes;