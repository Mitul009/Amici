$(document).ready(function () {
	const $body = $('body');
	const MathUtils = {
		lerp: (a, b, n) => (1 - n) * a + n * b,
		distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
	};
	const getMousePos = (ev) => {
		let posx = 0;
		let posy = 0;
		if (!ev) ev = window.event;
		if (ev.pageX || ev.pageY) {
			posx = ev.pageX;
			posy = ev.pageY;
		} else if (ev.clientX || ev.clientY) {
			posx = ev.clientX + $body.scrollLeft() + $(document).scrollLeft();
			posy = ev.clientY + $body.scrollTop() + $(document).scrollTop();
		}
		return { x: posx, y: posy };
	};
	let mousePos = { x: 0, y: 0 },
		lastMousePos = { x: 0, y: 0 },
		cacheMousePos = { x: 0, y: 0 };
	$(window).on("mousemove", function (ev) {
		mousePos = getMousePos(ev);
	});
	const getMouseDistance = () =>
		MathUtils.distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);
	class Image {
		constructor(el) {
			this.$el = $(el);
			this.defaultStyle = {
				scale: 1,
				x: 0,
				y: 0,
				opacity: 0,
			};
			this.getRect();
		}
		getRect() {
			this.rect = this.$el[0].getBoundingClientRect();
		}
		isActive() {
			return gsap.isTweening(this.$el[0]) || this.$el.css("opacity") != 0;
		}
	}
	class ImageTrail {
		constructor() {
			this.$content = $(".content");
			this.images = [];
			this.$content.find("img").each((i, img) => {
				this.images.push(new Image(img));
			});
			this.imagesTotal = this.images.length;
			this.imgPosition = 0;
			this.zIndexVal = 1;
			this.threshold = 100;
			requestAnimationFrame(() => this.render());
		}
		render() {
			if ($body.hasClass("menu_open")) {
				requestAnimationFrame(() => this.render());
				return;
			}
			let distance = getMouseDistance();
			cacheMousePos.x = MathUtils.lerp(
				cacheMousePos.x || mousePos.x,
				mousePos.x,
				0.1
			);
			cacheMousePos.y = MathUtils.lerp(
				cacheMousePos.y || mousePos.y,
				mousePos.y,
				0.1
			);
			if (distance > this.threshold) {
				this.showNextImage();

				++this.zIndexVal;
				this.imgPosition =
					this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;

				lastMousePos = { ...mousePos };
			}
			let isIdle = true;
			for (let img of this.images) {
				if (img.isActive()) {
					isIdle = false;
					break;
				}
			}
			if (isIdle && this.zIndexVal !== 1) {
				this.zIndexVal = 1;
			}
			requestAnimationFrame(() => this.render());
		}
		showNextImage() {
			const img = this.images[this.imgPosition];
			gsap.killTweensOf(img.$el[0]);
			img.getRect();

			new gsap.timeline()
				.set(img.$el, {
					startAt: { opacity: 0, scale: 1 },
					opacity: 1,
					scale: 1,
					zIndex: this.zIndexVal,
					x: cacheMousePos.x - img.rect.width / 2,
					y: cacheMousePos.y - img.rect.height / 2,
				})
				.to(img.$el, {
					duration: 0.9,
					ease: "expo.out",
					x: mousePos.x - img.rect.width / 2,
					y: mousePos.y - img.rect.height / 2,
				})
				.to(
					img.$el,
					{
						duration: 1,
						ease: "power1.out",
						y: "200%", 
					},
					0.9
				);
		}
	}
	const preloadImages = () => {
		return new Promise((resolve, reject) => {
			imagesLoaded($(".content__img"), resolve);
		});
	};
	preloadImages().then(() => {
		new ImageTrail();
	});
});
