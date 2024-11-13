const gamesOfSinus = `
// NOTE: https://www.shadertoy.com/view/M32BD1
// color pallette inspired by https://www.shadertoy.com/view/ls3Xzn 
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;
    
    float ph = 25. + (1. - uv.x) * 20.;
    float amp = 0.02 + uv.x / 5.;
    float y = 0.5 + sin(uv.x * ph + iTime) * amp;
    float c1 = 1. - smoothstep(0.003, 0.003 + exp(-(1. - uv.x) * 4.), abs(uv.y - y));
    float c2 = 1. - smoothstep(0.003, 0.003 + exp(-(uv.x) * 4.), abs(uv.y - y));
    float r = pow(1.0 - sqrt(abs(uv.y - c1)), sin(iTime) + 2.0);
    float g = pow(1.0 - sqrt(abs(uv.y - c2)), cos(iTime) + 2.0 );
    float b = 1.5 * (r+g);

    fragColor = vec4(r, g, b, r + g + b);
}
/** SHADERDATA
{
	"title": "The games of sinus :)",
	"author": "cesio",
	"description": "Sinusoid, color pallette inspired by https://www.shadertoy.com/view/ls3Xzn",
    "href": "https://www.shadertoy.com/view/M32BD1"
}
*/
`

const unyo = `
// Source: https://www.shadertoy.com/view/MX2BWR
// 球の距離関数
float sphereSDF(vec3 p, float radius) {
    return length(p) - radius;
}

// 立方体の距離関数
float boxSDF(vec3 p, vec3 size) {
    vec3 d = abs(p) - size;
    float outsideDistance = length(max(d, 0.0));
    float insideDistance = min(max(d.x, max(d.y, d.z)), 0.0);
    return outsideDistance + insideDistance;
}

// スムーズな最小値を計算する関数
float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

float sceneSDF(vec3 p) {
    float time = iTime;
    float d = 100.0;
    
    // 球の数を定義
    int numSpheres = 20;
    
    // 複数の球を生成して結合するためのループ
    for (int i = 0; i < numSpheres; i++) {
        float angle = float(i) * 1.1 + time; 
        vec3 spherePos = vec3(sin(angle), cos(angle * 1.5), sin(angle * 0.7));
        
        // 半径を変える
        float radius = 0.4 + 0.1 * float(i % 3);  // 球の半径を少し変化させる
        
        // 結合
        float dSphere = sphereSDF(p - spherePos, radius);
        d = smin(d, dSphere, 0.5);
    }
    
    return d;  // 最終的なSDFを返す
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    // 画面の座標を正規化
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    
    // カメラの設定
    vec3 cp = vec3(0.0, 0.0, -5.0);  // カメラの位置を近づける
    vec3 target = vec3(0.0, 0.0, 0.0); // 注目するターゲット
    vec3 cd = normalize(target - cp);   // カメラの向き
    vec3 cs = normalize(cross(cd, vec3(0.0, 1.0, 0.0)));  // カメラの右方向
    vec3 cu = normalize(cross(cs, cd)); // カメラの上方向
    
    // レイの方向
    vec3 rd = normalize(cs * uv.x + cu * uv.y + cd);  // 視野角調整
    
    // レイマーチングのループ
    float t = 0.0;
    float maxDistance = 100.0;
    int maxSteps = 100;
    float d;
    for (int i = 0; i < maxSteps; i++) {
        vec3 p = cp + t * rd;  // 現在のレイの位置
        d = sceneSDF(p);       // 距離を計算
        if (d < 0.001) break;  // 十分近づいたら終了
        t += d;                // レイを進める
        if (t > maxDistance) break;  // 最大距離を超えたら終了
    }
    
    // ヒットしたかどうかで色を決定
    vec3 color;
    if (t < maxDistance) {
        // オブジェクトがヒットしたらカラフルな色にする
        float r = 0.5 + 0.5 * sin(iTime + t);
        float g = 0.5 + 0.5 * cos(iTime + t * 1.3);
        float b = 0.5 + 0.5 * sin(iTime + t * 2.0);
        color = vec3(r, g, b);  // カラフルな色
    } else {
        color = vec3(0.0);  // ヒットしなかったら黒色
    }
    
    // 最終的なフラグメントの色を設定
    fragColor = vec4(color, 1.0);
}

`

const prettyHip = `
// NOTE: https://www.shadertoy.com/view/XsBfRW
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float aspect = iResolution.y/iResolution.x;
    float value;
	vec2 uv = fragCoord.xy / iResolution.x;
    uv -= vec2(0.5, 0.5*aspect);
    float rot = radians(45.0); // radians(45.0*sin(iTime));
    mat2 m = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
   	uv  = m * uv;
    uv += vec2(0.5, 0.5*aspect);
    uv.y+=0.5*(1.0-aspect);
    vec2 pos = 10.0*uv;
    vec2 rep = fract(pos);
    float dist = 2.0*min(min(rep.x, 1.0-rep.x), min(rep.y, 1.0-rep.y));
    float squareDist = length((floor(pos)+vec2(0.5)) - vec2(5.0) );
    
    float edge = sin(iTime-squareDist*0.5)*0.5+0.5;
    
    edge = (iTime-squareDist*0.5)*0.5;
    edge = 2.0*fract(edge*0.5);
    //value = 2.0*abs(dist-0.5);
    //value = pow(dist, 2.0);
    value = fract (dist*2.0);
    value = mix(value, 1.0-value, step(1.0, edge));
    //value *= 1.0-0.5*edge;
    edge = pow(abs(1.0-edge), 2.0);
    
    //edge = abs(1.0-edge);
    value = smoothstep( edge-0.05, edge, 0.95*value);
    
    
    value += squareDist*.1;
    //fragColor = vec4(value);
    fragColor = mix(vec4(1.0,1.0,1.0,1.0),vec4(edge,0.0,0.0,1.0), value);
    fragColor.a = clamp(value, 0.0, 1.0);
}
`

