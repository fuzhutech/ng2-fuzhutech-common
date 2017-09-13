import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConfigMenuData} from './nest-nav-demo-routing.module';

@Component({
    moduleId: module.id,
    templateUrl: './nest-nav-demo.component.html',
    styleUrls: ['./nest-nav-demo.component.css'],
    //providers: [TabRouterOutletService]
})
export class NestNavDemoComponent implements OnInit, OnDestroy {

    menuData = ConfigMenuData;

    constructor() {
        console.log('NestNavDemoComponent constructor');
    }

    ngOnInit(): void {
        console.log('NestNavDemoComponent ngOnInit....', ConfigMenuData);
    }

    ngOnDestroy(): void {
        console.log('NestNavDemoComponent ngOnDestroy....');
    }
}


@Component({
    moduleId: module.id,
    template: `<h1>Tab Nav Bar</h1>
               This is the routed body of the sunny tab.`
})
export class SunnyTabContentComponent implements OnInit {

    constructor() {
        console.log('SunnyTabContentComponent constructor');
    }

    ngOnInit(): void {
        console.log('SunnyTabContentComponent ngOnInit');
    }
}


@Component({
    moduleId: module.id,
    template: 'This is the routed body of the rainy tab.',
})
export class RainyTabContentComponent implements OnInit {

    constructor() {
        console.log('RainyTabContentComponent constructor');
    }

    ngOnInit(): void {
        console.log('RainyTabContentComponent ngOnInit');
    }
}


@Component({
    moduleId: module.id,
    template: 'This is the routed body of the foggy tab.',
})
export class FoggyTabContentComponent implements OnInit {

    constructor() {
        console.log('FoggyTabContentComponent constructor');
    }

    ngOnInit(): void {
        console.log('FoggyTabContentComponent ngOnInit');
    }
}


