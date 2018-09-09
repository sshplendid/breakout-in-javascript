// painter.js

class Painter {
  constructor(canvasElement, x, y, w, h) {
    if(canvasElement instanceof HTMLCanvasElement) this.el = canvasElement;
    else throw new Error(`argument is not a HTML canvas element!`);
    
    this.x = x || undefined;
    this.y = y || undefined;
    this.w = w || undefined;
    this.h = h || undefined;
    this.context = this.el.getContext('2d');
  }

  clear(x, y, w, h) {
    const _x = x || this.x;
    const _y = y || this.y;
    const _w = w || this.w;
    const _h = h || this.h;

    this.context.clearRect(_x, _y, _w, _h);
  }
  drawCircle(x, y, radius, color) {
    try {
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, Math.PI*2);
      this.context.fillStyle = color || 'black';
      this.context.fill();
      this.context.closePath();
    } catch(err) {
      console.error(err.message);
      return false;
    }
    return true;
  }
  drawRectangle(x, y, width, height, color) {
    try {
      this.context.beginPath();
      this.context.rect(x, y, width, height);
      this.context.fillStyle = color || 'black';
      this.context.fill();
      this.context.closePath();
    } catch(err) {
      console.error(err.message);
      return false;
    }
    return true;
  }
  draw(shape) {
    const _ = shape;
    try {
      if(!_.x && !_.y)
      throw new Error(`그리기 시작할 좌표가 없습니다!`);
      
      if(!!_.radius) this.drawCircle(_.x, _.y, _.radius, _.color);
      else if(!!_.width && !!_.height) this.drawRectangle(_.x, _.y, _.width, _.height, _.color);
      else throw new Error(`무슨 도형인지 모르겠습니다ㅠㅠ => ${shape}`);
    } catch(err) {
      console.error(err.message);
      return false;
    }
    return true;
  }
}

module.exports = CanvasWrapper;