const mainImageDrawCircle = `
// NOTE: https://www.shadertoy.com/view/3tdSRn
vec3 drawCircle(vec2 pos, float radius, float width, float power, vec4 color)
{
    vec2 mousePos = iMouse.xy - vec2(0.5);
    float dist1 = length(pos);
    dist1 = fract((dist1 * 5.0) - fract(iTime));
    float dist2 = dist1 - radius;
    float intensity = pow(radius / abs(dist2), width); 
    vec3 col = color.rgb * intensity * power * max((0.8- abs(dist2)), 0.0);
    return col;
}

vec3 hsv2rgb(float h, float s, float v)
{
    vec4 t = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // // -1.0 ~ 1.0
    vec2 pos = (fragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
    
    float h = mix(0.5, 0.65, length(pos));
    vec4 color = vec4(hsv2rgb(h, 1.0, 1.0), 1.0);
    float radius = 0.5;
    float width = 0.8;
    float power = 0.1;
    vec3 finalColor = drawCircle(pos, radius, width, power, color);

    pos = abs(pos);
    // vec3 finalColor = vec3(pos.x, 0.0, pos.y);

    fragColor = vec4(finalColor, finalColor.r);
}
`

const cellular = `
// NOTE: https://www.shadertoy.com/view/Xs2GDd
#define PI 3.14159265359

vec3 col1 = vec3(0.216, 0.471, 0.698); // blue
vec3 col2 = vec3(1.00, 0.329, 0.298); // yellow
vec3 col3 = vec3(0.867, 0.910, 0.247); // red

float disk(vec2 r, vec2 center, float radius) {
	return 1.0 - smoothstep( radius-0.008, radius+0.008, length(r-center));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	float t = iTime*2.;
	vec2 r = (2.0*fragCoord.xy - iResolution.xy) / iResolution.y;
	r *= 1.0 + 0.05*sin(r.x*5.+iTime) + 0.05*sin(r.y*3.+iTime);
	r *= 1.0 + 0.2*length(r);
	float side = 0.5;
	vec2 r2 = mod(r, side);
	vec2 r3 = r2-side/2.;
	float i = floor(r.x/side)+2.;
	float j = floor(r.y/side)+4.;
	float ii = r.x/side+2.;
	float jj = r.y/side+4.;	
	
	vec3 pix = vec3(1.0);
	
	float rad, disks;
		
	rad = 0.15 + 0.05*sin(t+ii*jj);
	disks = disk(r3, vec2(0.,0.), rad);
	pix = mix(pix, col2, disks);

	float speed = 2.0;
	float tt = iTime*speed+0.1*i+0.08*j;
	float stopEveryAngle = PI/2.0;
	float stopRatio = 0.7;
	float t1 = (floor(tt) + smoothstep(0.0, 1.0-stopRatio, fract(tt)) )*stopEveryAngle;
		
	float x = -0.07*cos(t1+i);
	float y = 0.055*(sin(t1+j)+cos(t1+i));
	rad = 0.1 + 0.05*sin(t+i+j);
	disks = disk(r3, vec2(x,y), rad);
	pix = mix(pix, col1, disks);
	
	rad = 0.2 + 0.05*sin(t*(1.0+0.01*i));
	disks = disk(r3, vec2(0.,0.), rad);
	pix += 0.2*col3*disks * sin(t+i*j+i);

	pix -= smoothstep(0.3, 5.5, length(r));	
	fragColor = vec4(pix, disks);
}
`

const tiles = `
// Source: https://www.shadertoy.com/view/mdBSRt
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float aspect_ratio = iResolution.y/iResolution.x;
	vec2 uv = fragCoord.xy / iResolution.x;
    uv -= vec2(0.5, 0.5 * aspect_ratio);
    float rot = radians(-30. -iTime); // radians(45.0*sin(iTime));
    mat2 rotation_matrix = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
   	uv = rotation_matrix * uv;
    vec2 scaled_uv = 20.0 * uv; 
    vec2 tile = fract(scaled_uv);
    float tile_dist = min(min(tile.x, 1.0-tile.x), min(tile.y, 1.0-tile.y));
    float square_dist = length(floor(scaled_uv));
    
    float edge = sin(iTime-square_dist*20.);
    edge = mod(edge * edge, edge / edge);

    float value = mix(tile_dist, 1.0-tile_dist, step(1.0, edge));
    edge = pow(abs(1.0-edge), 2.2) * 0.5;
    
    value = smoothstep( edge-0.05, edge, 0.95*value);
    
    
    value += square_dist*.1;
    value *= 0.8 - 0.2;
    fragColor = vec4(pow(value, 2.), pow(value, 1.5), pow(value, 1.2), value);
}
`

const rainbow = `
// https://www.shadertoy.com/view/lscBRf
#define FALLING_SPEED  0.25
#define STRIPES_FACTOR 5.0

//get sphere
float sphere(vec2 coord, vec2 pos, float r) {
    vec2 d = pos - coord; 
    return smoothstep(60.0, 0.0, dot(d, d) - r * r);
}

//main
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    //normalize pixel coordinates
    vec2 uv         = fragCoord / iResolution.xy;
    //pixellize uv
    vec2 clamped_uv = (round(fragCoord / STRIPES_FACTOR) * STRIPES_FACTOR) / iResolution.xy;
    //get pseudo-random value for stripe height
    float value		= fract(sin(clamped_uv.x) * 43758.5453123);
    //create stripes
    vec3 col        = vec3(1.0 - mod(uv.y * 0.5 + (iTime * (FALLING_SPEED + value / 5.0)) + value, 0.5));
    //add color
         col       *= clamp(cos(iTime * 2.0 + uv.xyx + vec3(0, 2, 4)), 0.0, 1.0);
    //add glowing ends
    	 col 	   += vec3(sphere(fragCoord, 
                                  vec2(clamped_uv.x, (1.0 - 2.0 * mod((iTime * (FALLING_SPEED + value / 5.0)) + value, 0.5))) * iResolution.xy, 
                                  0.9)) / 2.0; 
    //add screen fade
         col       *= vec3(exp(-pow(abs(uv.y - 0.5), 6.0) / pow(2.0 * 0.05, 2.0)));
    // Output to screen
    fragColor       = vec4(col, col.r + col.g + col.b);
}
`

