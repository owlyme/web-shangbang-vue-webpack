import 'CSS/index.less'
import { indexSwiper } from './swiper';
$(document).ready(function(){
  console.log("index page")
  require('./header.js')
  indexSwiper()
});