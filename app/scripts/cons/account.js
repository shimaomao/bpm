define([], function () {
    // accountList roleList
    var rtn = {
        accountList: {
            columns: [
                // {name: '编号', field: 'idx', className: 'text-right'},
                {name: '编号', field: 'account_id', className: 'text-right'},
                {name: '用户名', field: 'username'},
                {
                    name: '手机',
                    field: 'mobile',
                    truncateText: true,
                    truncateTextLength: 11,
                    truncateTextBreakOnWord: false,
                },
                {
                    name: '邮箱',
                    field: 'email',
                    truncateText: true,
                    truncateTextLength: 5,
                    truncateTextBreakOnWord: false,
                    htmlField: false
                },
                {name: '定位城市', field: 'city_name'},
                {name: '微信昵称', field: 'weixin_nickname'},
                // {name: '微信二维码', fieldDirective: '<show_image url="item.weixin_qrcode"></show_image>'},
                {name: '操作', fieldDirective: '<div vpc-instance-list-actions></div>'}
            ],
            config: {
                title: '账户管理',
                api: '/accounts',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'account_id',
                        text: '账户ID',
                        placeholder: '账户ID',
                        // paramDirective: '<div hjm-search hjm-select=""></div>'
                    },
                    {value: 'mobile', text: '手机号码', placeholder: '手机号码'},
                    {value: 'haha', text: '城市', placeholder: '城市', type: 'datetime'},
                    // {value: 'cityname', text: '城市', placeholder: '城市', type: 'datetime'},
                    {value: 'haha32132', text: '城市', placeholder: '城市', type: 'date'},
                    {value: 'email', text: '邮箱', placeholder: '邮箱'}
                ],
                preSelectionSearch: {
                    status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 5,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            }
        },
        roleList: {
            columns: [
                // {name: '编号', field: 'idx', className: 'text-right'},
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '标示', field: 'key'},
                {name: '角色名称', field: 'name'},
                {
                    name: '菜单',
                    fieldDirective: '<show_str str="item.menus | arraySub2String:\'name\'" split="" title="\'菜单\'" btn_str="\'菜单\'"></show_str>',
                },
                {name: '操作', fieldDirective: '<a class="btn btn-primary" ng-click="menu(item.id,item.menus)">菜单</a>'},
                // {
                //     name: '手机',
                //     field: 'mobile',
                //     truncateText: true,
                //     truncateTextLength: 11,
                //     truncateTextBreakOnWord: false,
                // },
            ],
            config: {
                title: '角色管理',
                api: '/accounts/roles',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'account_id',
                        text: '账户ID',
                        placeholder: '账户ID',
                        // paramDirective: '<div hjm-search hjm-select=""></div>'
                    },
                    {value: 'mobile', text: '手机号码', placeholder: '手机号码'},
                    // {value: 'email', text: '邮箱', placeholder: '邮箱'},
                    {value: 'cityname', text: '城市', placeholder: '城市', type: 'date'}
                ],
                preSelectionSearch: {
                    status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 5,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            }
        },
        menuList: {
            columns: [
                // {name: '编号', field: 'idx', className: 'text-right'},
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '标示', field: 'key'},
                {name: '角色名称', field: 'name'},
                {
                    name: '菜单',
                    fieldDirective: '<show_str str="item.menus | arraySub2String:\'name\'" split="" title="\'菜单\'" btn_str="\'菜单\'"></show_str>',
                },
                {name: '操作', fieldDirective: '<a class="btn btn-primary" ng-click="menu(item.id,item.menus)">菜单</a>'},
                // {
                //     name: '手机',
                //     field: 'mobile',
                //     truncateText: true,
                //     truncateTextLength: 11,
                //     truncateTextBreakOnWord: false,
                // },
            ],
            config: {
                title: '菜单管理',
                api: '/accounts/menus',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'menus_id',
                        text: '账户ID',
                        placeholder: '账户ID',
                        // paramDirective: '<div hjm-search hjm-select=""></div>'
                    },
                    {value: 'mobile', text: '手机号码', placeholder: '手机号码'},
                    // {value: 'email', text: '邮箱', placeholder: '邮箱'},
                    {value: 'cityname', text: '城市', placeholder: '城市', type: 'date'}
                ],
                preSelectionSearch: {
                    status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 5,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            }
        }
    }
    return rtn;
});