//Raster by galo canizares (b.1989)

const vs = 
"attribute vec3 aPosition;attribute vec2 aTexCoord;varying vec2 vTexCoord;void main() {vTexCoord = aTexCoord;vec4 positionVec4 = vec4(aPosition, 1.0);positionVec4.xy = positionVec4.xy * 2.0 - 1.0;gl_Position = positionVec4;}";

const fsn = "precision highp float;precision highp sampler2D;uniform sampler2D l;uniform vec2 i;uniform float j;float e(vec2 a){return fract(1e+4*sin(17.*a.x+a.y*.1)*(.1+abs(sin(a.y*13.+a.x))));}float m(vec2 d){vec2 a=floor(d),b=fract(d);float f=e(a),h=e(a+vec2(1.,0.)),k=e(a+vec2(0.,1.)),n=e(a+vec2(1.,1.));vec2 c=b*b*(3.-2.*b);return mix(f,h,c.x)+(k-f)*c.y*(1.-c.x)+(n-h)*c.x*c.y;}float g(vec2 b,float c,float a){float d=2./a*m(b)+c-1./a,f=clamp(floor(a*d)/(a-1.),0.,1.);return f;}void main(){vec2 h=gl_FragCoord.xy/i.xy;h.y=1.-h.y;vec2 c=gl_FragCoord.xy/j,k=i.xy/j,d=floor(c)/k;d.y=1.-d.y;vec3 a=pow(texture2D(l,d).rgb,vec3(2.2));vec2 b=floor(c.xy+.5);vec3 f=vec3(g(b,a.r,3.),g(b,a.g,3.),g(b,a.b,3.));f.rgb=pow(f,vec3(.454545)),gl_FragColor=vec4(f,1.);}";

const fs = "precision highp float;precision highp sampler2D;uniform sampler2D G,h;uniform float i,w,x,j,H,I,J,K;uniform vec2 m,L;const vec2 y=vec2(37.,17.),z=vec2(59.,83.);vec4 A(vec2 a){float b=texture2D(h,(a+.5)/m).r,c=texture2D(h,(a+.5+y)/m).r,d=texture2D(h,(a+.5+z)/m).r,e=texture2D(h,(a+.5+y+z)/m).r;return vec4(b,c,d,e);}vec4 M(vec4 a){return 1.792843-.853735*a;}float R(float a){return 1.792843-.853735*a;}vec4 g(float d,vec4 c){const vec4 e=vec4(1.,1.,1.,-1.);vec4 a,b;a.xyz=floor(fract(vec3(d)*c.xyz)*7.)*c.z-1.,a.w=1.5-dot(abs(a.xyz),e.xyz),b=vec4(lessThan(a,vec4(0.))),a.xyz=a.xyz+(b.xyz*2.-1.)*b.www;return a;}float B(vec4 c){const vec4 d=vec4(.138197,.276393,.41459,-.447214);vec4 C=floor(c+dot(c,vec4(.309017))),a=c-C+dot(C,d.xxxx),b;vec3 D=step(a.yzw,a.xxx),p=step(a.zww,a.yyz);b.x=D.x+D.y+D.z,b.yzw=1.-D,b.y+=p.x+p.y,b.zw+=1.-p.xy,b.z+=p.z,b.w+=1.-p.z;vec4 N=clamp(b,0.,1.),O=clamp(b-1.,0.,1.),P=clamp(b-2.,0.,1.),q=a-P+d.xxxx,r=a-O+d.yyyy,s=a-N+d.zzzz,t=a+d.wwww;float Q=A(c.zx).z;vec4 f=A(c.xy),e=vec4(.003401,.020408,.142857,0.),k=g(Q,e),l=g(f.x,e),n=g(f.y,e),o=g(f.z,e),E=g(f.w,e),F=M(vec4(dot(k,k),dot(l,l),dot(n,n),dot(o,o)));k*=F.x,l*=F.y,n*=F.z,o*=F.w,E*=R(dot(E,E));vec3 u=max(.6-vec3(dot(a,a),dot(q,q),dot(r,r)),0.);vec2 v=max(.6-vec2(dot(s,s),dot(t,t)),0.);u=u*u,v=v*v;return 49.*(dot(u*u,vec3(dot(k,a),dot(l,q),dot(n,r)))-dot(v*v,vec2(dot(o,s),dot(E,t))));}void main(){vec2 c=gl_FragCoord.xy/m.xy;c.y=1.-c.y;float k=m.x/m.y;vec2 b=L;b.x*=k;vec2 a=(floor(c*L)+0.5)/L;vec3 d=texture2D(G,a).rgb;float e=B(vec4(H+a.x*w,a.y*K,j*cos(i),j*sin(i))),f=B(vec4(a.x*J,I+a.y*w,j*sin(i),j*cos(i)));vec2 l=vec2(e*x,f*x);d=texture2D(G,(a+l)*0.986).rgb,gl_FragColor=vec4(d,.4);}";//floor(c*b)/b or floor(c*L+0.5)/L

