Page({
    data: {
        AppID: '2015440760'
    },
    onLoad: function (options) {

    },
    login: function () {
        this.selectComponent('#captcha').show()
        // 进行业务逻辑，若出现错误需重置验证码，执行以下方法
        // if (error) {
        // this.selectComponent('#captcha').refresh()
        // }
    },
    // 验证码验证结果回调
    handlerVerify: function (ev) {
        // 如果使用了 mpvue，ev.detail 需要换成 ev.mp.detail
        if(ev.detail.ret === 0) {
            // 验证成功
            console.log('ticket:', ev.detail.ticket)
        } else {
            // 验证失败
            // 请不要在验证失败中调用refresh，验证码内部会进行相应处理
        }
    },
    // 验证码准备就绪
    handlerReady: function () {
        console.log('验证码准备就绪')
    },
    // 验证码弹框准备关闭
    handlerClose: function () {
        console.log('验证码弹框准备关闭')
    },
    // 验证码出错
    handlerError: function (ev) {
        console.log(ev.detail.errMsg)
    }
});