const star = `
// https://www.shadertoy.com/view/ttKGDt
precision highp float;


mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c,s,-s,c);
}

const float pi = acos(-1.0);
const float pi2 = pi*2.0;

vec2 pmod(vec2 p, float r) {
    float a = atan(p.x, p.y) + pi/r;
    float n = pi2 / r;
    a = floor(a/n)*n;
    return p*rot(-a);
}

float box( vec3 p, vec3 b ) {
    vec3 d = abs(p) - b;
    return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}

float ifsBox(vec3 p) {
    for (int i=0; i<5; i++) {
        p = abs(p) - 1.0;
        p.xy *= rot(iTime*0.3);
        p.xz *= rot(iTime*0.1);
    }
    p.xz *= rot(iTime);
    return box(p, vec3(0.4,0.8,0.3));
}

float map(vec3 p, vec3 cPos) {
    vec3 p1 = p;
    p1.x = mod(p1.x-5., 10.) - 5.;
    p1.y = mod(p1.y-5., 10.) - 5.;
    p1.z = mod(p1.z, 16.)-8.;
    p1.xy = pmod(p1.xy, 5.0);
    return ifsBox(p1);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 p = (fragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);

    vec3 cPos = vec3(0.0,0.0, -3.0 * iTime);
    // vec3 cPos = vec3(0.3*sin(iTime*0.8), 0.4*cos(iTime*0.3), -6.0 * iTime);
    vec3 cDir = normalize(vec3(0.0, 0.0, -1.0));
    vec3 cUp  = vec3(sin(iTime), 1.0, 0.0);
    vec3 cSide = cross(cDir, cUp);

    vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir);

    // Phantom Mode https://www.shadertoy.com/view/MtScWW by aiekick
    float acc = 0.0;
    float acc2 = 0.0;
    float t = 0.0;
    for (int i = 0; i < 99; i++) {
        vec3 pos = cPos + ray * t;
        float dist = map(pos, cPos);
        dist = max(abs(dist), 0.02);
        float a = exp(-dist*3.0);
        if (mod(length(pos)+24.0*iTime, 30.0) < 3.0) {
            a *= 2.0;
            acc2 += a;
        }
        acc += a;
        t += dist * 0.5;
    }

    vec3 col = vec3(acc * 0.01, acc * 0.011 + acc2*0.002, acc * 0.012+ acc2*0.005);
    fragColor = vec4(col, 1.0 - t * 0.03);
}
`

const fractalPyramid = `
// NOTE: https://www.shadertoy.com/view/tsXBzS
vec3 palette(float d){
	return mix(vec3(0.2,0.7,0.9),vec3(1.,0.,1.),d);
}

vec2 rotate(vec2 p,float a){
	float c = cos(a);
    float s = sin(a);
    return p*mat2(c,s,-s,c);
}

float map(vec3 p){
    for( int i = 0; i<8; ++i){
        float t = iTime*0.2;
        p.xz =rotate(p.xz,t);
        p.xy =rotate(p.xy,t*1.89);
        p.xz = abs(p.xz);
        p.xz-=.5;
	}
	return dot(sign(p),p)/5.;
}

vec4 rm (vec3 ro, vec3 rd){
    float t = 0.;
    vec3 col = vec3(0.);
    float d;
    for(float i =0.; i<64.; i++){
		vec3 p = ro + rd*t;
        d = map(p)*.5;
        if(d<0.02){
            break;
        }
        if(d>100.){
        	break;
        }
        //col+=vec3(0.6,0.8,0.8)/(400.*(d));
        col+=palette(length(p)*.1)/(400.*(d));
        t+=d;
    }
    return vec4(col,1./(d*100.));
}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-(iResolution.xy/2.))/iResolution.x;
	vec3 ro = vec3(0.,0.,-50.);
    ro.xz = rotate(ro.xz,iTime);
    vec3 cf = normalize(-ro);
    vec3 cs = normalize(cross(cf,vec3(0.,1.,0.)));
    vec3 cu = normalize(cross(cf,cs));
    
    vec3 uuv = ro+cf*3. + uv.x*cs + uv.y*cu;
    
    vec3 rd = normalize(uuv-ro);
    
    vec4 col = rm(ro,rd);
    
    
    fragColor = col;
}

/** SHADERDATA
{
	"title": "fractal pyramid",
	"description": "",
	"model": "car"
}
*/
`

