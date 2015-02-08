var spin = spin || {};


spin = {

	//force an element to have a pixel height value for a certain duration (for css3 transitions)
	forceHeight : function(el, duration){
		var $el = $(el);
		$el.css({height:$el[0].scrollHeight});
		//setTimeout(function(){$el.css({height:'auto'});},duration);
	},
	//set correct letter case for the word spin
	setSpinBrand : function(){
		$('.spin-brand').each(function(spin){
			$(this).html("SPiN")
		});
	},
	//generic ajax request for loading media items
	ajaxContent : function(url, el, callback){
		$.get( url, function( data ) {
			callback(data);
		});
	},
	setCookie : function(){
		//expires at end of session
		document.cookie="visited%3dtrue%3b%20expires%3d0%3b%20path%3d/index.html"
	},
	getCookie : function(name) {
		var search = name + "="
		var returnvalue = "";
		if (document.cookie.length > 0) {
			offset = document.cookie.indexOf(search)
			if (offset != -1) {
				offset += search.length
				end = document.cookie.indexOf(";", offset);
				if (end == -1) end = document.cookie.length;
				returnvalue=unescape(document.cookie.substring(offset, end))
				}
		 }
		return returnvalue;
	},
	//Download Menu

	//Media Carousel
	initMediaSlides : function(){
		$('.slideshow-content').slick({
			// autoplay : true,
			// autoplaySpeed: 6000,
			pauseOnHover : true,
			infinite: true,
			arrows: false,
			adaptiveHeight: false,
		});

		$('.slideshow .right').on('click', function(e){
				e.preventDefault();
				$('.slideshow-content').slickNext();
				return false;
		});

		$('.slideshow .left').on('click', function(e){
				e.preventDefault();
				$('.slideshow-content').slickPrev();
				return false;
		});
	},
	//Event Carousel
	initEventSlides : function(){

		var currentIndex = 0;
		var isDragging = false;
		var wasDragging = false;

		//Attach Slick
		$('.slideshow-content').slick({
			autoplay : true,
			accessibility : true,
			autoplaySpeed: 6000,
			pauseOnHover : false,
			infinite: true,
			arrows: false,
			adaptiveHeight: false,
			onInit: function(){
				$('.slideshow-content img').css({
					visiblity : 'visible',
					opacity : 1

				});
			},
			onAfterChange : function(){
				if(wasDragging){
					updateNavigationSlides(this.currentSlide);
				}
			}
		});

		$('.slideshow-navigation-content').slick({
			autoplay : true,
			accessibility : false,
			autoplaySpeed: 6000,
			pauseOnHover : false,
			slidesToShow: 3,
			centerMode: true,
			centerPadding:0,
			infinite: true,
			arrows : false,
			adaptiveHeight: true,
			 responsive : [{
				breakpoint : 640,
				settings : {
					slidesToShow: 1
				}
			}],
			onAfterChange : function(){
				if(wasDragging){
					updateSlides(this.currentSlide);
				}
			}
		});

		var updateSlides = function(index){
			if(index !== currentIndex){
				$('.slideshow-content').slickGoTo(index);
				currentIndex = index;
			}
		};

		var updateNavigationSlides = function(index){
			if(index !== currentIndex){
				$('.slideshow-navigation-content').slickGoTo(index);
				currentIndex = index;
			}
		};


		//Check For Dragging
		if(!Modernizr.touch){
			$(".slideshow .slick-slide")
			.mousedown(function() {
					$(window).mousemove(function() {
							isDragging = true;
							$(window).unbind("mousemove");
					});
			})
			.mouseup(function() {
					wasDragging = isDragging;
					isDragging = false;
					$(window).unbind("mousemove");
					if (!wasDragging) {
						var index = $(this).attr('index');
						$('.slideshow-content').slickGoTo(index);
						$('.slideshow-navigation-content').slickGoTo(index)
						currentIndex = index;
					}
			});
		}

		if(Modernizr.touch){
			$('.slideshow .slideshow-controls').hide();
			$('.slideshow .slick-slide')
			.on ('touchstart',function(){
					isDragging = true;
			})
			.on ('touchend',function(){
					wasDragging = isDragging;
					isDragging = false;
			});
		}

		//Arrow Click Events

		$('.slideshow-right').on('click', function(e){
				e.preventDefault();
				$('.slideshow-content').slickNext();
				$('.slideshow-navigation-content').slickNext();
				if($('.info-panel').hasClass('expanded') && $(window).scrollTop() < 375 ){
					spin.hidePanel('.info-panel');
				}
				return false;
		});

		$('.slideshow-left').on('click', function(e){
				e.preventDefault();
				$('.slideshow-content').slickPrev();
				$('.slideshow-navigation-content').slickPrev();
				if($('.info-panel').hasClass('expanded') && $(window).scrollTop() < 375 ){
					spin.hidePanel('.info-panel');
				}
				return false;
		});
	},
	//Party Carousel
	initPartySlides : function(){
		$('.party-thumbnails-content').slick({
			slide : 'li',
			autoplay : true,
			autoplaySpeed: 3000,
			pauseOnHover : false,
			infinite : true,
			centerMode : true,
			centerPadding: '40px',
			slidesToShow : 3,
			slidesToScroll: 3,
			arrows : false,
			 responsive : [{
				breakpoint : 640,
				settings : {
					slidesToShow: 1,
					centerPadding: '90px'

				}
			}],
		});
		$('.party-thumbnails-content').slickSetOption('slidesToScroll', 3);

		//console.log($('.party-thumbnails-content').slick());

		$('.party-thumbnails .arrow-left').on('click', function(){
			//prev
			$('.party-thumbnails-content').slickPrev();

		});

		$('.party-thumbnails .arrow-right').on('click', function(){
			//next
			$('.party-thumbnails-content').slickNext();

		});
	},
	//Calendar Carousel
	initCalendar : function(){
		var monthSlide = false;
		$('.date-list').slick({
			slide: 'li',
			slidesToShow: 9,
			slidesToScroll: 7,
			centerMode: false,
			infinite: false,
			arrows : false,
			adaptiveHeight: false,
		});

		$('.calendar .arrow-right').on('click', function(e){
				e.preventDefault();

				var index = $('.date-list').slickCurrentSlide();
				var $nextSlide = $('.date-list').find('[index='+index+']').next().find('a');
				i = -1;
				while (i < 6) {
					dateslide = $('.date-list').find('[index='+(index+i)+']').next().find('a');
				
						
					if(dateslide.hasClass('month-item')){

						$('.month').html(dateslide.html());
						monthSlide = true;
					}
					i++
				}
				if($nextSlide.hasClass('month-item')){
					$('.date-list').slickGoTo(index+2);


				}else{
					$('.date-list').slickNext();
				}

				return false;
		});

		$('.calendar .arrow-left').on('click', function(e){
				e.preventDefault();

				var index = $('.date-list').slickCurrentSlide();
				var $currentSlide = $('.date-list').find('[index='+index+']').prev().find('a');
				
				i = -1;
				while (i < 6) {
					dateslide = $('.date-list').find('[index='+(index-i)+']').prev().find('a');
							console.log(dateslide.html());
						
					if(dateslide.hasClass('month-item')){
						$('.month').html(dateslide.attr('prev-month'));
						monthSlide = true;
					}
					i++
				}

				if($currentSlide.hasClass('month-item')){
					$('.date-list').slickGoTo(index-2);

				}else{
					$('.date-list').slickPrev();
				}


				return false;
		});
	},
	//Mockup for clicking a Media item
	//Just switching content containers
	//In reality this should be ajaxed in
	switchMediaContent : function(type){
		$('.media-item').hide();
		$('.'+type).show();

		$('html, body').animate({
				scrollTop: 0
		}, 200);
	},
	//Switch tab for menu
	switchTab : function(tab){
		tab = tab.substring(1);
		$('.tab-pane').removeClass('active');
		var $currentTab = $(".tab-content").find("[data-tab='" + tab + "']");
		$currentTab.addClass('active');
		$('#tabs').removeClass().addClass(tab);
		//console.log($currentTab);
	},
	//Toggle Panel From Header
	togglePanel : function(el, paneId){
		console.log('toggle');
		var $el = $(el);
		var $curPane = $el.find(paneId);
		if($el.hasClass('expanded')){
			$('header').removeClass('opaque');
			$('body').removeClass('panel-open');
		}else{
			$('header').addClass('opaque');
			$('body').addClass('panel-open');
		}
		$el.toggleClass('expanded');
	},
	//showPanel From Header
	showPanel : function(el, paneId){
			var $el = $(el);
			var $curPane = $el.find(paneId);
			//hide panes
			$el.find('.panel-pane').removeClass('visible');
			//show currentPane
			$curPane.addClass('visible');
			$('header').addClass('opaque');
			$('body').addClass('panel-open');
			$el.removeClass('expanded').addClass('expanded');
	},
	//Hide Panel
	hidePanel : function(el){
		var $el = $(el);
		$el.removeClass('expanded');
		$('header').removeClass('opaque');
		$('body').removeClass('panel-open');
	},
	//toggle the navigation in header collapsed state
	toggleMobileNavigation : function(){
		$('.collapse').toggleClass('open');
		if($('body').hasClass('open-header')){
			$('.header').css({'height':62});
		}else{
			spin.forceHeight('.header', 500);
		}
		$('body').toggleClass('open-header');
	},
	//============================
	//Bind Events
	//============================
	//Calendar
	bindCalendarEvents : function(){
	},
	//Media page
	bindMediaEvents : function(){
		var filters = [];
		var $tagList = $('.tags .list-tags');
		var $thumbnails = $('.thumbnails');
		$('.list-tags li').hide();
		$('.toggle-tag-list').on('click', function(e){
			e.preventDefault();
			$tagList.toggleClass('collapsed');

			if($tagList.hasClass('collapsed')){
				$('.list-tags a:not(.selected)').parent().fadeOut(200, function(){
					$(this).hide();
				});
			}else{
				$('.list-tags a:not(.selected)').parent().fadeIn(200, function(){
					$(this).show();
				});
			}

			$('.list-tags.collapsed a.selected').on('click', function(){
				$(this).parent().fadeOut(200, function(){
					$(this).hide();
				});
			});

			$('.tags .arrow').toggleClass('flipped');
			return false;
		});
		//isotope
		$thumbnails.imagesLoaded( function() {

			$thumbnails.isotope({
				itemSelector : '.thumbnail',
				layoutMode : 'fitRows'
			});

		});

		//content switching
		$('.thumbnail a').on('click', function(e){
			e.preventDefault();
			var type = $(this).attr('href').substring(1);
			spin.switchMediaContent(type);
			if(type == "video"){

				$('iframe').attr('src',$(this).attr('data-url'));
			}else if(type == "photo"){
				
					$('.slideshow-content').removeClass('slick-initialized').removeClass('.slick-slider');
					$('iframe').attr('src','blank.html');
					$('.slideshow-content').html('');
					photos = $.parseJSON($(this).attr('data-photos'));
					$.each( photos.photos, function( k, photo ) {
						$('.slideshow-content').append('<div class="slide"><img src="'+photo+'"></div>');
					});
		
					$('.slideshow-content').slick({
								// autoplay : true,
								// autoplaySpeed: 6000,
								pauseOnHover : true,
								infinite: true,
								arrows: false,
								adaptiveHeight: true,
							});
							
			}else{
				if(type == "link"){
					window.open($(this).attr('data-url'), '_blank');
				}else{
					$('.media-item.article img').attr('src',$(this).attr('data-photo'));
				}
			}
			
		


			return false;
		});

		//filters

		$('.media .list-locations li a').on('click', function(e){
			e.preventDefault(e);

			$('.list-locations li a').removeClass('selected');
			$(this).addClass('selected');

			if($(this).parent().is(':first-child')){
				$thumbnails.isotope({filter : '*'});
			}else{
				var location = $(this).html().toLowerCase().replace(/ /g,'');
				$thumbnails.isotope({filter : "[data-location='"+location+"']"  });
			}

			return false;
		});

		$('.list-content li a').on('click', function(e){
			e.preventDefault(e);

			$('.list-content li a').removeClass('selected');
			$(this).addClass('selected');

			if($(this).parent().is(':first-child')){
				$thumbnails.isotope({filter : '*'});
			}else{
				var content = $(this).html().toLowerCase().replace(/ /g,'');
				$thumbnails.isotope({filter : "[data-content='"+content+"']" });
			}
			return false;
		});
		//tags
		$('.tags ul li a').on('click', function(e){
			e.preventDefault();

			$(this).toggleClass('selected');
			var filter = "tag-"+$(this).html().toLowerCase().replace(/ /g,'');
			
			//if filter is in array remove it
			var index = filters.indexOf(filter);
			if(index > -1){
				filters.splice(index, 1);
			}else{
				filters.push(filter);
			};
			var filterString = '.' + filters.join(', .');
			if(filters.length === 0){
				$thumbnails.isotope({filter : '*'});
			}else{
				$thumbnails.isotope({filter : filterString});
			}

			return false;
		});


		//load more content
		$('.load-more-content-btn').on('click', function(e){
			e.preventDefault();

			spin.ajaxContent('thumbnails.html', '.thumbnails', function(data){
				var $data = $(data);
				$thumbnails.isotope( 'insert', $data ).isotope('layout');
			});

			return false;
		});


	},
	//Bind Events for location page
	bindLocationEvents : function(){
		//If we clickoutside the header close panels
		$(document).on('click', function(e){
			var $panel = $('.panel');
			if(!$panel.is(e.target) && $panel.has(e.target).length === 0){
			//if(!$(event.target).closest('.header').length){

				if($('.info-panel').hasClass('expanded') && $(window).scrollTop() < 375 ){
					spin.hidePanel('.info-panel');
					$('.primary-navigation a').removeClass('active');
				}
			}
		});

		//Tab Switching on Menu
		$('.tab-navigation a:not(.link)').on('click', function(e){
			e.preventDefault();
			$('.tab-navigation a').removeClass('active');
			$(this).addClass('active');

			spin.switchTab($(this).attr('href'));

			return false;
		});
	},
	//Initialize
	init : function(){

		//Bind Header Events
		$('.toggle-navigation').on('click', function(e){
				e.preventDefault();
				spin.toggleMobileNavigation();

				if($('.info-panel').hasClass('expanded')){
					$('.info-panel').removeClass('expanded');
				}
				return false;
			});

		$('.primary-navigation li a').on('click', function(e){

			if($(this)[0].hash === ""){
				return;
			}

			e.preventDefault();


			if($(this).hasClass('active')){
				$(this).removeClass('active');
				spin.hidePanel('.info-panel');
				return;
			}

			$('.primary-navigation li a').removeClass('active');
			$(this).addClass('active');
			spin.hidePanel('.private-event-panel');
			spin.showPanel('.info-panel', $(this).attr('href'));

			if($('.collapse').hasClass('open')){
				spin.toggleMobileNavigation();
			}

			return false;
		});
		//Private Event Panel Open
		$('a.book-event-badge').on('click', function(e){
			e.preventDefault();
			spin.hidePanel('.info-panel');
			spin.togglePanel('.private-event-panel');
			$('.primary-navigation li a').removeClass('active');
			if($('.collapse').hasClass('open')){
				spin.toggleMobileNavigation();
			}
			return false;
		});
		//Private Event Panel Close
		$('.private-event-panel .close-btn').on('click', function(e){
			spin.hidePanel('.private-event-panel');
		});
		//DatePicker
		if (Modernizr.touch){
			var today = new Date(),
					year = today.getFullYear(),
					month = ('0' + (today.getMonth() + 1)).slice(-2),
					day = ('0' + today.getDate()).slice(-2);

			$('.private-event-panel .datepicker-input').attr('type', 'date').attr('min', year+'-'+month+'-'+day);
		} else {
		$('.private-event-panel .datepicker-input').datepicker({
			startDate : '+0d',
			todayHighlight : true
		}).on('show', function(e){
			 console.log('datepicker showing');
			 // $('.datepicker').width($('.datepicker-input').width()+10);
		});
		}


		//Force occurences of the word SPIN to have a lowercase i
		spin.setSpinBrand();
		//Bind Menu Click
		$('.download-menu').on('click', function(e){
		
		    var hiddenIFrameID = 'hiddenDownloader',
		        iframe = document.getElementById(hiddenIFrameID);
		    if (iframe === null) {
		        iframe = document.createElement('iframe');
		        iframe.id = hiddenIFrameID;
		        iframe.style.display = 'none';
		        document.body.appendChild(iframe);
		    }
		    iframe.src = $('.download-menu a').attr('href');
			e.preventDefault();
			return false;
		});
	},
	//Page Logic
	ready : function(){

		//global
		spin.init();

		//page specific
		switch($('body').data('page')){
			case "location":
				spin.initEventSlides();
				spin.bindLocationEvents();
				spin.initPartySlides();
				//spin.setToWindowHeight('.slideshow');

				//open info panel
				if(spin.getCookie("visited").length === 0){
					$('.info-panel').addClass('expanded');
					$('.header').addClass('opaque');
					$('.primary-navigation li:nth-child(2) a').addClass('active');
					spin.showPanel('.info-panel', '#info-pane');
					spin.setCookie();
				}

			break;
			case "event":
					$('.header').addClass('opaque');
					spin.initCalendar();
					spin.bindCalendarEvents();

			break;
			case "media":
				$('.header').addClass('opaque');
				spin.initMediaSlides();
				spin.bindMediaEvents();


			break;
			case "about":
				//spin.setToWindowHeight('.about');
			break;

		}
	}

};

$(document).ready(function(){
	spin.ready();

//callback handler for form submit
$("#privateEvent").submit(function(e)
{
    var postData = $(this).serializeArray();
    var formURL = $(this).attr("action");
    $.ajax(
    {
        url : formURL,
        type: "POST",
        data : postData,
        success:function(data, textStatus, jqXHR) 
        {
            $("#privateEvent").remove();
            $("#private-event-pane h3").html("Thanks for getting in touch with us.  Someone will get in touch with you shortly");
            
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            alert("failed");
        }
    });
    e.preventDefault(); //STOP default action
    e.unbind(); //unbind. to stop multiple form submit.
});
 


	});
