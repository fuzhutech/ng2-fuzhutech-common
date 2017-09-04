import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ContextMenu} from 'primeng/primeng';
import {TabRouterOutletService, MainTabPageComponent, TabData} from '../ng2-fuzhutech-common';
import {AuthInfoService, MenuInfo} from '../ng2-fuzhutech-common';
import {ConfigMenuData} from './tab-page-demo-routing.module';

@Component({
    moduleId: module.id,
    templateUrl: './tab-page-demo.component.html',
    styleUrls: ['./tab-page-demo.component.css'],
    providers: [TabRouterOutletService]
})
export class TabPageDemoComponent extends MainTabPageComponent implements OnInit, OnDestroy {

    items = [
        {label: '关闭标签页', icon: 'fa-search', command: (event) => this.Close(event)},
        {label: '关闭全部', icon: 'fa-close', command: (event) => this.CloseAll(event)}
    ];

    private subscription: Subscription;
    private menuInfo: MenuInfo;
    private systemId = 110;

    constructor(private service: TabRouterOutletService, activatedRoute: ActivatedRoute, private authInfoService: AuthInfoService) {
        super(service, activatedRoute, ConfigMenuData);
    }

    onNodeRightClick(event: MouseEvent, tab: TabData, contextMenu: ContextMenu) {
        console.log(contextMenu);
        contextMenu.show(event);
    }

    ngOnInit() {

        console.log('TabPageDemoComponent ngOnInit');

        /*this.authInfoService.refreshMenuInfo(this.systemId);

        this.subscription = this.authInfoService.menuInfoSubject
            .subscribe(
                data => {
                    this.menuInfo = data;
                },
                error => console.error(error)
            );*/
    }

    ngOnDestroy() {
        if (this.subscription !== undefined) {
            this.subscription.unsubscribe();
        }

    }


    Close(event) {
        console.log(event);
    }

    CloseAll(event) {
        console.log(event);
    }


}