const mandelbulb = `
// NOTE: https://www.shadertoy.com/view/MdXSWn
// Created by evilryu
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.


// whether turn on the animation
//#define phase_shift_on 

float stime, ctime;
 void ry(inout vec3 p, float a){  
 	float c,s;vec3 q=p;  
  	c = cos(a); s = sin(a);  
  	p.x = c * q.x + s * q.z;  
  	p.z = -s * q.x + c * q.z; 
 }  

float pixel_size = 0.0;

/* 

z = r*(sin(theta)cos(phi) + i cos(theta) + j sin(theta)sin(phi)

zn+1 = zn^8 +c

z^8 = r^8 * (sin(8*theta)*cos(8*phi) + i cos(8*theta) + j sin(8*theta)*sin(8*theta)

zn+1' = 8 * zn^7 * zn' + 1

*/

vec3 mb(vec3 p) {
	p.xyz = p.xzy;
	vec3 z = p;
	vec3 dz=vec3(0.0);
	float power = 8.0;
	float r, theta, phi;
	float dr = 1.0;
	
	float t0 = 1.0;
	for(int i = 0; i < 7; ++i) {
		r = length(z);
		if(r > 2.0) continue;
		theta = atan(z.y / z.x);
        #ifdef phase_shift_on
		phi = asin(z.z / r) + iTime*0.1;
        #else
        phi = asin(z.z / r);
        #endif
		
		dr = pow(r, power - 1.0) * dr * power + 1.0;
	
		r = pow(r, power);
		theta = theta * power;
		phi = phi * power;
		
		z = r * vec3(cos(theta)*cos(phi), sin(theta)*cos(phi), sin(phi)) + p;
		
		t0 = min(t0, r);
	}
	return vec3(0.5 * log(r) * r / dr, t0, 0.0);
}

 vec3 f(vec3 p){ 
	 ry(p, iTime*0.2);
     return mb(p); 
 } 


 float softshadow(vec3 ro, vec3 rd, float k ){ 
     float akuma=1.0,h=0.0; 
	 float t = 0.01;
     for(int i=0; i < 50; ++i){ 
         h=f(ro+rd*t).x; 
         if(h<0.001)return 0.02; 
         akuma=min(akuma, k*h/t); 
 		 t+=clamp(h,0.01,2.0); 
     } 
     return akuma; 
 } 

vec3 nor( in vec3 pos )
{
    vec3 eps = vec3(0.001,0.0,0.0);
	return normalize( vec3(
           f(pos+eps.xyy).x - f(pos-eps.xyy).x,
           f(pos+eps.yxy).x - f(pos-eps.yxy).x,
           f(pos+eps.yyx).x - f(pos-eps.yyx).x ) );
}

vec3 intersect( in vec3 ro, in vec3 rd )
{
    float t = 1.0;
    float res_t = 0.0;
    float res_d = 1000.0;
    vec3 c, res_c;
    float max_error = 1000.0;
	float d = 1.0;
    float pd = 100.0;
    float os = 0.0;
    float step = 0.0;
    float error = 1000.0;
    
    for( int i=0; i<48; i++ )
    {
        if( error < pixel_size*0.5 || t > 20.0 )
        {
        }
        else{  // avoid broken shader on windows
        
            c = f(ro + rd*t);
            d = c.x;

            if(d > os)
            {
                os = 0.4 * d*d/pd;
                step = d + os;
                pd = d;
            }
            else
            {
                step =-os; os = 0.0; pd = 100.0; d = 1.0;
            }

            error = d / t;

            if(error < max_error) 
            {
                max_error = error;
                res_t = t;
                res_c = c;
            }
        
            t += step;
        }

    }
	if( t>20.0/* || max_error > pixel_size*/ ) res_t=-1.0;
    return vec3(res_t, res_c.y, res_c.z);
}

 void mainImage( out vec4 fragColor, in vec2 fragCoord ) 
 { 
    vec2 q=fragCoord.xy/iResolution.xy; 
 	vec2 uv = -1.0 + 2.0*q; 
 	uv.x*=iResolution.x/iResolution.y; 
     
    pixel_size = 1.0/(iResolution.x * 3.0);
	// camera
 	stime=0.7+0.3*sin(iTime*0.4); 
 	ctime=0.7+0.3*cos(iTime*0.4); 

 	vec3 ta=vec3(0.0,0.0,0.0); 
	vec3 ro = vec3(0.0, 3.*stime*ctime, 3.*(1.-stime*ctime));

 	vec3 cf = normalize(ta-ro); 
    vec3 cs = normalize(cross(cf,vec3(0.0,1.0,0.0))); 
    vec3 cu = normalize(cross(cs,cf)); 
 	vec3 rd = normalize(uv.x*cs + uv.y*cu + 3.0*cf);  // transform from view to world

    vec3 sundir = normalize(vec3(0.1, 0.8, 0.6)); 
    vec3 sun = vec3(1.64, 1.27, 0.99); 
    vec3 skycolor = vec3(0.6, 1.5, 1.0); 

	vec3 bg = exp(uv.y-2.0)*vec3(0.4, 1.6, 1.0);

    float halo=clamp(dot(normalize(vec3(-ro.x, -ro.y, -ro.z)), rd), 0.0, 1.0); 
    vec3 col=bg+vec3(1.0,0.8,0.4)*pow(halo,17.0); 


    float t=0.0;
    vec3 p=ro; 
	 
	vec3 res = intersect(ro, rd);
	 if(res.x > 0.0){
		   p = ro + res.x * rd;
           vec3 n=nor(p); 
           float shadow = softshadow(p, sundir, 10.0 );

           float dif = max(0.0, dot(n, sundir)); 
           float sky = 0.6 + 0.4 * max(0.0, dot(n, vec3(0.0, 1.0, 0.0))); 
 		   float bac = max(0.3 + 0.7 * dot(vec3(-sundir.x, -1.0, -sundir.z), n), 0.0); 
           float spe = max(0.0, pow(clamp(dot(sundir, reflect(rd, n)), 0.0, 1.0), 10.0)); 

           vec3 lin = 4.5 * sun * dif * shadow; 
           lin += 0.8 * bac * sun; 
           lin += 0.6 * sky * skycolor*shadow; 
           lin += 3.0 * spe * shadow; 

		   res.y = pow(clamp(res.y, 0.0, 1.0), 0.55);
		   vec3 tc0 = 0.5 + 0.5 * sin(3.0 + 4.2 * res.y + vec3(0.0, 0.5, 1.0));
           col = lin *vec3(0.9, 0.8, 0.6) *  0.2 * tc0;
 		   col=mix(col,bg, 1.0-exp(-0.001*res.x*res.x)); 
    } 

    // post
    col=pow(clamp(col,0.0,1.0),vec3(0.45)); 
    col=col*0.6+0.4*col*col*(3.0-2.0*col);  // contrast
    col=mix(col, vec3(dot(col, vec3(0.33))), -0.5);  // satuation
    col*=0.5+0.5*pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.7);  // vigneting
 	fragColor = vec4(col.xyz, smoothstep(0.55, .76, 1.-res.x/5.)); 
 }

/** SHADERDATA
{
"title": "mandelbulb",
"author": "evilryu",
"description": "a mandelbulb",
"href": "https://www.shadertoy.com/view/MdXSWn"
}
*/
`

const shader02 = `
// NOTE: https://www.shadertoy.com/view/wt3SWj
float opSmoothUnion( float d1, float d2, float k )
{
    float h = clamp( 0.876 + 1.284*(d2-d1)/k, 0.112, 2.616 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}

float sdSphere( vec3 p, float s )
{
  return length(p)-s;
} 

float map(vec3 p)
{
	float d = 0.480;
	for (int i = 0; i < 16; i++)
	{
		float fi = float(i);
		float time = iTime * (fract(fi * 412.531 + 1.073) - 1.020) * 1.152;
		d = opSmoothUnion(
            sdSphere(p + sin(time + fi * vec3(52.5126, 64.62744, 632.25)) * vec3(2.0, 2.0, 0.8), mix(0.5, 1.0, fract(fi * 412.531 + 0.5124))),
			d,
			0.024
		);
	}
	return d;
}

vec3 calcNormal( in vec3 p )
{
    const float h = 1e-5; // or some other value
    const vec2 k = vec2(1,-1);
    return normalize( k.xyy*map( p + k.xyy*h ) + 
                      k.yyx*map( p + k.yyx*h ) + 
                      k.yxy*map( p + k.yxy*h ) + 
                      k.xxx*map( p + k.xxx*h ) );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;
    
    // screen size is 6m x 6m
	vec3 rayOri = vec3((uv - 0.5) * vec2(iResolution.x/iResolution.y, 0.368) * 6.0, 3.0);
	vec3 rayDir = vec3(0.0, 0.0, -1.0);
	
	float depth = 0.0;
	vec3 p;
	
	for(int i = 0; i < 64; i++) {
		p = rayOri + rayDir * depth;
		float dist = map(p);
        depth += dist;
		if (dist < 1e-6) {
			break;
		}
	}
	
    depth = min(6.0, depth);
	vec3 n = calcNormal(p);
    float b = max(0.0, dot(n, vec3(0.577)));
    vec3 col = (0.5 + 0.5 * cos((b + iTime * 3.0) + uv.xyx * 2.0 + vec3(0,2,4))) * (0.85 + b * 0.35);
    col *= exp( -depth * 0.15 );
	
    // maximum thickness is 2m in alpha channel
    fragColor = vec4(col, 0.0 );
}

/** SHADERDATA
{
	"title": "shader2",
	"description": "sure",
	"model": "nothing"
}
*/
`

