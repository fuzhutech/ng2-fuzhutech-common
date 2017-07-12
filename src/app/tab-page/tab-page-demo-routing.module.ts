import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabPageDemoComponent} from './tab-page-demo.component';
import {MainLinkData} from '../ng2-fuzhutech-common';

@NgModule({
    imports: [
        RouterModule.forChild([
            //{ path: '', redirectTo: 'home' },
            {
                path: '',
                component: TabPageDemoComponent,
                children: [
                    {path: '', redirectTo: 'sub-page'},
                    {path: 'sub-page', loadChildren: '../sub-page/sub-page-demo.module#FzSubPageDemoModule'}
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzTabPageDemoRoutingModule {
}

export const ConfigMenuData: MainLinkData[] = [
    {
        id: 'menu_basic_config',
        img: 'showcase/resources/images/mono/menu.svg',
        text: '基础配置',
        subMenuLinkCol: [
            {
                path: 'permission',
                title: '权限配置'
            },
            {
                path: 'resource',
                title: '资源配置'
            },
            {
                path: 'chain-path',
                title: '路径配置'
            }
        ]
    },
    {
        id: 'menu_system management',
        img: 'showcase/resources/images/mono/menu.svg',
        text: '系统管理',
        subMenuLinkCol: [
            {
                path: 'user',
                title: '用户管理'
            },
            {
                path: 'organization',
                title: '组织机构'
            },
            {
                path: 'role',
                title: '角色管理'
            }
        ]
    },
    {
        id: 'menu_query',
        img: 'showcase/resources/images/mono/menu.svg',
        text: '综合查询',
        subMenuLinkCol: [
            {
                path: 'log',
                title: '日志查询'
            }
        ]
    }
];
