define([], function () {
    var rtn = {
        orderDeliverList: {
            columns: [
                {name: '子订单号', field: 'order_sub_no'},
                {
                    name: '商品标题',
                    field: 'order.order_title'
                },
                {name: '购买份数', field: 'order.order_count'},
                {
                    name: '收货信息',
                    fieldDirective: '<span ng-bind="\'联系人:\'+item.address.contact_name"></span>' +
                    '<br/>手机<br/><span ng-bind="item.address.contact_mobile"></span>' +
                    '<br/>详细地址:<br/><span ng-bind="item.address.address"></span>' +
                    '<br/>标签:<span ng-bind="item.address.poi_type |poi_type"></span>'
                },
                {name: '预计配送时间', field: 'expect_date'},
                {name: '子订单状态', field: 'delivery_status', filter: 'order_deliver_status'},
                {
                    name: '管理备注',
                    fieldDirective: '<span ng-bind="item.order.remark|characters: 5 : false" ' +
                    'tooltip="{{item.order.remark}}" tooltip-placement="bottom"></span>'
                },
                // {
                //     name: '操作',
                //     fieldDirective: '<div order-deliver-cancel data="item"></div>' +
                //     '<div order-deliver-change-remark data="item"></div>'
                // },
            ],
            config: {
                title: '配送管理',
                api: '/orders/deliveries',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        //  delivery_status 子单状态:1 待发货,2 已发货,3 已签收,4 已经取消
                        value: 'delivery_status', text: '子单状态', type: 'btnGroup', default: '1',
                        enum: [
                            {value: '1', text: '待发货'},
                            {value: '2', text: '已发货'},
                            {value: '3', text: '已签收'},
                            {value: '4', text: '已取消'},
                        ]
                    },
                    {text: '选择预计配送时间', type: 'date', value: 'date', width: '12'},
                    {text: '商品标题', value: 'keyword'},
                    {text: '子订单号', value: 'order_sub_no'},
                    {text: '联系人', value: 'contact_name'},
                    {text: '手机号', value: 'mobile'},
                ],
                preSelectionSearch: {
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 50,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                },
                // 额外的bar  在搜索框下面 可以自定义事件
                ext: {
                    checked: {
                        text: '',
                        value: '_checked'
                    },
                    showNum: [
                        {text: '总数', type: 'count'},
                        {text: '已选', type: 'selected'},
                    ],
                    eventBtn: [
                        {text: '全选', event: 'all_select'},
                        {text: '取消全选', event: 'cancel_all_select'},
                        {
                            text: '修改子订单状态',
                            fieldFirective: '<div change-deliveries-status data="list">修改子订单状态</div>',
                        },
                    ]
                }
            },
            columnsByOrder: [
                {name: '子订单号', field: 'order_sub_no'},
                {name: '预计配送时间', field: 'expect_date'},
                {name: '子订单状态', field: 'status', filter: 'order_deliver_status'},
            ],
            configByOrder: {
                title: '子订单列表',
                api: '/orders/{order_id}/delivers',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: false,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            },
        }
    }
    return rtn;
});