const raymarchingBasic = `
// https://www.shadertoy.com/view/Ml2XRD

float map(vec3 p) {
	vec3 n = vec3(0, 1, 0);
	float k1 = 1.9;
	float k2 = (sin(p.x * k1) + sin(p.z * k1)) * 0.8;
	float k3 = (sin(p.y * k1) + sin(p.z * k1)) * 0.8;
	float w1 = 4.0 - dot(abs(p), normalize(n)) + k2;
	float w2 = 4.0 - dot(abs(p), normalize(n.yzx)) + k3;
	float s1 = length(mod(p.xy + vec2(sin((p.z + p.x) * 2.0) * 0.3, cos((p.z + p.x) * 1.0) * 0.5), 2.0) - 1.0) - 0.2;
	float s2 = length(mod(0.5+p.yz + vec2(sin((p.z + p.x) * 2.0) * 0.3, cos((p.z + p.x) * 1.0) * 0.3), 2.0) - 1.0) - 0.2;
	return min(w1, min(w2, min(s1, s2)));
}

vec2 rot(vec2 p, float a) {
	return vec2(
		p.x * cos(a) - p.y * sin(a),
		p.x * sin(a) + p.y * cos(a));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    float time = iTime;
	vec2 uv = ( fragCoord.xy / iResolution.xy ) * 2.0 - 1.0;
	uv.x *= iResolution.x /  iResolution.y;
	vec3 dir = normalize(vec3(uv, 1.0));
	dir.xz = rot(dir.xz, time * 0.23);dir = dir.yzx;
	dir.xz = rot(dir.xz, time * 0.2);dir = dir.yzx;
	vec3 pos = vec3(0, 0, time);
	vec3 col = vec3(0.0);
	float t = 0.0;
    float tt = 0.0;
	for(int i = 0 ; i < 100; i++) {
		tt = map(pos + dir * t);
		if(tt < 0.001) break;
		t += tt * 0.45;
	}
	vec3 ip = pos + dir * t;
	col = vec3(t * 0.1);
	col = sqrt(col);
	fragColor = vec4(0.05*t+abs(dir) * col + max(0.0, map(ip - 0.1) - tt), 1.0); //Thanks! Shane!
    fragColor.a = 1.0 / (t * t * t * t);
}
`

const seventiesMelt = `
// NOTE: https://www.shadertoy.com/view/XsX3zl
#ifdef GL_ES
precision mediump float;
#endif

const int zoom = 40;
const float brightness = 0.975;
float fScale = 1.25;

float cosRange(float amt, float range, float minimum) {
	return (((1.0 + cos(radians(amt))) * 0.5) * range) + minimum;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	float time = iTime * 1.25;
	vec2 uv = fragCoord.xy / iResolution.xy;
	vec2 p  = (2.0*fragCoord.xy-iResolution.xy)/max(iResolution.x,iResolution.y);
	float ct = cosRange(time*5.0, 3.0, 1.1);
	float xBoost = cosRange(time*0.2, 5.0, 5.0);
	float yBoost = cosRange(time*0.1, 10.0, 5.0);
	
	fScale = cosRange(time * 15.5, 1.25, 0.5);
	
	for(int i=1;i<zoom;i++) {
		float _i = float(i);
		vec2 newp=p;
		newp.x+=0.25/_i*sin(_i*p.y+time*cos(ct)*0.5/20.0+0.005*_i)*fScale+xBoost;		
		newp.y+=0.25/_i*sin(_i*p.x+time*ct*0.3/40.0+0.03*float(i+15))*fScale+yBoost;
		p=newp;
	}
	
	vec3 col=vec3(0.5*sin(3.0*p.x)+0.5,0.5*sin(3.0*p.y)+0.5,sin(p.x+p.y));
	col *= brightness;
    
    // Add border
    float vigAmt = 5.0;
    float vignette = (1.-vigAmt*(uv.y-.5)*(uv.y-.5))*(1.-vigAmt*(uv.x-.5)*(uv.x-.5));
	float extrusion = (col.x + col.y + col.z) / 4.0;
    extrusion *= 1.5;
    extrusion *= vignette;
    
	fragColor = vec4(col, extrusion);
}

/** SHADERDATA
{
	"title": "70s Melt",
	"description": "Variation of Sine Puke",
	"model": "car"
}
*/
`

const sinusoidalTresJS = `
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float r = sin(iTime + uv.x + sin(uv.y + iTime));
    float g = pow(1.0 - sqrt(abs(cos(uv.y + uv.x + iTime))), sin(iTime) + 2.0);
    float b = pow(1.0 - sin(uv.y + iTime), cos(iTime) + 2.0 );
    float a = 
    0.5 * (sin(3.1 * uv.y + cos(uv.x * 2.7 + iTime) + iTime) * 0.5 + 0.5)
    + 0.15 * (0.5 * cos(3.14 * length(uv - vec2(0.5, 0.5)) + iTime) + 0.5)
    + 0.35 * (r + g + b) * 0.3333;

    fragColor = vec4(r, g, b, a);
}

/** SHADERDATA
{
	"title": "Sinusoidal for TresJS",
    "author": "andretchen0",
	"description": "Simple shader made for this TresJS lab",
    "href": "https://lab.tresjs.org"
}
*/
`

const sinusoidalTresJS2 = `
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float g = pow(1.0 - sqrt(abs(cos(uv.y + uv.x + iTime * 0.1))), sin(iTime) + 2.0);
    float b = pow(1.0 - sin(uv.y + iTime), cos(iTime) + 2.0 );
    float r = sin(iTime + uv.y + sin(uv.y + iTime));

    fragColor = vec4(r, g, b, 0.);
}

/** SHADERDATA
{
	"title": "Sinusoidal 2 for TresJS",
    "author": "andretchen0",
	"description": "Simple shader made for this TresJS lab",
    "href": "https://lab.tresjs.org"
}
*/
`

