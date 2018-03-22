/*
 * @Author: xuyuexiong
 * @Date:   2017-11-22 15:00:02
 * @Last Modified by:   xuyuexiong
 * @Last Modified time: 2017-11-22 17:22:42
 */

$(function() {
    //时间
    v = setInterval(function() {

        var date1 = new Date('2013/04/09 17:00'); //开始时间
        var date2 = new Date(); //结束时间
        var date3 = date2.getTime() - date1.getTime() //时间差的毫秒数

        //计算出相差天数
        var days = Math.floor(date3 / (24 * 3600 * 1000))

        //计算出小时数

        var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000))

        //计算相差秒数
        var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)

        // var text = ("原来，我们已经共同经历了" + days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ");

        $('.storyDay').text(days);
        $('.storyHour').text(hours);
        $('.storyMin').text(minutes);
        $('.storySec').text(seconds);
    }, 1000);

    

    //打字效果
    $.fn.autotype = function() {
        var $text = $(this);
        console.log('this', this);
        var str = $text.html(); //返回被选 元素的内容
        var index = 0;
        var x = $text.html('');
        //$text.html()和$(this).html('')有区别
        var timer = setInterval(function() {
                //substr(index, 1) 方法在字符串中抽取从index下标开始的一个的字符
                var current = str.substr(index, 1);
                if (current == '<') {
                    //indexOf() 方法返回">"在字符串中首次出现的位置。
                    index = str.indexOf('>', index) + 1;
                } else {
                    index++;
                }
                //console.log(["0到index下标下的字符",str.substring(0, index)],["符号",index & 1 ? '_': '']);
                //substring() 方法用于提取字符串中介于两个指定下标之间的字符
                $text.html(str.substring(0, index) + (index & 1 ? '_' : ''));
                if (index >= str.length) {
                    clearInterval(timer);
                    $('.story_clk').fadeIn(1000);
                }
            },
            100);
    };
    $("#autotype").autotype();

    $('.story_clk').dblclick(function(){
    	$('.story_time').fadeIn(1000)
    });
})