import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConfigMenuData} from './tab-page-demo-routing.module';

@Component({
    moduleId: module.id,
    templateUrl: './tab-page-demo.component.html',
    styleUrls: ['./tab-page-demo.component.css'],
})
export class TabPageDemoComponent implements OnInit, OnDestroy {
    menuData = ConfigMenuData;

    constructor() {
        console.log('TabPageDemoComponent constructor');
    }

    ngOnInit() {
        console.log('TabPageDemoComponent ngOnInit');
    }

    ngOnDestroy() {
        console.log('TabPageDemoComponent ngOnDestroy');
    }

}
