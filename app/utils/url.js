/**
 * Created by k.k on 2017/8/9.
 */

/*笑话接口*/
const JOKE_API = 'http://route.showapi.com/341-1?showapi_sign=e1ce02a6cbf54b1980a9147ee0cb8345&showapi_appid=43685&maxResult=10&page=';

/*微信精选接口*/
const WECHAT_API = 'http://route.showapi.com/181-1?num=10&showapi_sign=e1ce02a6cbf54b1980a9147ee0cb8345&showapi_appid=43685&page=';

/*美女图集一级分类*/
const BEAUTY_1_API = 'http://route.showapi.com/1208-1?showapi_sign=e1ce02a6cbf54b1980a9147ee0cb8345&showapi_appid=43685';

/*美女图集二级分类*/
const BEAUTY_2_API = (typeId) => {
    return 'http://route.showapi.com/1208-2?showapi_sign=e1ce02a6cbf54b1980a9147ee0cb8345&showapi_appid=43685&rows=12&type=' + typeId + '&page='
};

/*美女图集-图片详细*/
const BEAUTY_3_API = 'http://route.showapi.com/1208-3?showapi_sign=e1ce02a6cbf54b1980a9147ee0cb8345&showapi_appid=43685&id=';

const getUrl = (typeName, typeId) => {
    if (typeName === 'joke') {
        return JOKE_API;
    } else if (typeName === 'wechat') {
        return WECHAT_API;
    } else if (typeName === 'beauty') {
        return typeId === null ? BEAUTY_1_API : BEAUTY_2_API(typeId);
    }else if(typeName === 'imgDetail'){
        return BEAUTY_3_API;
    }
};

export default getUrl;