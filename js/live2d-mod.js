const
	GAME_W = window.innerWidth,
	GAME_H = window.innerHeight,
	GAME_RATIO = GAME_W / GAME_H,
	GAME_ORIENTATION = 'landscape'

const renderer = new PIXI.WebGLRenderer(GAME_W, GAME_H, { transparent: true, autoResize: true });
document.getElementById('live2d').appendChild(renderer.view);
const stage = new PIXI.Container();

//renderer.view.style.position = "fixed";
//renderer.view.style.bottom = "0px";
//renderer.view.style.right = "0px";
const haroFile = 'haru_02';

const modelHaru = {
	"type": "Live2D Model Setting",
	"name": "haru",
	"model": `../assets/haru/${haroFile}.moc`,
	"textures": [
		`../assets/haru/${haroFile}.1024/texture_00.png`,
		`../assets/haru/${haroFile}.1024/texture_01.png`,
		`../assets/haru/${haroFile}.1024/texture_02.png`
	],
	"physics": "../assets/haru/haru.physics.json",
	"pose": "../assets/haru/haru.pose.json",
	"expressions": [{
		"name": "f01",
		"file": "../assets/haru/expressions/f01.exp.json"
	}, {
		"name": "f02",
		"file": "../assets/haru/expressions/f02.exp.json"
	}, {
		"name": "f03",
		"file": "../assets/haru/expressions/f03.exp.json"
	}, {
		"name": "f04",
		"file": "../assets/haru/expressions/f04.exp.json"
	}, {
		"name": "f05",
		"file": "../assets/haru/expressions/f05.exp.json"
	}, {
		"name": "f06",
		"file": "../assets/haru/expressions/f06.exp.json"
	}, {
		"name": "f07",
		"file": "../assets/haru/expressions/f07.exp.json"
	}, {
		"name": "f08",
		"file": "../assets/haru/expressions/f08.exp.json"
	}],
	"layout": {
		// "center_x": -3,  //x偏移位置  -1|0|1 分别是  左移1|中间|右移动1
		// "y": 1.2, //x偏移位置  -1|0|1 分别是  上移1|中间|下移1
		// "width": 2 //
		"center_x": 0,  //x偏移位置  -1|0|1 分别是  左移1|中间|右移动1
		"y": 1.2, //x偏移位置  -1|0|1 分别是  上移1|中间|下移1
		"width": 2.9 //
	},
	"hit_areas": [{
		"name": "head",
		"id": "D_REF.HEAD"
	}, {
		"name": "body",
		"id": "D_REF.BODY"
	}],
	"motions": {
		"idle": [{
			"file": "../assets/haru/motions/idle_00.mtn",
			"fade_in": 2000,
			"fade_out": 2000
		}, {
			"file": "../assets/haru/motions/idle_01.mtn",
			"fade_in": 2000,
			"fade_out": 2000
		}, {
			"file": "../assets/haru/motions/idle_02.mtn",
			"fade_in": 2000,
			"fade_out": 2000
		}],
		"tap_body": [{
			"file": "../assets/haru/motions/tapBody_00.mtn",
			"sound": "../assets/haru/sounds/tapBody_00.mp3"
		}, {
			"file": "../assets/haru/motions/tapBody_01.mtn",
			"sound": "../assets/haru/sounds/tapBody_01.mp3"
		}, {
			"file": "../assets/haru/motions/tapBody_02.mtn",
			"sound": "../assets/haru/sounds/tapBody_02.mp3"
		}],
		"pinch_in": [{
			"file": "../assets/haru/motions/pinchIn_00.mtn",
			"sound": "../assets/haru/sounds/pinchIn_00.mp3"
		}],
		"pinch_out": [{
			"file": "../assets/haru/motions/pinchOut_00.mtn",
			"sound": "../assets/haru/sounds/pinchOut_00.mp3"
		}],
		"shake": [{
			"file": "../assets/haru/motions/shake_00.mtn",
			"sound": "../assets/haru/sounds/shake_00.mp3",
			"fade_in": 500
		}],
		"flick_head": [{
			"file": "../assets/haru/motions/flickHead_00.mtn",
			"sound": "../assets/haru/sounds/flickHead_00.mp3"
		}]
	}
};



// const sprite = new PIXI.Sprite.fromImage('./7_room2_a.jpg');
// stage.addChild(sprite);

// setTimeout(() => {
// 	const sprite2 = new PIXI.Sprite.fromImage('./pixiv4.jpg');
// 	sprite2.y = 350;
// 	stage.addChildAt(sprite2, 1);
// }, 1000)

const live2dSprite = new PIXI.Live2DSprite(modelHaru, {
	debugLog: true,
	randomMotion: true,
	eyeBlink: true,
	// audioPlayer: (...args) => console.log(...args)
});
stage.addChild(live2dSprite);

live2dSprite.x = -105;
live2dSprite.y = -150;

// live2dSprite.adjustScale(0, 0.6, 0.5);
live2dSprite.adjustScale(0.1, 0.1, 0.5);
live2dSprite.adjustTranslate(0, 0);

live2dSprite.startRandomMotion('idle');

live2dSprite.on('click', (evt) => {
	const point = evt.data.global;
	console.log('point ->', point);
	if (live2dSprite.hitTest('body', point.x, point.y)) {
		live2dSprite.startRandomMotionOnce('tap_body');
	}
	if (live2dSprite.hitTest('head', point.x, point.y)) {
		// live2dSprite.startRandomMotionOnce('flick_head');

		const musicArr = [
			'late in autumn.mp3',
			'クリスタルキング - 爱をとりもどせ!!.mp3',
			'恋人を射ち堕とした日.mp3', '星のカケラ.mp3'];

		const randomNum = Math.floor(Math.random() * 4);
		console.log('randomNum ->', randomNum);
		live2dSprite.playSound(musicArr[randomNum], 'sound/');
	}
});

live2dSprite.on('mousemove', (evt) => {
	const point = evt.data.global;
	live2dSprite.setViewPoint(point.x, point.y);
});

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}
animate();