let queryString = new URLSearchParams(window.location.search);

function genTokenData(projectNum) {
  let data = {};
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = queryString.get("hash"); //document.getElementById('ab-hash').value.toString();//"0x2b0da3741e9e4fc312c6783d9c30453adbb65320e09d3d0437405590dc2598c4"//hash;
  data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
  return data;
}

let tokenData = genTokenData(123);
let VH = parseInt(queryString.get("height")) || 720;
let SP = parseFloat(queryString.get("speed")) || 0.2;
let FR = parseInt(queryString.get("frames")) || 90;

let projectNumber = Math.floor(parseInt(tokenData.tokenId) / 1000000);
let mintNumber = parseInt(tokenData.tokenId) % 1000000;
let R;

let PH = VH;
let PW = VH * 0.75;
let DW = 750;
let DH = 1000;
let M = window.innerWidth >= window.innerHeight ? (PH / DH) : (PW / DW);
let can, buffA, buffB, buffC, shA, shB;
let gestures = [];
let palette;
let pts = [];
let brush, brushes, grid, bkg, bord, bc, bt, xoff, yoff, w, h, cols, nx, ny;
let t = 0;
let id = 0;
let totalFrames = FR;
let dot = Math.round(1.0*M*4)/4 > 0 ? Math.round(1.0*M*4)/4 : 0.25;
let tdot = dot;
let pause = false;
let npg;

//recording
let rec = false;
let recPNG = false;
let recButton;
let imgs = [];
let frameStep = 0;
let recFrames = 0;

const colorPalettes = {
  library:["BB6100","ffba08","3f88c5","f5dfbb","F1A644","F7EDE2","F0CB94"],
  beach:["005C8E","d62828","eae2b7","fcbf49","D5CC9D","E4F9FF","B6E1F0"],
  airport:["0081a7","00afb9","fdfcdc","fed9b7","f07167","E7FDFF","E1E1E1"],
  museum:["2b2d42","8d99ae","edf2f4","ef233c","d90429","F3F3F3","D1CCC1"],
  desert:["FCC223","92140c","FFE5C7","FFCF99","BA6F2E","FFF2E6","FFE3A8"],
  gallery:["FAC021","B00000","7D67E7","FFE3C3","A0B2D5","F0F0F0","D5D5D5"],
  lounge:["83289C","7577BD","B6D6CC","F1FEC6","FF553E","F7F5E1","FDD474"],
  garden:["DE8E43","E8DAB2","4F6D7A","DCDF7A","6AB846","EBF7E1","BBFFB7"],
  party:["072ac8","1e96fc","a2d6f9","fcf300","ffc600","FFF7FB","FFBED7"]
};
//generative features
const palettes = Object.keys(colorPalettes);

function col(p) {
  let c = p[floor(R.random_int(0,4))];
  return '#'+ c;
}

