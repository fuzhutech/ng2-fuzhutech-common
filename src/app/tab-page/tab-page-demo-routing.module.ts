import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TabPageDemoComponent} from './tab-page-demo.component';
import {MenuSideItem} from '../ng2-fuzhutech-common';

@NgModule({
    imports: [
        RouterModule.forChild([
            //{ path: '', redirectTo: 'home' },
            {
                path: '',
                component: TabPageDemoComponent,
                children: [
                    {path: '', redirectTo: 'sub-page'},
                    {path: 'sub-page', loadChildren: '../sub-page/sub-page-demo.module#FzSubPageDemoModule'},
                    {path: 'sub-page1', loadChildren: '../sub-page/sub-page-demo.module#FzSubPageDemoModule'},
                    {path: 'sub-page2', loadChildren: '../sub-page/sub-page-demo.module#FzSubPageDemoModule'},
                    {path: 'demo1', loadChildren: '../nest-nav/nest-nav-demo.module#FzNestNavDemoModule'},
                    {path: 'demo2', loadChildren: '../nest-nav/nest-nav-demo.module#FzNestNavDemoModule'},
                    {path: 'demo3', loadChildren: '../sub-page/sub-page-demo.module#FzSubPageDemoModule'}
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

export const ConfigMenuData: MenuSideItem[] = [
    {
        path: '/test',
        title: '测试菜单'
    },
    {
        title: '页面布局',
        children: [
            {
                path: 'sub-page',
                title: '子页面示例'
            },
            {
                path: 'sub-page1',
                title: '子页面示例1'
            },
            {
                path: 'sub-page2',
                title: '子页面示例2'
            },
            {
                title: '嵌套页面',
                children: [
                    {path: 'demo1', title: '示例1'},
                    {path: 'demo2', title: '示例2'}
                ]
            }
        ]
    }
];
