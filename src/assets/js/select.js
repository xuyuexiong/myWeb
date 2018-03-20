/*
 * @Author: xuyuexiong 
 * @Date: 2017-11-05 19:05:24 
 * @Last Modified by: xuyuexiong
 * @Last Modified time: 2017-11-13 21:04:45
 */


$(function () {

  $('.selectBox .story_box').hover(function () {
    var index = $('.story_box').index(this);

    $('.story_box').eq(index).children('.change').stop(true, true).fadeIn(500);
    $('.story_box').eq(index).children('.story').css('color', '#fff');
  }, function () {
    var index = $('.story_box').index(this);
    $('.story_box').eq(index).children('.change').stop(true, true).fadeOut();
    $('.story_box').eq(index).children('.story').css('color', '#5a5858');
  })





})