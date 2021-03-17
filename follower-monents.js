auto.waitFor()
const userName = '小娃';
launchApp("微信");
var back = 0;

// 1.进入对话
enterDailog(userName);
back++;
// 2.进入聊天信息
enterChatInfo(userName);
back++;
// 3.从个人聊天信息进入个人详情
enterUserDetail(userName);
back++;
// 5.进入朋友圈
enterUserMoments(userName);
back++;
// 返回到消息列表页(首页)
listView();
sleep(1000);
backHome(back);


// enterDailog 1.从消息列表页进入个人对话页
function enterDailog(userName){
    text(userName).waitFor();
    var dailog = text(userName)
    if(!dailog){
        toast("没有找到对话框 "+userName);
        exit();
    }
    toast("进入对话: "+dailog)
    click(userName);
}

// enterChatInfo 从个人对话页查看用户聊天信息页
function enterChatInfo(userName){
        // 2.进入聊天信息
    id("com.tencent.mm:id/d8").waitFor();
    if(!id("com.tencent.mm:id/d8").exists()){
        toast("没有找到 ... 按钮");
        exit();
    }
    if(!text("Chat Info")){
        toast("进入 "+ userName +" 聊天信息页失败")
        exit();
    }
    // 3.点击 ... btn
    id("com.tencent.mm:id/d8").click();
    toast("进入 "+ userName +" 聊天信息页")
}

// enterUserDetail 4.进入个人详情
function enterUserDetail(userName){
    id("com.tencent.mm:id/h8t").waitFor();
    if(!text(userName)) {
        toast("进入 "+ userName +" 用户信息页失败")
        exit();
    }
    // 点击头像
    sleep(100);
    id("com.tencent.mm:id/h8t").findOnce().click();
    toast("进入 "+ userName +" 用户信息页");
}

// enterUserMoments 从个人详情进入朋友圈 
function enterUserMoments(userName){
    text("朋友圈").waitFor()
    if(!(text("朋友圈").exists())){
        toast("没有朋友圈选项")
        exit();
    }
    click("朋友圈");
    toast("进入 "+ userName +" 朋友圈");
}

function backHome(back){
    while(back > 0) {
        desc("返回").waitFor();
        sleep(100);
        toast("back "+ back);
        toast("返回 " + desc("返回").exists())
        back--
        desc("返回").findOnce().parent().click();
    }
}



function listView() {
    sleep(1000);
    className("android.widget.ListView").waitFor();
    var list = className("android.widget.ListView").findOne()
    log("list view count "+ list.childCount()+" "+list.bounds());
    var hyts = [];
    getChilds(list,0,hyts)
    sleep(300);
    log("hyts count: ",hyts.length)
    hyts.forEach(function(item) {
        enterMomentDetail(item)
    })    
}


function getChilds(child,i,hyts) {
    for (let index = 0; index < child.childCount(); index++) {
        var item = child.child(index)
        sleep(100);
        log(i,item.className(),item.text(),item.desc(),item.id());
        if(item.id() == "com.tencent.mm:id/hyt"){
            hyts.push(item);
            return;
        }else{
            if(item.childCount()>0){
                getChilds(item,i++,hyts)
           }
        }
    }
 
}


function enterMomentDetail(moment) {
    moment.click();
    text("赞").waitFor();
    id("com.tencent.mm:id/bev").findOnce().click();
    text("详情").waitFor();
    log("朋友圈文字: bn6",id("com.tencent.mm:id/bn6").findOnce().text());
    toast("朋友圈文字: bn6",id("com.tencent.mm:id/bn6").findOnce().text());
    sleep(100);
    backHome(2);
    sleep(300);
}