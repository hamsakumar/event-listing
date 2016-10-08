import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Evnt }                from './evnt';
import { EvntService }         from './evnt.service';

@Component({
  selector: 'my-evnts',
  templateUrl: 'app/evnts.component.html',
  styleUrls:  ['app/evnts.component.css']
})
export class EvntsComponent implements OnInit {
  evnts: Evnt[];
  selectedEvnt: Evnt;
  addingEvnt = false;
  error: any;

  constructor(
    private router: Router,
    private evntService: EvntService) { }

  getEvnts(): void {
    this.evntService
        .getEvnts()
        .then(evnts => this.evnts = evnts)
        .catch(error => this.error = error);
  }

  addEvnt(): void {
    this.addingEvnt = true;
    this.selectedEvnt = null;
    this.router.navigate(['/detail']);
  }

  close(savedEvnt: Evnt): void {
    this.addingEvnt = false;
    if (savedEvnt) { this.getEvnts(); }
  }

  buyEvnt(evnt: Evnt, event: any): void {
    event.stopPropagation();
  }

  deleteEvnt(evnt: Evnt, event: any): void {
    event.stopPropagation();
    this.evntService
        .delete(evnt)
        .then(res => {
          this.evnts = this.evnts.filter(h => h !== evnt);
          if (this.selectedEvnt === evnt) { this.selectedEvnt = null; }
        })
        .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getEvnts();
  }

  onSelect(evnt: Evnt): void {
    this.selectedEvnt = evnt;
    this.addingEvnt = false;
     this.gotoDetail()
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedEvnt.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/