function setup() {
  window.innerHeight <= window.innerWidth ? (w = max(PH, 1) * 0.75, h = max(PH, 1)) : (w = max(PW, 1), h = max(PW, 1) / 0.75);
  can = createCanvas(w, h, WEBGL);
  buffB = createGraphics(w, h, WEBGL);
  buffA = createGraphics(w, h, WEBGL);
  buffA.setAttributes({alpha: true});
  buffC = createGraphics(w, h, WEBGL);
  buffC.setAttributes({alpha: true});
  console.log(dot)
  pixelDensity(1);
  buffA.pixelDensity(1);
  buffB.pixelDensity(1);
  buffC.pixelDensity(1);
  setAttributes({alpha: true});
  buffB.setAttributes({alpha: true});
  
  //buffA._renderer.GL.enable(_renderer.GL.BLEND);
  npg = createGraphics(512, 512);
  npg.pixelDensity(1);
  
  frameRate(30);
  
  shA = createShader(vs, fsn);
  shB = buffB.createShader(vs, fs);
  
  brush = createGraphics(50, 50);
  brush.pixelDensity(1);
  
  R = new Random();
      
  cols = palettes[int(R.random_dec()*9)];
  palette = colorPalettes[cols];
  grid = R.random_choice([1.0, 2.0, 3.0, 4.0, 6.0, 8.0]);
  pixl = R.random_choice([64.0, 128.0, 256.0, 256.0, 512.0, 640.0]);
  nx = R.random_choice([3, 3, 6, 9, 9, 12]);
  ny = R.random_choice([2, 4, 8, 16, 16, 32]);
  bord = R.random_dec() > 0.1;
  bt = R.random_dec() > 0.3;
  brushes = R.random_choice([12, 18, 18, 24, 24, 24]);

  xoff = R.random_int(0, 9000);
  yoff = R.random_int(0, 9000);
  
  randomSeed(xoff*yoff);
  drawNoise(npg);
  
  bc = "#" + palette[6];
  bkg = "#" + palette[5];
  buffC.noStroke();
  buffC.background(bkg);
  buffA.noStroke();
  buffA.clear();
  buffA.background(bkg);

  recButton = createButton('RECORDING LOOP');
  recButton.center();
  recButton.style('display', 'none');
  recButton.style('text-align', 'center');

  for (let i = 0; i < totalFrames; i++) {
    let f = createGraphics(w, h);
    f.noSmooth();
    imgs.push(f);
  }

  initPts(brushes);
  //addGesture();
  
  let canv = document.getElementById("defaultCanvas0");
  canv.style.imageRendering = "pixelated";
  canv.imageSmoothingEnabled = false;
  
  console.log({
    "Hash": tokenData.hash,
    "Palette": cols,
    "Warped Subdivisions": grid,
    "Secondary Resolution": pixl,
    "Margin": bord || (grid == 1.0) ? "yes" : "no",
    "Saturated Border?": (grid == 1.0 || bt || !bord) ? "no" : "yes",
    "Chaos X": nx,
    "Chaos Y": ny,
    "No. of Brushes": brushes
  }, "RASTER by Galo Canizares (b. 1989)", SP);
}

