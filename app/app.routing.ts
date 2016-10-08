import { Routes, RouterModule } from '@angular/router';

import { EvntsComponent }     from './evnts.component';
import { EvntDetailComponent } from './evnt-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/evnts',
    pathMatch: 'full'
  },
  {
    path: 'detail/:id',
    component: EvntDetailComponent
  },
  {
    path: 'detail',
    component: EvntDetailComponent
  },  
  {
    path: 'evnts',
    component: EvntsComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/