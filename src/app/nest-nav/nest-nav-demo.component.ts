import {Component, OnInit, OnDestroy} from '@angular/core';
import {MdDialog} from '@angular/material';
import {SubPageComponentWithComponentDialog, TabRouterOutletService} from '../ng2-fuzhutech-common';
import {ActivatedRoute} from '@angular/router';
import {MenuSideItem} from '../ng2-fuzhutech-common';


@Component({
    templateUrl: './nest-nav-demo.component.html',
    styleUrls: ['./nest-nav-demo.component.css']
})
export class NestNavDemoComponent implements OnInit, OnDestroy {


    configMenuData: MenuSideItem[] = [
        {
            //id: 'menu_basic_config',
            title: '页面布局',
            children: [
                {
                    path: 'sunny-tab',
                    title: 'sunny-tab示例'
                },
                {
                    path: 'rainy-tab',
                    title: 'rainy-tab示例'
                },
                {
                    path: 'foggy-tab',
                    title: 'foggy-tab示例'
                }
            ]
        },
        {
            //id: 'menu_system management',
            //img: 'showcase/resources/images/mono/menu.svg',
            title: '其他示例',
            children: [
                {
                    path: 'demo1',
                    title: '示例1'
                },
                {
                    path: 'demo2',
                    title: '示例2'
                },
                {
                    path: 'demo3',
                    title: '示例3'
                }
            ]
        }
    ];

    // Nav bar demo
    tabLinks = [
        {label: 'Sun', link: 'sunny-tab'},
        {label: 'Rain', link: 'rainy-tab'}
    ];

    constructor(private tabRouterOutletService: TabRouterOutletService, activatedRoute: ActivatedRoute) {
        //this.tabRouterOutletService = service;
        this.tabRouterOutletService.mainActivatedRoute = activatedRoute;
        this.tabRouterOutletService.menuData = this.configMenuData;
    }

    ngOnInit(): void {
        console.log('SubPageDemoComponent ngOnInit....');
    }

    ngOnDestroy(): void {
        console.log('SubPageDemoComponent ngOnDestroy....');
    }

    test() {
        console.log(this.tabLinks);

        this.tabLinks.push({label: 'Fog4', link: 'foggy-tab'});
        console.log(this.tabLinks);
    }
}


@Component({
    moduleId: module.id,
    selector: 'sunny-routed-content',
    template: 'This is the routed body of the sunny tab.',
})
export class SunnyTabContent implements OnInit {

    ngOnInit(): void {
        console.log('ces1');
    }
}


@Component({
    moduleId: module.id,
    selector: 'rainy-routed-content',
    template: 'This is the routed body of the rainy tab.',
})
export class RainyTabContent {

    ngOnInit(): void {
        console.log('ces2');
    }
}


@Component({
    moduleId: module.id,
    selector: 'foggy-routed-content',
    template: 'This is the routed body of the foggy tab.',
})
export class FoggyTabContent {

    ngOnInit(): void {
        console.log('ces3');
    }
}