const truchet = `
// NOTE: https://www.shadertoy.com/view/4td3zj
/*

	Raymarched Hexagonal Truchet
	----------------------------

	Raymarching a hexagonal Truchet pattern. The Truchet pattern itself is pretty easy to produce.
	This particular production method is based off of one of Fabrice Neyret's finely tuned examples, 
	which in turn was based on something Mattz did a while back. Both examples are below.

	Technically, there isn't a lot to it. The hardest part was producing the Truchet pattern in a 
	reasonably quick way, but most of that was already done for me. Therefore, since I had nothing new 
	to add, I prettied it up a bit... and by that I mean, I made it really shiny. Probably too shiny. 
	It kind of hurts my eyes. :)

	The weird, abstract, dragon disco style wasn't intentional. I'm briefly passing through parts of 
	Asia next week, so that may have mildy influenced my style choices. Hopefully, it meets 
	834144373's approval. :)
	

	Based on:

	hexagonal truchet ( 352 ) - FabriceNeyret2
	https://www.shadertoy.com/view/Xdt3D8

	... which, in turn, was based on:
	hexagonal tiling - mattz
	https://www.shadertoy.com/view/4d2GzV

*/


// Using a 2D Hexagonal Truchet pattern as the source of the height map. This is based on Fabrice's 
// example which in turn was based on one by Mattz. I tailored it to suit my needs - and hopefully, 
// sped it up a bit, but it wouldn't shock me if I'd slowed it down instead. :)
//
// The process is pretty simple: Break space up into hexagons and color them according to the distance 
// from the center, then randomly flip some about the X-axis. The pattern you're left with isn't that 
// visually appealing. However, once you wrap or fold the values over, you get some nice symmetrical 
// patterns.
// 
// Just to complicate things slightly, I'm performing the final value folding steps outside of this
// function in order to color things in sections... It's not that important.
float heightMap(in vec2 p) { 
    
    p *= 3.;
    
	// Hexagonal coordinates.
    vec2 h = vec2(p.x + p.y*.57735, p.y*1.1547);
    
    // Closest hexagon center.
    vec2 fh = floor(h);
    vec2 f = h - fh; h = fh;
    float c = fract((h.x + h.y)/3.);
    h =  c<.666 ?   c<.333 ?  h  :  h + 1.  :  h  + step(f.yx, f); 

    p -= vec2(h.x - h.y*.5, h.y*.8660254);
    
    // Rotate (flip, in this case) random hexagons. Otherwise, you'd have a bunch of circles only.
    // Note that "h" is unique to each hexagon, so we can use it as the random ID.
    c = fract(cos(dot(h, vec2(41, 289)))*43758.5453); // Reusing "c."
    p -= p*step(c, .5)*2.; // Equivalent to: if (c<.5) p *= -1.;
    
    // Minimum squared distance to neighbors. Taking the square root after comparing, for speed.
    // Three partitions need to be checked due to the flipping process.
    p -= vec2(-1, 0);
    c = dot(p, p); // Reusing "c" again.
    p -= vec2(1.5, .8660254);
    c = min(c, dot(p, p));
    p -= vec2(0, -1.73205);
    c = min(c, dot(p, p));
    
    return sqrt(c);
    
    // Wrapping the values - or folding the values over (abs(c-.5)*2., cos(c*6.283*1.), etc) - to produce 
    // the nicely lined-up, wavy patterns. I"m perfoming this step in the "map" function. It has to do 
    // with coloring and so forth.
    //c = sqrt(c);
    //c = cos(c*6.283*1.) + cos(c*6.283*2.);
    //return (clamp(c*.6+.5, 0., 1.));

}

// Raymarching an XY-plane - raised a little by the hexagonal Truchet heightmap. Pretty standard.
float map(vec3 p){
    
    
    float c = heightMap(p.xy); // Height map.
    // Wrapping, or folding the height map values over, to produce the nicely lined-up, wavy patterns.
    c = cos(c*6.2831589) + cos(c*6.2831589*2.);
    c = (clamp(c*.6 +.5, 0., 1.));

    
    // Back plane, placed at vec3(0., 0., 1.), with plane normal vec3(0., 0., -1).
    // Adding some height to the plane from the heightmap. Not much else to it.
    return 1. - p.z - c*.025;

    
}

// The normal function with some edge detection and curvature rolled into it. Sometimes, it's possible to 
// get away with six taps, but we need a bit of epsilon value variance here, so there's an extra six.
vec3 getNormal(vec3 p, inout float edge, inout float crv) { 
	
    vec2 e = vec2(.01, 0); // Larger epsilon for greater sample spread, thus thicker edges.

    // Take some distance function measurements from either side of the hit point on all three axes.
	float d1 = map(p + e.xyy), d2 = map(p - e.xyy);
	float d3 = map(p + e.yxy), d4 = map(p - e.yxy);
	float d5 = map(p + e.yyx), d6 = map(p - e.yyx);
	float d = map(p)*2.;	// The hit point itself - Doubled to cut down on calculations. See below.
     
    // Edges - Take a geometry measurement from either side of the hit point. Average them, then see how
    // much the value differs from the hit point itself. Do this for X, Y and Z directions. Here, the sum
    // is used for the overall difference, but there are other ways. Note that it's mainly sharp surface 
    // curves that register a discernible difference.
    edge = abs(d1 + d2 - d) + abs(d3 + d4 - d) + abs(d5 + d6 - d);
    //edge = max(max(abs(d1 + d2 - d), abs(d3 + d4 - d)), abs(d5 + d6 - d)); // Etc.
    
    // Once you have an edge value, it needs to normalized, and smoothed if possible. How you 
    // do that is up to you. This is what I came up with for now, but I might tweak it later.
    edge = smoothstep(0., 1., sqrt(edge/e.x*2.));
    
    // We may as well use the six measurements to obtain a rough curvature value while we're at it.
    crv = clamp((d1 + d2 + d3 + d4 + d5 + d6 - d*3.)*32. + .6, 0., 1.);
	
    // Redoing the calculations for the normal with a more precise epsilon value.
    e = vec2(.0025, 0);
	d1 = map(p + e.xyy), d2 = map(p - e.xyy);
	d3 = map(p + e.yxy), d4 = map(p - e.yxy);
	d5 = map(p + e.yyx), d6 = map(p - e.yyx); 
    
    
    // Return the normal.
    // Standard, normalized gradient mearsurement.
    return normalize(vec3(d1 - d2, d3 - d4, d5 - d6));
}



// I keep a collection of occlusion routines... OK, that sounded really nerdy. :)
// Anyway, I like this one. I'm assuming it's based on IQ's original.
float calculateAO(in vec3 p, in vec3 n)
{
	float sca = 2., occ = 0.;
    for(float i=0.; i<5.; i++){
    
        float hr = .01 + i*.5/4.;        
        float dd = map(n * hr + p);
        occ += (hr - dd)*sca;
        sca *= 0.7;
    }
    return clamp(1.0 - occ, 0., 1.);    
}


/*
// Surface bump function. Cheap, but with decent visual impact.
float bumpSurf3D( in vec3 p){
    
    float c = heightMap((p.xy + p.z*.025)*6.);
    c = cos(c*6.283*3.);
    //c = sqrt(clamp(c+.5, 0., 1.));
    c = (c*.5 + .5);
    
    return c;

}

// Standard function-based bump mapping function.
vec3 dbF(in vec3 p, in vec3 nor, float bumpfactor){
    
    const vec2 e = vec2(0.001, 0);
    float ref = bumpSurf3D(p);                 
    vec3 grad = (vec3(bumpSurf3D(p - e.xyy),
                      bumpSurf3D(p - e.yxy),
                      bumpSurf3D(p - e.yyx) )-ref)/e.x;                     
          
    grad -= nor*dot(nor, grad);          
                      
    return normalize( nor + grad*bumpfactor );
	
}
*/

// Compact, self-contained version of IQ's 3D value noise function.
float n3D(vec3 p){
    
	const vec3 s = vec3(7, 157, 113);
	vec3 ip = floor(p); p -= ip; 
    vec4 h = vec4(0., s.yz, s.y + s.z) + dot(ip, s);
    p = p*p*(3. - 2.*p); //p *= p*p*(p*(p * 6. - 15.) + 10.);
    h = mix(fract(sin(mod(h, 6.2831589))*43758.5453), 
            fract(sin(mod(h + s.x, 6.2831589))*43758.5453), p.x);
    h.xy = mix(h.xz, h.yw, p.y);
    return mix(h.x, h.y, p.z); // Range: [0, 1].
}

// Simple environment mapping. Pass the reflected vector in and create some
// colored noise with it. The normal is redundant here, but it can be used
// to pass into a 3D texture mapping function to produce some interesting
// environmental reflections.
vec3 envMap(vec3 rd, vec3 sn){
    
    vec3 sRd = rd; // Save rd, just for some mixing at the end.
    
    // Add a time component, scale, then pass into the noise function.
    rd.xy -= iTime*.25;
    rd *= 3.;
    
    float c = n3D(rd)*.57 + n3D(rd*2.)*.28 + n3D(rd*4.)*.15; // Noise value.
    c = smoothstep(.4, 1., c); // Darken and add contast for more of a spotlight look.
    
    vec3 col = vec3(c, c*c, c*c*c*c); // Simple, warm coloring.
    //vec3 col = vec3(min(c*1.5, 1.), pow(c, 2.5), pow(c, 12.)); // More color.
    
    // Mix in some more red to tone it down and return.
    return mix(col, col.yzx, sRd*.25+.25); 
    
}

// vec2 to vec2 hash.
vec2 hash22(vec2 p) { 

    // Faster, but doesn't disperse things quite as nicely as other combinations. :)
    float n = sin(mod(dot(p, vec2(41, 289)), 6.2831589));
    return fract(vec2(262144, 32768)*n)*.75 + .25; 
    
    // Animated.
    //p = fract(vec2(262144, 32768)*n); 
    //return sin( p*6.2831853 + iTime )*.35 + .65; 
    
}

// 2D 2nd-order Voronoi: Obviously, this is just a rehash of IQ's original. I've tidied
// up those if-statements. Since there's less writing, it should go faster. That's how 
// it works, right? :)
//
float Voronoi(in vec2 p){
    
	vec2 g = floor(p), o; p -= g;
	
	vec3 d = vec3(1); // 1.4, etc. "d.z" holds the distance comparison value.
    
	for(int y = -1; y <= 1; y++){
		for(int x = -1; x <= 1; x++){
            
			o = vec2(x, y);
            o += hash22(g + o) - p;
            
			d.z = dot(o, o); 
            // More distance metrics.
            //o = abs(o);
            //d.z = max(o.x*.8666 + o.y*.5, o.y);// 
            //d.z = max(o.x, o.y);
            //d.z = (o.x*.7 + o.y*.7);
            
            d.y = max(d.x, min(d.y, d.z));
            d.x = min(d.x, d.z); 
                       
		}
	}
	
    return max(d.y/1.2 - d.x*1., 0.)/1.2;
    //return d.y - d.x; // return 1.-d.x; // etc.
    
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    
    
    // Unit directional ray - Coyote's observation.
    vec3 rd = normalize(vec3(2.*fragCoord - iResolution.xy, iResolution.y));

    float tm = iTime/2.;
    // Rotate the XY-plane back and forth. Note that sine and cosine are kind of rolled into one.
    vec2 a = sin(vec2(1.570796, 0) + sin(tm/4.)*.3); // Fabrice's observation.
    rd.xy = mat2(a, -a.y, a.x)*rd.xy;
    
    
    // Ray origin. Moving in the X-direction to the right.
    vec3 ro = vec3(tm, cos(tm/4.), 0.);
    
    
    // Light position, hovering around behind the camera.
    vec3 lp = ro + vec3(cos(tm/2.)*.5, sin(tm/2.)*.5, -.5);
    
    // Standard raymarching segment. Because of the straight forward setup, not many iterations are necessary.
    float d, t=0.;
    for(int j=0;j<32;j++){
      
        d = map(ro + rd*t); // distance to the function.
        t += d*.7; // Total distance from the camera to the surface.
        
        // The plane "is" the far plane, so no "far = plane" break is needed.
        if(d<0.001) break; 
    
    }
    
    // Edge and curve value. Passed into, and set, during the normal calculation.
    float edge, crv;
   
    // Surface postion, surface normal and light direction.
    vec3 sp = ro + rd*t;
    vec3 sn = getNormal(sp, edge, crv);
    vec3 ld = lp - sp;
    
    
    
    // Coloring and texturing the surface.
    //
    // Height map.
    float c = heightMap(sp.xy); 
    
    // Folding, or wrapping, the values above to produce the snake-like pattern that lines up with the randomly
    // flipped hex cells produced by the height map.
    vec3 fold = cos(vec3(1, 2, 4)*c*6.2831589);
    
    // Using the height map value, then wrapping it, to produce a finer grain Truchet pattern for the overlay.
    float c2 = heightMap((sp.xy + sp.z*.025)*6.);
    c2 = cos(c2*6.2831589*3.);
    c2 = (clamp(c2 +.5, 0., 1.)); 

    
    // Function based bump mapping. I prefer none in this example, but it's there if you want it.   
    //if(temp.x>0. || temp.y>0.) sn = dbF(sp, sn, .001);
    
    // Surface color value.
    vec3 oC = vec3(1);

	if(fold.x>0.) oC = vec3(1, .05, .1)*c2; // Reddish pink with finer grained Truchet overlay.
    
    if(fold.x<0.05 && (fold.y)<0.) oC = vec3(1, .7, .45)*(c2*.25 + .75); // Lighter lined borders.
    else if(fold.x<0.) oC = vec3(1, .8, .4)*c2; // Gold, with overlay.
        
    //oC *= n3D(sp*128.)*.35 + .65; // Extra fine grained noisy texturing.

     
    // Sending some greenish particle pulses through the snake-like patterns. With all the shininess going 
    // on, this effect is a little on the subtle side.
    float p1 = 1.0 - smoothstep(0., .1, fold.x*.5+.5); // Restrict to the snake-like path.
    // Other path.
	//float p2 = 1.0 - smoothstep(0., .1, cos(heightMap(sp.xy + 1. + iTime/4.)*6.283)*.5+.5);
	float p2 = 1.0 - smoothstep(0., .1, Voronoi(sp.xy*4. + vec2(tm, cos(tm/4.))));
    p1 = (p2 + .25)*p1; // Overlap the paths.
    oC += oC.yxz*p1*p1; // Gives a kind of electron effect. Works better with just Voronoi, but it'll do.
    
   
    
    
    float lDist = max(length(ld), 0.001); // Light distance.
    float atten = 1./(1. + lDist*.125); // Light attenuation.
    
    ld /= lDist; // Normalizing the light direction vector.
    
    float diff = max(dot(ld, sn), 0.); // Diffuse.
    float spec = pow(max( dot( reflect(-ld, sn), -rd ), 0.0 ), 16.); // Specular.
    float fre = pow(clamp(dot(sn, rd) + 1., .0, 1.), 3.); // Fresnel, for some mild glow.
    
    // Shading. Note, there are no actual shadows. The camera is front on, so the following
    // two functions are enough to give a shadowy appearance.
    crv = crv*.9 + .1; // Curvature value, to darken the crevices.
    float ao = calculateAO(sp, sn); // Ambient occlusion, for self shadowing.

 
    
    // Combining the terms above to light the texel.
    vec3 col = oC*(diff + .5) + vec3(1., .7, .4)*spec*2. + vec3(.4, .7, 1)*fre;
    
    col += (oC*.5+.5)*envMap(reflect(rd, sn), sn)*6.; // Fake environment mapping.
 
    
    // Edges.
    col *= 1. - edge*.85; // Darker edges.   
    
    // Applying the shades.
    col *= (atten*crv*ao);


    // Rough gamma correction, then present to the screen.
	fragColor = vec4(sqrt(clamp(col, 0., 1.)), col.r);
}
`

