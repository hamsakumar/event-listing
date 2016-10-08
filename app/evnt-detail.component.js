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
var router_1 = require('@angular/router');
var evnt_1 = require('./evnt');
var evnt_service_1 = require('./evnt.service');
var EvntDetailComponent = (function () {
    function EvntDetailComponent(evntService, service, route) {
        this.evntService = evntService;
        this.service = service;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
        this.service.progress$.subscribe(function (data) {
            console.log('progress = ' + data);
        });
    }
    EvntDetailComponent.prototype.onChange = function (event) {
        console.log('onChange');
        var files = event.srcElement.files;
        console.log(files);
        this.service.makeFileRequest('http://localhost:3000/upload', [], files).subscribe(function () {
            console.log('sent');
        });
    };
    EvntDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.navigated = true;
                _this.evntService.getEvnt(id)
                    .then(function (evnt) { return _this.evnt = evnt; });
            }
            else {
                _this.navigated = true;
                _this.evnt = new evnt_1.Evnt();
            }
        });
    };
    EvntDetailComponent.prototype.save = function () {
        var _this = this;
        this.evntService
            .save(this.evnt)
            .then(function (evnt) {
            _this.evnt = evnt; // saved evnt, w/ id if new
            _this.goBack(evnt);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    EvntDetailComponent.prototype.goBack = function (savedEvnt) {
        if (savedEvnt === void 0) { savedEvnt = null; }
        this.close.emit(savedEvnt);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', evnt_1.Evnt)
    ], EvntDetailComponent.prototype, "evnt", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EvntDetailComponent.prototype, "close", void 0);
    EvntDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-evnt-detail',
            templateUrl: 'app/evnt-detail.component.html',
            styleUrls: ['app/evnt-detail.component.css'],
            providers: [evnt_service_1.UploadService]
        }), 
        __metadata('design:paramtypes', [evnt_service_1.EvntService, evnt_service_1.UploadService, router_1.ActivatedRoute])
    ], EvntDetailComponent);
    return EvntDetailComponent;
}());
exports.EvntDetailComponent = EvntDetailComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=evnt-detail.component.js.map