(($,window)=>{

  const pt = {
    init(){
      this.parallax();
      this.loading();
      this.HomeSection();
      this.header();
      this.setion1();
      this.setion2();
      this.setion3();
      this.mobile();
    },
    parallax(){
      const section = $('.section'),
            S3 = $('#section3'),
            S3Item = S3.find('.item');

      let  offsetTop = [],
           itemOST = [];

            function resizeFn(){
              section.each(function(idx,ele){
                offsetTop[idx] = $(this).offset().top - ($(this).offset().top/5);
              })
              S3Item.each(function(idx,ele){
                itemOST[idx] = $(this).offset().top - ($(this).offset().top/8);
              })
            }
            resizeFn()
            $(window).scroll(function(){
              let scrollTop = $(window).scrollTop();
              section.each(function(idx,obj){
                if(scrollTop > offsetTop[idx]){
                  $(obj).addClass('on');
                }
              })
              S3Item.each(function(idx,obj){
                if(scrollTop > itemOST[idx]){
                  $(obj).addClass('on');
                }
              })
              if(scrollTop == 0){
                section.removeClass('on');
                S3Item.removeClass('on');
              }
            })
                
            $(window).resize(function(){
              resizeFn()
            })
    },
    loading(){
      const loadingDoor = $('.loading_door');


      loadingDoor.click(function(){
        
      })
    },
    HomeSection(){
      const welcomeWord = $('.welcome-word h1');
      const words = "Welcome to My Portfolio!!";
      let current = 0;
      let timer;
      const loading = $('#loading_img_bg');
      const loadingDoor = $('.loading_door_layout');


    
      function typing(){
        
        const wordSplit = words.split("");
        setTimeout(function(){
          welcomeWord.append(wordSplit[current++])
        },1000)
        
        if(current > words.length){
          clearInterval(timer)
        }
      }
      function autoTyping(){
        timer = setInterval(typing,150)
        $("html").removeClass('hidden');
      }
      
      function doorClick(){
        loadingDoor.click(function(){
          loading.addClass('loading');
          setTimeout(function(){
            autoTyping();
            loading.fadeOut(1300)
          },3000)
        })
      }
      doorClick()

      const mousePointer = $('.mouse-pointer');
      const welcomePage = $('#welcome-page');
      welcomePage.mousemove(function(e){
        mousePointer.css({left: e.pageX - 50, top:e.pageY - 50})
      })
      
      .mouseenter(function(){
        mousePointer.fadeIn(300)
      })
      .mouseleave(function(){
        mousePointer.fadeOut(300)
      })
      welcomeWord.hover(function(){
        mousePointer.addClass('wordEnt')
      },
      function(){
        mousePointer.removeClass('wordEnt')
      })



    },
    header(){

      const section = $('.section'),
            navLink = $('.nav-box ul li a'),
            _header = $('#header'),
            // 모바일
            mNavPopup = $('.m-nav'),
            mNavContainer = mNavPopup.find('.container'),
            mNavLink = $('.m-nav-box ul li a');

      let  offsetTop = [];

      console.log(offsetTop);

            function resizeFn(){
              section.each(function(idx,ele){
                offsetTop[idx] = $(this).offset().top - ($(this).offset().top/30);
              })
              navLink.each(function(idx,obj){
                $(this).click(function(e){
                  e.preventDefault();
                  $("html,body").stop().animate({scrollTop:offsetTop[idx]},1000);
                })
              })
              // 모바일
              mNavLink.each(function(idx,obj){
                $(this).click(function(e){
                  e.preventDefault();
                  $("html,body").stop().animate({scrollTop:offsetTop[idx]},1000);
                  mNavContainer.stop().animate({top:`-100%`},400,"easeInBack");
                  mNavPopup.stop().delay(400).fadeOut(200);
                })
              })
            }resizeFn()
            $(window).scroll(function(){
              let scrollTop = $(window).scrollTop();
              section.each(function(idx,obj){
                if(scrollTop > section.eq(idx).offset().top - ($(this).offset().top/5)){
                 navLink.removeClass('active');
                 navLink.eq(idx).addClass('active');
                }
              })
              if(scrollTop > _header.offset().top){
                _header.addClass('fixed');
              }else{
                _header.removeClass('fixed');
              }
            })
                
            $(window).resize(function(){
              resizeFn()
            })
    },
    setion1(){
     
    },
    setion2(){
     const itemWrap =  $('.item-wrap');
     
            itemWrap.each(function(){
              let rateBox = $(this).find('.inner-txt-box span'),
                  dataRate = rateBox.attr('data-rate'),
                  circle = $(this).find('circle'),
                  size;

                  circle.each(function(idx, obj){
                    size = obj.getTotalLength();
                    $(obj).css({strokeDasharray:size, strokeDashoffset:size})
                  })
              $({rate:0}).stop().animate({rate:dataRate},{
                duration:6000,
                easing:"easeOutBack",
                progress(){
                  let now = this.rate;
                  rateBox.text(Math.ceil(now)+'%')
                  circle.css({strokeDashoffset : size-((size*now)/100)})
                }
              })
            })
            
    },
    setion3(){
     const item = $('.item');

           item.each(function(idx,obj){
            let itemNum = $(this).find('.item-num');
            itemNum.text(String(`${idx+1}`).padStart(2,'0'));
           })
    },
    mobile(){
     const mNavBox = $('.m-nav-btn-box'),
           mNavOpBtn = mNavBox.find('a'),
           mNavPopup = $('.m-nav'),
           mNavDim = mNavPopup.find('.dim'),
           mNavContainer = mNavPopup.find('.container'),
           mNavClBtn = mNavPopup.find('button');

           mNavOpBtn.click(function(e){
            e.preventDefault();
            mNavPopup.stop().fadeIn(200);
            mNavContainer.stop().delay(300).animate({top:`50%`},600,"easeOutBack");
           })

           mNavClBtn.click(function(e){
            e.preventDefault();
            mNavContainer.stop().animate({top:`-100%`},400,"easeInBack");
            mNavPopup.stop().delay(400).fadeOut(200);
           })
           mNavDim.click(function(e){
            e.preventDefault();
            mNavContainer.stop().animate({top:`-100%`},400,"easeInBack");
            mNavPopup.stop().delay(400).fadeOut(200);
           })
    }
  }
  pt.init();

  



})(jQuery,window)