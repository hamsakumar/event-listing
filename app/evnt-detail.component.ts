import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import {Control, Validators, FormBuilder} from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Evnt }        from './evnt';
import { EvntService, UploadService } from './evnt.service';
import {Response} from '@angular/http';

@Component({
  selector: 'my-evnt-detail',
  templateUrl: 'app/evnt-detail.component.html',
  styleUrls: ['app/evnt-detail.component.css'],
  providers: [ UploadService ]
})
export class EvntDetailComponent implements OnInit {
  @Input() evnt: Evnt;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private evntService: EvntService,
    private service:UploadService,
    private route: ActivatedRoute) {
      this.service.progress$.subscribe(
      data => {
        console.log('progress = '+data);
      });
  }

onChange(event) {
    console.log('onChange');
    var files = event.srcElement.files;
    console.log(files);
    this.service.makeFileRequest('http://localhost:3000/upload', [], files).subscribe(() => {
      console.log('sent');
    });
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.evntService.getEvnt(id)
            .then(evnt => this.evnt = evnt);
      } else {
        this.navigated = true;
        this.evnt = new Evnt();
      }
    });
  }

  save(): void {
    this.evntService
        .save(this.evnt)
        .then(evnt => {
          this.evnt = evnt; // saved evnt, w/ id if new
          this.goBack(evnt);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  goBack(savedEvnt: Evnt = null): void {
    this.close.emit(savedEvnt);
    if (this.navigated) { window.history.back(); }
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/