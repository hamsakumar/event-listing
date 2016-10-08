import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Evnt } from './evnt';

@Injectable()
export class EvntService {

  private evntsUrl = 'app/evnts';  // URL to web api

  constructor(private http: Http) { }

  getEvnts(): Promise<Evnt[]> {
    return this.http.get(this.evntsUrl)
               .toPromise()
               .then(response => response.json().data as Evnt[])
               .catch(this.handleError);
  }

  getEvnt(id: number): Promise<Evnt> {
    return this.getEvnts()
               .then(evnts => evnts.find(evnt => evnt.id === id));
  }

  save(evnt: Evnt): Promise<Evnt>  {
    if (evnt.id) {
      return this.put(evnt);
    }
    return this.post(evnt);
  }

  delete(evnt: Evnt): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.evntsUrl}/${evnt.id}`;

    return this.http
               .delete(url, {headers: headers})
               .toPromise()
               .catch(this.handleError);
  }

  // Add new Evnt
  private post(evnt: Evnt): Promise<Evnt> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.evntsUrl, JSON.stringify(evnt), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Evnt
  private put(evnt: Evnt): Promise<Evnt> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.evntsUrl}/${evnt.id}`;

    return this.http
               .put(url, JSON.stringify(evnt), {headers: headers})
               .toPromise()
               .then(() => evnt)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
export class UploadService {
  constructor () {
    this.progress$ = Observable.create(observer => {
        this.progressObserver = observer
    }).share();
  }

  private makeFileRequest (url: string, params: string[], files: File[]): Observable {
    return Observable.create(observer => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i].name);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    observer.next(JSON.parse(xhr.response));
                    observer.complete();
                } else {
                    observer.error(xhr.response);
                }
            }
        };

        xhr.upload.onprogress = (event) => {
            this.progress = Math.round(event.loaded / event.total * 100);
            this.progressObserver.next(this.progress);
        };

        xhr.open('POST', url, true);
        xhr.send(formData);
    });
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/