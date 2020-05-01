var rp = require('request-promise');
var wx = require('./config.js');

async function getToken() {

    let articleurl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wx.appid}&secret=${wx.secret}`
    let options = {
        uri: articleurl,
        json: true
    }
    return await rp(options)

}


(async () => {
    let { access_token } = await getToken()
    let url = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${access_token}`;
    let myoptions = {
        method: 'POST',
        uri: url,
        body: {
            type: "news",
            offset: 1,
            count: 2
        },
        json: true
    }
    rp(myoptions).then(wxres => {
        console.log(wxres.item[0].content)

    })
    

})()

/*
let ACCESS_TOKEN =
    rp(options).then(res => {
        let { access_token } = res
        console.log(access_token)
        let url = "https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=" + access_token;
        let myoptions = {
            method: 'POST',
            uri: url,
            body: {
                type: "news",
                offset: 1,
                count: 2
            },
            json: true
        }
        rp(myoptions).then(wxres => {
            console.log(wxres.item[0].content)

        })

    })

    */


