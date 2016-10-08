"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/toPromise');
var EvntService = (function () {
    function EvntService(http) {
        this.http = http;
        this.evntsUrl = 'app/evnts'; // URL to web api
    }
    EvntService.prototype.getEvnts = function () {
        return this.http.get(this.evntsUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EvntService.prototype.getEvnt = function (id) {
        return this.getEvnts()
            .then(function (evnts) { return evnts.find(function (evnt) { return evnt.id === id; }); });
    };
    EvntService.prototype.save = function (evnt) {
        if (evnt.id) {
            return this.put(evnt);
        }
        return this.post(evnt);
    };
    EvntService.prototype.delete = function (evnt) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.evntsUrl + "/" + evnt.id;
        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    };
    // Add new Evnt
    EvntService.prototype.post = function (evnt) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http
            .post(this.evntsUrl, JSON.stringify(evnt), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update existing Evnt
    EvntService.prototype.put = function (evnt) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.evntsUrl + "/" + evnt.id;
        return this.http
            .put(url, JSON.stringify(evnt), { headers: headers })
            .toPromise()
            .then(function () { return evnt; })
            .catch(this.handleError);
    };
    EvntService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    EvntService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EvntService);
    return EvntService;
}());
exports.EvntService = EvntService;
var UploadService = (function () {
    function UploadService() {
        var _this = this;
        this.progress$ = Rx_1.Observable.create(function (observer) {
            _this.progressObserver = observer;
        }).share();
    }
    UploadService.prototype.makeFileRequest = function (url, params, files) {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                _this.progress = Math.round(event.loaded / event.total * 100);
                _this.progressObserver.next(_this.progress);
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    };
    return UploadService;
}());
exports.UploadService = UploadService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=evnt.service.js.map