function draw() {

    if (frameStep > totalFrames - 1) {
        frameStep = 0;
    }
  t = (1.0 * frameCount / totalFrames) * (TWO_PI);
  shader(shA);
  shA.setUniform("i", [w, h]);
  shA.setUniform("l", buffC);
  //shA.setUniform("tex1", npg);
  shA.setUniform("j", dot);
  rect(-width / 2, -height / 2, width, height);
  
  buffB.shader(shB);
  shB.setUniform("m", [w, h]);
  shB.setUniform("L", [pixl, DH/abs(10-grid)]);
  shB.setUniform("G", buffC);
  shB.setUniform("h", npg);
  shB.setUniform("i", t);
  shB.setUniform("K", nx);
  shB.setUniform("J", ny);
  shB.setUniform("w", grid);
  shB.setUniform("x", 0.2);
  shB.setUniform("j", 0.005);
  shB.setUniform("H", xoff);
  shB.setUniform("I", yoff);
  buffB.rect(-width/2, -height/2, width, height);
  
  buffC.image(buffB,-width/2, -height/2, width, height);
  buffC.image(buffA,-width/2, -height/2, width, height);
  buffC.noFill();
  buffC.stroke((grid == 1.0 || bt || !bord) ? bkg : bc);
  buffC.strokeWeight(bord || (grid == 1.0) ? (width/18) : 0);
  buffC.rect(-width/2, -height/2, width, height);
  image(buffC, -width/2, -height/2, width, height);

  imgs[frameStep].image(get(), 0, 0, w, h);

  for (let i = 0; i < gestures.length; i++) {
    gestures[i].animGesture();
    gestures[i].drawGesture(buffA);
  }
  
  if (frameCount % 30 == 0 && gestures.length < pts.length) {
    addGesture();
  }
  if (frameCount % 15 == 0) {
    buffA.clear();
  }

  frameStep += 1;

  if (rec === true) {
    let c = color(abs(sin(frameCount * 0.5)) * 255, 200, 0);
    recButton.style('display', 'block');
    recButton.style('color', c);
  } else {
    recButton.style('display', 'none');
    recButton.style('color', '#FFFFFF');
  }
  // if (frameCount == 600) {
  //   noLoop();
  // }
  if (recPNG === true) {
    frameRate(1);
    saveCanvas(imgs[frameStep-1], 'raster'+frameStep, 'png');
  } else {
    frameRate(30);
  }
}

function addGesture() {
  let g = new Gesture(SP, R.random_int(50*M, 150*M), col(palette));
  if (id < pts.length-1) {
    g.initGesture(18, pts[id], pts[id+1]);
    gestures.push(g);
    id++;
  }
}

function drawNoise(g) {
  g.loadPixels();
  for(let y = 0; y < g.width; y++){
    for(let x = 0; x < g.height; x++){
      const idx = 4 * (g.width * y + x);
      g.pixels[idx] = 255*random();
      g.pixels[idx+3] = 255;
    }
  }
  g.updatePixels();
}

function drawBrush(pg, r, g, b, a) {
  pg.pixelDensity(1)
  pg.clear();
  // g.loadPixels();
  // for(let y = 0; y < g.width; y++){
  //   for(let x = 0; x < g.height; x++){
  //     let distCenter = dist(x, y, g.width/2, g.height/2);
  //     let d = map(distCenter, 0, g.width/2, 0, 255)
  //     let c = color(r, gg, b, a);
  //     g.set(x, y, c);
  //   }
  // }
  //g.updatePixels();
  pg.loadPixels();
  for(let y = 0; y < pg.width; y++){
    for(let x = 0; x < pg.height; x++){
      const idx = 4 * (pg.width * y + x);
      let distCenter = dist(x, y, pg.width/2, pg.height/2);
      let d = map(distCenter, 0, pg.width/2, 0, 255)
      pg.pixels[idx] = r;
      pg.pixels[idx+1] = g;
      pg.pixels[idx+2] = b;
      pg.pixels[idx+3] = (255-d)*(a/255);
    }
  }
  pg.updatePixels();
  // pg.fill(r, g, b, 255);
  // pg.noStroke();
  // pg.ellipse(pg.width/2, pg.height/2, pg.width, pg.height);
}

// function snapToGrid(pt, g) {
//   let cell = round(pt / (w/g));
//   return cell * (w/g);
// }

