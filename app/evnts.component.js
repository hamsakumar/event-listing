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
var evnt_service_1 = require('./evnt.service');
var EvntsComponent = (function () {
    function EvntsComponent(router, evntService) {
        this.router = router;
        this.evntService = evntService;
        this.addingEvnt = false;
    }
    EvntsComponent.prototype.getEvnts = function () {
        var _this = this;
        this.evntService
            .getEvnts()
            .then(function (evnts) { return _this.evnts = evnts; })
            .catch(function (error) { return _this.error = error; });
    };
    EvntsComponent.prototype.addEvnt = function () {
        this.addingEvnt = true;
        this.selectedEvnt = null;
        this.router.navigate(['/detail']);
    };
    EvntsComponent.prototype.close = function (savedEvnt) {
        this.addingEvnt = false;
        if (savedEvnt) {
            this.getEvnts();
        }
    };
    EvntsComponent.prototype.buyEvnt = function (evnt, event) {
        event.stopPropagation();
    };
    EvntsComponent.prototype.deleteEvnt = function (evnt, event) {
        var _this = this;
        event.stopPropagation();
        this.evntService
            .delete(evnt)
            .then(function (res) {
            _this.evnts = _this.evnts.filter(function (h) { return h !== evnt; });
            if (_this.selectedEvnt === evnt) {
                _this.selectedEvnt = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    EvntsComponent.prototype.ngOnInit = function () {
        this.getEvnts();
    };
    EvntsComponent.prototype.onSelect = function (evnt) {
        this.selectedEvnt = evnt;
        this.addingEvnt = false;
        this.gotoDetail();
    };
    EvntsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedEvnt.id]);
    };
    EvntsComponent = __decorate([
        core_1.Component({
            selector: 'my-evnts',
            templateUrl: 'app/evnts.component.html',
            styleUrls: ['app/evnts.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, evnt_service_1.EvntService])
    ], EvntsComponent);
    return EvntsComponent;
}());
exports.EvntsComponent = EvntsComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=evnts.component.js.map