const octgrams = `
// Source: https://www.shadertoy.com/view/tlVGDt
precision highp float;


float gTime = 0.;
const float REPEAT = 5.0;

// 回転行列
mat2 rot(float a) {
	float c = cos(a), s = sin(a);
	return mat2(c,s,-s,c);
}

float sdBox( vec3 p, vec3 b )
{
	vec3 q = abs(p) - b;
	return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

float box(vec3 pos, float scale) {
	pos *= scale;
	float base = sdBox(pos, vec3(.4,.4,.1)) /1.5;
	pos.xy *= 5.;
	pos.y -= 3.5;
	pos.xy *= rot(.75);
	float result = -base;
	return result;
}

float box_set(vec3 pos, float iTime) {
	vec3 pos_origin = pos;
	pos = pos_origin;
	pos .y += sin(gTime * 0.4) * 2.5;
	pos.xy *=   rot(.8);
	float box1 = box(pos,2. - abs(sin(gTime * 0.4)) * 1.5);
	pos = pos_origin;
	pos .y -=sin(gTime * 0.4) * 2.5;
	pos.xy *=   rot(.8);
	float box2 = box(pos,2. - abs(sin(gTime * 0.4)) * 1.5);
	pos = pos_origin;
	pos .x +=sin(gTime * 0.4) * 2.5;
	pos.xy *=   rot(.8);
	float box3 = box(pos,2. - abs(sin(gTime * 0.4)) * 1.5);	
	pos = pos_origin;
	pos .x -=sin(gTime * 0.4) * 2.5;
	pos.xy *=   rot(.8);
	float box4 = box(pos,2. - abs(sin(gTime * 0.4)) * 1.5);	
	pos = pos_origin;
	pos.xy *=   rot(.8);
	float box5 = box(pos,.5) * 6.;	
	pos = pos_origin;
	float box6 = box(pos,.5) * 6.;	
	float result = max(max(max(max(max(box1,box2),box3),box4),box5),box6);
	return result;
}

float map(vec3 pos, float iTime) {
	vec3 pos_origin = pos;
	float box_set1 = box_set(pos, iTime);

	return box_set1;
}


void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
	vec2 p = (fragCoord.xy * 2. - iResolution.xy) / min(iResolution.x, iResolution.y);
	vec3 ro = vec3(0., -0.2 ,iTime * 4.);
	vec3 ray = normalize(vec3(p, 1.5));
	ray.xy = ray.xy * rot(sin(iTime * .03) * 5.);
	ray.yz = ray.yz * rot(sin(iTime * .05) * .2);
	float t = 0.1;
	vec3 col = vec3(0.);
	float ac = 0.0;


	for (int i = 0; i < 99; i++){
		vec3 pos = ro + ray * t;
		pos = mod(pos-2., 4.) -2.;
		gTime = iTime -float(i) * 0.01;
		
		float d = map(pos, iTime);

		d = max(abs(d), 0.01);
		ac += exp(-d*23.);

		t += d* 0.55;
	}

	col = vec3(ac * 0.02);

	col +=vec3(0.,0.2 * abs(sin(iTime)),0.5 + sin(iTime) * 0.2);


	fragColor = vec4(col ,1.0 - t * (0.02 + 0.02 * sin (iTime)));
}

/** SHADERDATA
{
	"title": "Octgrams",
    "author": "whisky_shusuky",
	"description": "Inspired by arabesque.",
    "href": "https://www.shadertoy.com/view/tlVGDt",
	"model": "person"
}
*/
`
export const mainImage = gamesOfSinus

export const shaderToySrc = {
    gamesOfSinus,
    tiles,
    star,
    fractalPyramid,
    mandelbulb,
    shader02,
    rainbow,
    prettyHip,
    raymarchingBasic,
    unyo,
    seventiesMelt,
    sinusoidalTresJS,
    sinusoidalTresJS2,
    truchet,
    octgrams,
} as const