function shuff(array) {
  let m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function initPts(num) {
  for (let y = DH/10*M; y < DH*M; y+=DH/5*M) {
    for (let x = DW/10*M; x < DW*M; x+=DW/5*M) {
      let pt = new Point(x-width/2, y-height/2);      
      pts.push(pt);
      //buffC.fill(0);
      //buffC.ellipse(pt.x, pt.y, 20*M, 20*M);
    }
  }
  pts = shuff(pts).slice(0, num);
  //console.log(pts);
  // for (let i = 0; i < pts.length; i++) {
  //   fill(255);
  //   buffC.ellipse(pts[i].x, pts[i].y, 10*M, 10*M);
  // }
//   for(let i = 0; i < num; i++) {
//     let pt;// = new Point((R.random_int(0, DW*M)), (R.random_int(0, DH*M)));
//     if (i % 2 == 0) {
//       pt = new Point(randomGaussian(DW/2*M, DW*M), randomGaussian(DH/2*M, DH*M));
//     } else {
//       pt = new Point(randomGaussian(DW/2*M, DW/6*M), randomGaussian(DH/2*M, DH/6*M));
//     }
     
//     if (pt.x <= 0) pt.x = w/18;
//     if (pt.x >= w) pt.x = w-(w/18);
//     if (pt.y <= 0) pt.y = h/18;
//     if (pt.y >= w) pt.y = h-(h/18);
//     pts.push(pt);
//     let hit = false;

//     for (let j = 0; j < pts.length; j++) {
//       let other = pts[j];
//       if (pt != other) {
//         if ((pt.x == other.x && pt.y == other.y)) {
//           hit = true;
//         }
//       }
//     }
//     if (!hit) {
//       pts.push(pt);
//       fill(255)
//       buffC.ellipse(pt.x, pt.y, 10*M, 10*M);
//     }
//  }
  
}

function keyPressed() {
  switch (key) {
    case '1':
      dot = tdot * 1.0;
      break;
    case '2':
      dot = tdot * 4.0;
      break;
    case '4':
      dot = tdot * 16.0;
      break;
    case '8':
      dot = tdot * 32.0;
      break;
    case 's':
      save("RASTER-" + tokenData.hash + ".png");
      break;
    case 'p':
      pause = !pause;
      pause ? noLoop() : loop();
      break;
    case 'r':
      buffC.background(bkg);
      break;
    case 'n':
        makePNG();
        break;
    case 'g':
      hitRecord();
      makeGIF();
      break;
  }
}

function mousePressed() {
  pause = !pause;
  pause ? noLoop() : loop();
}

//gif recording
const hitRecord = () => {
    rec = !rec;
}
  
const makeGIF = () => {
    let gif = new CCapture({
        format: 'gif',
        workersPath: './',
        framerate: 30,
        quality: 0
    });
    gif.start();
    for (let i = 0; i < totalFrames; i++) {
        gif.capture(imgs[i].canvas);
    }
    gif.stop();
    gif.save(function(b) {
        window.open(URL.createObjectURL(b));
        let link = document.createElement('a');
        document.body.appendChild(link);
        link.download = 'RASTER-'+ tokenData.hash +'.gif';
        link.href = URL.createObjectURL(b);
        link.click();
        document.body.removeChild(link);
        hitRecord();
    });
}

const makePNG = () => {
  recPNG = !recPNG;
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Gesture {
  constructor(speed, radius, color){
    this.pts = [];
    this.curr = [0, 0];
    this.dist = [0, 0];
    //object that holds temporary targets
    this.temp = {
      beginX: 0.0,
      beginY: 0.0,
      endX: 0.0,
      endY: 0.0
    }
    this.col = color;
    this.radi = radius;
    this.step = speed;
    this.traveled = 0.0;
    this.next = 0;
  }
  //initialize a new gesture
  initGesture(pnts, ps, pe) {
    let start = [ps.x, ps.y];
    let control;
    if (brushes == 12) {
      control = [0, 0];
    } else {
      control = [R.random_int(0,DW*M)-width/2, R.random_int(0,DH*M)-height/2];
    }
    let end = [pe.x, pe.y];

    //draw bezier with points along it
    this.pts = this.drawBezier(start, control, end, pnts);
      
    if (this.pts.length > 0) {
      this.temp.beginX = this.pts[0].x;
      this.temp.beginY = this.pts[0].y;
      this.temp.endX = this.pts[1].x;
      this.temp.endY = this.pts[1].y;
      this.dist[0] = this.temp.endX - this.temp.beginX;
      this.dist[1] = this.temp.endY - this.temp.beginY;
      this.curr[0] = this.temp.beginX;
      this.curr[1] = this.temp.beginY;
    }

    
    }
  //update the gesture movement
  animGesture() {
    this.traveled += this.step;
    if (this.traveled < 1.0) {
      this.curr[0] = this.temp.beginX + this.traveled * this.dist[0];
      this.curr[1] = this.temp.beginY + this.traveled * this.dist[1];
    } else if (this.traveled >= 1.0) {
      this.nextPt();
      this.traveled = 0.0;
    }
  }
  //draw the gesture
  drawGesture(b) {
    b.fill(this.col);
    b.noStroke();
    //b.stroke(this.col);
    //b.strokeWeight(4*M);
    //b.tint(red(this.col), green(this.col), blue(this.col), 15);
    drawBrush(brush, red(this.col), green(this.col), blue(this.col), 15);
    b.blendMode(REPLACE);
    //b.imageMode(CENTER);
    //b.image(brush, this.curr[0], this.curr[1], this.radi, this.radi);
    b.push();
    b.texture(brush);
    b.translate(this.curr[0], this.curr[1]);
    b.plane(this.radi, this.radi);
    b.pop();
    //b.ellipse(this.curr[0], this.curr[1], this.radi, this.radi)
  }
  nextPt() {
      //move to next points
      if(this.next < this.pts.length - 1) {
        this.next += 1;
      } else if( this.next >= this.pts.length - 1){
        this.next = 0;
      }

      if(this.next < this.pts.length-1) {
        //update new targets
        this.temp.beginX = this.pts[this.next].x;
        this.temp.beginY = this.pts[this.next].y;
        this.temp.endX = this.pts[this.next+1].x;
        this.temp.endY = this.pts[this.next+1].y;
        //update distance
        this.dist[0] = this.temp.endX - this.temp.beginX;
        this.dist[1] = this.temp.endY - this.temp.beginY;
      } else if (this.next === this.pts.length - 1){
        //reset targets to beginning
        this.temp.beginX = this.pts[this.next].x;
        this.temp.beginY = this.pts[this.next].y;
        this.temp.endX = this.pts[0].x;
        this.temp.endY = this.pts[0].y;
        
      }
  }
  drawBezier(a, b, c, segments) {
    let path = [];
    for (let i = 0; i < segments; i++) {
      let t = i / Math.max(1, segments - 1);
      let point = this.qCurve(a, b, c, t);
      path.push(point);
    }
    return path;
  }
  qCurve(start, control, end, t) {
    let x1 = start[0];
    let y1 = start[1];
    let x2 = control[0];
    let y2 = control[1];
    let x3 = end[0];
    let y3 = end[1];

    let dt = 1 - t;
    let dtSq = dt * dt;
    let tSq = t * t;
    
    let output = [];
    output[0] = dtSq * x1 + 2 * dt * t * x2 + tSq * x3;
    output[1] = dtSq * y1 + 2 * dt * t * y2 + tSq * y3;
    output[0] += R.random_int(-10*M, 10*M);
    output[1] += R.random_int(-10*M, 10*M);
    return createVector(output[0], output[1]);
  }
}

class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substr(0, 8), 16);
      let b = parseInt(uint128Hex.substr(8, 8), 16);
      let c = parseInt(uint128Hex.substr(16, 8), 16);
      let d = parseInt(uint128Hex.substr(24, 8), 16);
      return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of tokenData.hash
    this.prngA = new sfc32(tokenData.hash.substr(2, 32));
    // seed prngB with second half of tokenData.hash
    this.prngB = new sfc32(tokenData.hash.substr(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}
