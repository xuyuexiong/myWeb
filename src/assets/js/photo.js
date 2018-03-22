/*
 * @Author: xuyuexiong
 * @Date:   2017-12-04 14:58:52
 * @Last Modified by:   xuyuexiong
 * @Last Modified time: 2017-12-07 17:03:06
 */

/*
    抛开瀑布流布局各种乱七八糟的算法，基于masonry的瀑布流，很是简单的，而且通过扩展animate,能实现瀑布流布局的晃动、弹球等效果。
    masonry还有很多参数我这里注解了常用的参数
*/

$(function() {
    /*瀑布流开始*/
    var container = $('.waterfull ul');
    var loading = $('#imloading');
    var cishu = 0;

    // 初始化loading状态
    loading.data("on", true);
    /*判断瀑布流最大布局宽度，最大为1280*/
    function tores() {
        var tmpWid = $(window).width();
        if (tmpWid > 1280) {
            tmpWid = 1280;
        } else {
            var column = Math.floor(tmpWid / 320);
            tmpWid = column * 320;
        }
        $('.waterfull').width(tmpWid);
    }
    tores();
    $(window).resize(function() {
        tores();
    });
    container.imagesLoaded(function() {
        container.masonry({
            columnWidth: 400,
            itemSelector: '.item',
            isFitWidth: true, //是否根据浏览器窗口大小自动适应默认false
            isAnimated: true, //是否采用jquery动画进行重拍版
            isRTL: false, //设置布局的排列方式，即：定位砖块时，是从左向右排列还是从右向左排列。默认值为false，即从左向右
            isResizable: true, //是否自动布局默认true
            animationOptions: {
                duration: 800,
                easing: 'easeOutBack', //如果你引用了jQeasing这里就可以添加对应的动态动画效果，如果没引用删除这行，默认是匀速变化
                queue: false //是否队列，从一点填充瀑布流
            }
        });
    });
    /*模拟从后台获取到的数据*/
    var Json = [
        {
            'title': '甜蜜的笑',
            'adress': '2014/11/22 位于南昌·某庭',
            'src': 'http://image.xyxloveqct.com/image/jpg/7.jpeg-thumbnailZoom'
        },
        {
            'title': '看我吃热干面',
            'adress': '2014/03/08 位于武汉·户部巷',
            'src': 'http://image.xyxloveqct.com/image/jpg/8.jpeg-thumbnailZoom'
        },
        {
            'title': '毕业啦',
            'adress': '2016/07/10 位于武汉·华中科技大学',
            'src': 'http://image.xyxloveqct.com/image/jpg/9.jpeg-thumbnailZoom'
        },
        {
            'title': '旋转木马',
            'adress': '2016/06/27 位于南昌·万达主题公园',
            'src': 'http://image.xyxloveqct.com/image/jpg/10.jpeg-thumbnailZoom'
        },
        {
            'title': '赏樱花',
            'adress': '2014/03/14 位于武汉·某大学',
            'src': 'http://image.xyxloveqct.com/image/jpg/11.jpeg-thumbnailZoom'
        },
        {
            'title': '不会拍照',
            'adress': '2014/08/13 位于厦门·厦门大学',
            'src': 'http://image.xyxloveqct.com/image/jpg/12.jpeg-thumbnailZoom'
        },
        
    ];

    /*本应该通过ajax从后台请求过来类似sqljson的数据然后，便利，进行填充，这里我们用sqlJson来模拟一下数据*/
    $(window).scroll(function() {
        if (!loading.data("on")) return;
        // 计算所有瀑布流块中距离顶部最大，进而在滚动条滚动时，来进行ajax请求，方法很多这里只列举最简单一种，最易理解一种
        var itemNum = $('#waterfull').find('.item').length;
        var itemArr = [];
        itemArr[0] = $('#waterfull').find('.item').eq(itemNum - 1).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
        itemArr[1] = $('#waterfull').find('.item').eq(itemNum - 2).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
        itemArr[2] = $('#waterfull').find('.item').eq(itemNum - 3).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
        var maxTop = Math.max.apply(null, itemArr);
        if (maxTop < $(window).height() + $(document).scrollTop()) {
            //加载更多数据
            loading.data("on", false).fadeIn(800);

            (function(Json) {
                /*这里会根据后台返回的数据来判断是否你进行分页或者数据加载完毕这里假设大于30就不在加载数据*/
                if (cishu > 5) {
                    loading.text('就只有这么多了！');
                } else {
                    var html = "";

                    var start = cishu;
                    var end = 3+cishu;

                    var sqlJson = Json.slice(start,end);
                    
                    addCishu(3);

                    for (var i in sqlJson) {
                        html += "<li class='item'><a class='a-img'><img src='" + sqlJson[i].src + "'></a>";
                        html += "<div class='figcaption'><h2 class='figcaption_title'>" + sqlJson[i].title + "</h2>";
                        html += "<p>" + sqlJson[i].adress + "</p>";
                        html += "</div></li>";
                    }
                    /*模拟ajax请求数据时延时800毫秒*/
                    var time = setTimeout(function() {
                        $(html).find('img').each(function(index) {
                            loadImage($(this).attr('src'));
                        })
                        var $newElems = $(html).css({ opacity: 0 }).appendTo(container);
                        $newElems.imagesLoaded(function() {
                            $newElems.animate({ opacity: 1 }, 800);
                            container.masonry('appended', $newElems, true);
                            loading.data("on", true).fadeOut();
                            clearTimeout(time);
                        });
                    }, 800)
                }
            })(Json);
        }
    });

    //每次加载图片数量
    function addCishu(number){
        cishu = cishu + number;
    };


    function loadImage(url) {
        var img = new Image();
        //创建一个Image对象，实现图片的预下载
        img.src = url;
        if (img.complete) {
            return img.src;
        }
        img.onload = function() {
            return img.src;
        };
    };
    
})