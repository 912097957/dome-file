//自调用函数-----食物
(function () {
    let element = [];//用来保存小方块食物
    //食物就是一个对象,有宽高颜色横纵坐标.先定义构造函数,然后创建对象
    function Food(width, height, x, y, color) {
        //食物的大小
        this.width = width || 20;
        this.height = height || 20;
        //食物的横纵坐标
        this.x = x || 0;
        this.y = y || 0;
        //食物颜色
        this.color = color || "blue";
    }

    //为食物原型添加初始化的方法(作用:食物在地图上显示)
    //因为食物要在地图上显示,所以需要地图(div的各种属性)
    Food.prototype.init = function (map) {
        //初始化之前先删除这个食物(调用删除函数)
        remove();
        //创建div
        let div = document.createElement("div");
        //设置div样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //先脱离文档流
        div.style.position = "absolute";
        //把div加入到地图中
        map.appendChild(div);
        //产生随机横纵坐标
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        //把div加入到数组element中
        element.push(div);
    };

    //私有的函数---删除食物的方法
    function remove() {
        //element数组中有这个食物
        for (let i = 0; i < element.length; i++) {
            let ele = element[i];
            //找到这个子元素的父级元素,然后删除子元素(页面中的食物)
            ele.parentNode.removeChild(ele);
            //再次把element中的这个子元素也要删除(删除数组中的元素)
            element.splice(i, 1);
        }
    }

    //把这个构造函数暴露给window,外部可以使用
    window.Food = Food;
}());

//自调用函数-----蛇
(function () {
    let elements = [];//存放小蛇的每个身体

    //小蛇的样式的构造函数
    function Snake(width, height, direction) {
        //小蛇的每个部分的宽
        this.width = width || 20;
        this.height = height || 20;
        //小蛇的身体
        this.body = [
            {x: 3, y: 2, color: "red"},//头
            {x: 2, y: 2, color: "orange"},//身体
            {x: 1, y: 2, color: "orange"},//身体
        ];
        //小蛇的方向
        this.direction = direction || "right";
    }

    //为原型添加方法---小蛇初始化
    Snake.prototype.init = function (map) {
        //每次移动创建小蛇先删除下面的
        remove();
        for (let i = 0; i < this.body.length; i++) {
            //数组中的每个元素都是对象
            let obj = this.body[i];
            //创建div
            let div = document.createElement("div");
            //div加入地图
            map.appendChild(div);
            //设置div的样式
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            //横纵坐标
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";

            //背景颜色
            div.style.backgroundColor = obj.color;
            //方向暂时不定
            //把div加入到数组中---目的是为了删除
            elements.push(div);
        }
    }

    //为原型添加方法---小蛇动起来
    Snake.prototype.move = function (food, map) {
        //改变小蛇身体的坐标位置
        let i = this.body.length - 1;//2
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //蛇头需要判断方向
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }
        //判断小蛇是否吃到食物(蛇的头部是否和食物的坐标重合)
        let headX = this.body[0].x * this.width;
        let headY = this.body[0].y * this.height;
        let foodX = food.x;
        let foodY = food.y;
        //判断小蛇的坐标是否和食物坐标重合
        if (headX === food.x && headY === food.y) {
            //获取小蛇的尾巴
            let last = this.body[this.body.length - 1];
            //把最后的蛇尾复制一个加入到原有的身体里(要以对象的形式加)
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            //初始化食物
            food.init(map);
        }
    };

    //删除小蛇的私有函数
    function remove() {
        //获取数组---倒循环
        let i = elements.length - 1;
        for (; i >= 0; i--) {
            //先从当前的子元素中找到子元素的父级元素,在弄死这个子元素
            let ele = elements[i];
            //从地图上删除这个子元素div
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }

    //把Snake暴露给window
    window.Snake = Snake;
}());

//自调用函数----game对象
(function () {
    let that = null;//强行指定this

    //Game构造函数
    function Game(map) {
        this.food = new Food();//食物对象
        this.snake = new Snake();//小蛇对象
        this.map = map;//地图
        that = this;//保存当前是实例对象到that变量中,此时that就是this;
    }

    //添加原型方法---初始化游戏
    Game.prototype.init = function () {
        //食物初始化
        this.food.init(this.map);
        //小蛇初始化
        this.snake.init(this.map);
        //调用自动移动小蛇
        this.runSnake(this.food, this.map);
        //调用按键方法
        this.bindKey();
    };

    //添加原型方法---设置小蛇自动跑起来----先移动后判定,再初始化小蛇
    Game.prototype.runSnake = function (food, map) {
        //自动的去移动
        let timeId = setInterval(function () {
            //此时的this是window
            //移动小蛇
            this.snake.move(food, map);
            //横坐标的最大值
            let maxX = map.offsetWidth / this.snake.width;
            //纵坐标的最大值
            let maxY = map.offsetHeight / this.snake.height;
            //小蛇的头的坐标
            let headX = this.snake.body[0].x;
            let headY = this.snake.body[0].y;
            console.log(maxX)
            console.log(maxY)
            //横坐标
            if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
                //撞墙了,停止定时器
                clearInterval(timeId);
                let box = document.querySelector("#box");
                box.style.display = "block";
            } else {
                //初始化小蛇
                this.snake.init(map);
            }
        }.bind(that), 100);
    }

    //添加原型方法---获取用户按键
    Game.prototype.bindKey = function () {
        document.addEventListener("keydown", function (e) {
            //获取按键的值
            switch (e.keyCode) {
                    //这里面的this指向的是document
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }
        }.bind(that), false);
    }

    //暴露给window
    window.Game = Game;
}());

//实例化Game对象
let game = new Game(document.querySelector(".map"));
game.init();
