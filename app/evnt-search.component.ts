import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { EvntSearchService } from './evnt-search.service';
import { Evnt } from './evnt';

@Component({
  selector: 'evnt-search',
  templateUrl: 'app/evnt-search.component.html',
  styleUrls:  ['app/evnt-search.component.css'],
  providers: [EvntSearchService]
})
export class EvntSearchComponent implements OnInit {
  evnts: Observable<Evnt[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private evntSearchService: EvntSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.evnts = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.evntSearchService.search(term)
        // or the observable of empty evnts if no search term
        : Observable.of<Evnt[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Evnt[]>([]);
      });
  }

  gotoDetail(evnt: Evnt): void {
    let link = ['/detail', evnt.id];
    this.router.navigate(link);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/