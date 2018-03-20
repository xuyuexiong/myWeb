/*
 * @Author: xuyuexiong 
 * @Date: 2017-11-06 21:13:51 
 * @Last Modified by: xuyuexiong
 * @Last Modified time: 2017-12-19 20:48:05
 */

$(function () {
    //canvas背景
    $("canvas.snow").let_it_snow({
        speed: 1,
        interaction: false,
        size: 2,
        opacity: 0.2,
        color: '#ffffff'
    });

    $('.second').dblclick(function () {
        $(location).attr('href', './select.html');
    })

    var Height = $(window).height();
    $('body').height(Height);

})