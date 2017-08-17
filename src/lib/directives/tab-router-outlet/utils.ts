import {Directive, Input, Attribute, ChangeDetectorRef} from '@angular/core';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';

import {
    ComponentFactoryResolver,
    EventEmitter,
    Injector,
    OnDestroy,
    ViewContainerRef,
    AfterViewInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TabRouterOutletService} from './tab-router-outlet.service';
import {isUndefined} from 'util';

export function getShowPath(activatedRoute: ActivatedRoute): string {
    //获取showPath
    let showPath = '';
    const pathFromRoot = activatedRoute.pathFromRoot;
    let s1 = '';
    for (let i = pathFromRoot.indexOf(this.service.mainActivatedRoute); i < pathFromRoot.length; i++) {
        s1 = activatedRoute.pathFromRoot[i].snapshot.url.join('/');
        if (s1 != '') {
            showPath = showPath + '/' + s1;
        }
    }

    //获取activatedPath
    let activatedPath = '';
    let s2;
    for (const entry of activatedRoute.pathFromRoot) {
        s2 = entry.snapshot.url.join('/');
        if (s2 != '') {
            activatedPath = activatedPath + '/' + s2;
        }
    }

    return showPath;

}

export function getHeader(activatedRoute: ActivatedRoute, showPath: string): string {
    //查找是否对应的MenuData
    const subMenuLinkItemData = this.getSubMenuLinkItemData(showPath);

    //获取header
    let header: string = null;
    if (subMenuLinkItemData != null) {
        header = subMenuLinkItemData.title;
    }

    if (header == null) {
        if ((!isUndefined(activatedRoute.routeConfig.data)) && (!isUndefined(activatedRoute.routeConfig.data['title']))) {
            header = activatedRoute.routeConfig.data['title'];
        } else {
            header = '无定义';
        }

        console.log(header);
    }

    return header;
}

export function getSubMenuLinkItemData(showPath: string) {
    //let subMenuLinkItemData = null;
    if (isUndefined(this.service.menuDataCol)) {
        return null;
    }

    for (const entry of this.service.menuDataCol) {

        for (const subMenuLinkItem of entry.subMenuLinkCol) {
            //console.log('subMenuLinkItem.path:'+'/'+subMenuLinkItem.path+';showpath:'+showPath);
            if ('/' + subMenuLinkItem.path == showPath) {
                return subMenuLinkItem;
            }
        }
    }

    return null;
}
