Page({
  data: {
    rules: [{
      name: 'account',
      rules: {required: true, message: '账号是必填的..'},
    }, {
      name: 'password',
      rules: {required: true, message: '密码是必填的..'},
    }, {
      name: 'steps',
      rules: {required: true, message: '步数是必填的..'},
    }],
    formData: {

    },
  },
  onLoad: function (options) {

  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        const { account, password, steps } = this.data.formData
        wx.request({
          url: 'https://service-3viuovfq-1302508199.gz.apigw.tencentcs.com/release/shuabu',
          data: {
            user: account,
            password,
            step: steps,
            _: new Date().getTime()
          },
          success: ({data}) => {
            if (data.errorCode) {
              wx.showModal({
                title: data.errorMessage,
                content: '请检查账号或密码是否正确..',
                showCancel: false,
              })
            } else if (data === 'login fail!') {
              wx.showModal({
                title: data,
                content: '请检查账号或密码是否正确..',
                showCancel: false,
              })
            } else if (data.indexOf('success') !== -1) {
              wx.showToast({
                title: '步数更新成功',
                icon: 'success',
                duration: 2000
              })
            }
          },
          fail: res => {
            wx.showToast({
              icon: 'error',
              title: res.errMsg
            })
          }
        })
      }
    })
  }
});
