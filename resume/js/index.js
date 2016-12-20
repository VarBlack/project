(function () {
	// 主屏背景图 相关事件
	function setMainImage (id) {
		this.obj = $(id);
		this.bg = $('.bg');
		this.face = $('.face');
		this.nowIndex = 0;
		this.setting = {
			data: [
				'img/glasses_guy.jpg',
				'img/aa_woman.jpg',
				'img/young_girl.jpg',
				'img/indian_guy2.jpg'
				],
			bgData: [
				'img/bg.jpg',
				'img/bgWhite.jpg'
			],
			len: 12,
			bgSize: [1920, 1200],
			bgRota: 1920 / 1200,
			hideFn: function () {
				return false;
			},
			showFn: function () {
				return false;
			},
			isReady: false,
			title: [
				'HTML',
				'css',
				'JavaScript',
				'Canvas'
			],
			infor: [
				'At Adison Partners, we know what uncommon talent looks like',
				'We are the ONLY retained firm that truly bets on our performance',
				'Dramatically improves business performance outcomes by effectively leveraging people, processes, and technology',
				'‘Disruptive Talent’ describes the brilliant individuals who think and act differently'
			]
		};
		this.init();
	}
	setMainImage.prototype = {
		constructor: setMainImage,
		init: function (json) {
			for (attr in json) {
				this.setting[attr] = json[attr];
			}
			this.currentBg = this.setting.data;
		},
		tabBg: function (type) {
			if (type) {
				this.currentBg = this.setting.bgData;
			} else {
				this.currentBg = this.setting.data;
			}
			this.nowIndex = -1;
		},
		setPos: function (fn) {
			// console.log(fn);
			this.setLayOut(this.bg);
			this.setLayOut(this.face);
			fn && fn(this.setting.title[0],this.setting.infor[0])
		},
		rePos: function () {
			this.setStyle(this.bg);
			this.setStyle(this.face);
		},
		setLayOut: function (imgArea) {
			var str = '';
			for (var i = 0; i < 12; i++) {
				str += '<div></div>'
			}
			imgArea.html(str);
			this.setStyle(imgArea);
			this.hideImage();
		},
		setStyle: function (imgArea) {
			var _width = imgArea.find('div').width();
			var _parWidth = imgArea.width();
			var _parHeight = imgArea.height();

			if (_parHeight*this.setting.bgRota > _parWidth) {
				imgArea.css({
					'min-width':_parHeight*this.setting.bgRota
				});
			};

			// // 测试+
			// if (_parWidth/this.setting.bgRota > _parHeight) {
			// console.log(_parWidth/this.setting.bgRota)
			// 	$('#mainImagArea').css({
			// 		'min-height': _parWidth/this.setting.bgRota
			// 	});
			// };

			_width = imgArea.find('div').width();

			_parWidth = imgArea.width();

			imgArea.find('div').css({
				'background-image': 'url('+ this.currentBg[this.nowIndex] +')',
			}).each(function (i, e) {
				$(e).css ({
					'left': i * _width,
					'background-position': -i * _width,
					'background-size': _parWidth
				})
			})
		},
		autoPlay: function () {
			var _this = this;
			clearInterval(this.timer);
			this.timer = setInterval(function () {
				_this.next();
			}, 5000)
		},
		isAutoPlay: function () {
			return this.timer;
		},
		stopAutoPlay: function () {
			clearInterval(this.timer);
			this.timer = null;
		},
		now: function (callback) {
			this.face.find('div').css({
				'background-image': 'url('+ this.currentBg[this.nowIndex] +')',
			});
			this.showImage(callback);
		},
		next: function (callback) {
			// this.setting.isReady = false;
			this.nowIndex ++;
			this.nowIndex %= this.currentBg.length;
			this.face.find('div').css({
				'background-image': 'url('+ this.currentBg[this.nowIndex] +')',
			});
			this.showImage(callback);
		},
		prev: function () {
			this.nowIndex --;
			if (this.nowIndex < 0) {
				this.nowIndex = this.currentBg.length-1;
			}
			// console.log(this.nowIndex)
			this.face.find('div').css({
				'background-image': 'url('+ this.currentBg[this.nowIndex] +')',
			});
			this.showImage();
		},
		hideImage: function () {
			this.face.find('div').each(function(i, e){
				dir = i%2 == 0 ? 1 : -1;
				$(e).css ({
					top:( dir * (tools.winSize().h * 0.4) * i/12 + dir * (tools.winSize().h * 0.2))
				})
			});
			this.setting.showFn && this.setting.showFn();
		},
		isReady: function () {
			return this.setting.isReady;
		},
		showImage: function (callback) {
			this.setting.isReady = true;
			var _this = this;
			this.face.find('div').each(function (i, e) {
				setTimeout(function (i) {
					mTween(e, {top: 0, opacity: 100}, 500, 'easeOut', function () {
						if (i == 11) {
							_this.hideImage();
							$('.face div').css ({opacity: 0});
							$('.bg').css ({
								'opacity': 1,
							});
							$('.bg div').css({
								//

								'background-image': $('.face div').eq(0).css('background-image')
							});

							_this.setting.isReady = false;
							callback && callback();
						}
						if (i == 0) {
							$('.bg').animate ({
								opacity: 0
							});
						}
					});
				}, i*70, i);
			});
			// console.log(_this.setting.title[_this.nowIndex]);
			_this.setting.hideFn && _this.setting.hideFn(_this.setting.title[_this.nowIndex],_this.setting.infor[_this.nowIndex]);
		}
	};

	// 主屏文字信息相关
	function IntroBox (selector) {
		this.obj = $(selector);
		this.spanBox = this.obj.find('span');
	}

	IntroBox.prototype = {
		constructor: IntroBox,
		inite: function () {
		},
		showBox: function () {
			this.obj.fadeIn(300);
			this.spanBox.each(function (i, e) {
				$(e).attr({
					style: ''
				})
			})
		},
		hideBox: function (fn) {
			this.obj.fadeOut(800, function () {
				fn && fn();
			});
			this.spanBox.each(function (i, e) {
				$(e).width(0);
				$(e).height(0);
			})
		}
	}

	// 阻止移动端默认事件
	/*document.addEventListener('touchstart', function (ev) {
		ev.preventDefault();
	})*/

	var setImage = new setMainImage('#mainImagArea');
	var mainIntroBox = new IntroBox('#centerBox .spanBox');

	// 初始化：添加 进入 移出 的回调函数，将内容区 和 背景关联起来
	setImage.init ({
		showFn: function (title) {
			mainIntroBox.showBox();
			$('#title').fadeIn(800);
			$('#intro').fadeIn(800);
		},
		hideFn: function (title, infor) {
			mainIntroBox.hideBox();
			$('#title').fadeOut(800, function () {
				$('#title').html(title);
			});
			$('#intro').fadeOut(800, function () {
				$('#intro p').html(infor)
			});
		}
	});

	// 初始化结构，顺便将将内容区 和 背景 一起创建结构，这里可以将setPos和init合并起来，将这里作为配置参数；
	setImage.setPos(function (title, infor) {
		$('#title').html(title);
		$('#intro p').html(infor)
	});

	// 调用自动播放
	setImage.autoPlay();


	// 右边按钮，进入下一张
	$('.rightBtn').click(function () {
		if(setImage.isReady()){
			return false;
		};
		setImage.stopAutoPlay();
		setImage.next();
		setImage.autoPlay();
	});

	// 左边按钮，进入下一张
	$('.leftBtn').click(function () {
		if(setImage.isReady()){
			return false;
		};
		setImage.stopAutoPlay();
		setImage.prev();
		setImage.autoPlay();
	});

	centerBox.onclick = function (ev) {
		ev.cancelBubble = true;
	};



	// menu 点击事件

	var menuBox = new IntroBox('#menuBox .spanBox');
	var execBox = new IntroBox('#execBox .spanBox');


	var menuPage =  new setMainImage('#mainImagArea');
	menuPage.init({
		data: [
			'img/bg.jpg'
		],
		showFn: function () {
			// $('#centerBox').fadeOut(800, function () {
				$('#menuBox').fadeIn(400, function () {
					menuBox.showBox();
				});
			// });
		},
		hideFn: function (title, infor) {
			menuBox.hideBox();
			$('#centerBox').fadeOut(400)
		}
	});



	var execPage =  new setMainImage('#mainImagArea');
	execPage.init({
		data: [
			'img/bg.jpg',
			'img/bgWhite.jpg'
		],
		showFn: function () {
			$('#execBox').fadeIn(function () {
				$('#sideBar').fadeIn();
				execBox.showBox();
			})
		},
		hideFn: function (title, infor) {
			$('#sideBar').fadeOut();
			execBox.hideBox();
			$('#menuBox').fadeOut(600);
		}
	});




	var targetHash = 'menu';
	var nowHash = 'main';

	$('#header').on('click.menu', '.menu', function () {
		if(setImage.isReady()){
			return false;
		};
		$('.menu').toggleClass('active');
		window.location.hash = targetHash;
	})


	// menu 下导航相关

	$('#menuBox nav a').click(function () {
		var _this = this;
		$('#menuBox nav a').removeClass('active');
		$(this).addClass('active');
		$('.menu').toggleClass('active');
		$('#menuBox .spanBox').animate({
			top: $(_this).position().top
		})
	})

	// 由于 menu 功能指向具有多样性，所以单独使用一个方法，进行区分

	function backMenu () {
		switch (nowHash) {
			case 'main':
				setImage.stopAutoPlay();
				menuPage.now();
				targetHash = 'main';
				break;
			case 'executive':
				menuPage.now();
				execBox.hideBox();
				$('#execBox').fadeOut(800);
				$('#sideBar').fadeOut();
				targetHash = 'executive';
				break;
			default:
				// statements_def
				break;
		}
	}



	// 子主题切换

	window.onhashchange = function () {
		var hash = ff.getHash();
		switch (hash) {
			case 'menu':
				$('#mainImagArea').addClass('bgBlue');
				$('.menu').addClass('sonStyle');
				backMenu();
				nowHash = 'menu';
				window.location.hash = '';
				break;
			case 'main':
				$('#mainImagArea').removeClass('bgBlue');
				$('.menu').removeClass('sonStyle');
				menuBox.hideBox();
				nowHash = 'main';
				$('#menuBox').fadeOut(600,function () {
					setImage.now(function () {
						$('#centerBox').fadeIn()
					});
					setImage.autoPlay();
				});
				targetHash = 'menu';
				window.location.hash = '';
				break;
			case 'executive' :
				$('.menu').addClass('sonStyle');
				nowHash = 'executive';
				execPage.now();
				window.location.hash = '';
				targetHash = 'menu';
				break;
			default:
				break;
		}
	}

	// 当窗口大小调整的时候，调整背景相关设置
	window.onresize = function () {
		switch (nowHash) {
			case 'menu': 
				menuPage.rePos();
				break;
			case 'main':
				setImage.rePos();
				break;
			case 'executive':
				execPage.rePos();
				break;
			default:
				// statements_def
				break;
		}
	}



})()