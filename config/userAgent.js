/**
 * 配置不同的user Agent 来避免访问受限
 * Created by mohong on 2016/11/2.
 */

var useragent = {
    safari_51_MAC: 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
    safari_51_Windows: 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
    IE9: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0',
    Green_Browser: 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'
};

module.exports = useragent;