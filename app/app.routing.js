"use strict";
var router_1 = require('@angular/router');
var evnts_component_1 = require('./evnts.component');
var evnt_detail_component_1 = require('./evnt-detail.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/evnts',
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: evnt_detail_component_1.EvntDetailComponent
    },
    {
        path: 'detail',
        component: evnt_detail_component_1.EvntDetailComponent
    },
    {
        path: 'evnts',
        component: evnts_component_1.EvntsComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=app.routing.js.map