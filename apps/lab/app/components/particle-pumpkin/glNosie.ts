const _Perlin
  = '#define GLSLIFY 1\nvec2 _fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}vec3 _fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}/***Generates 2D Perlin Noise.**@name gln_perlin*@function*@param{vec2}p Point to sample Perlin Noise at.*@return{float}Value of Perlin Noise at point "p".**@example*float n=gln_perlin(position.xy);*/float gln_perlin(vec2 P){vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);Pi=mod(Pi,289.0);vec4 ix=Pi.xzxz;vec4 iy=Pi.yyww;vec4 fx=Pf.xzxz;vec4 fy=Pf.yyww;vec4 i=gln_rand4(gln_rand4(ix)+iy);vec4 gx=2.0*fract(i*0.0243902439)-1.0;vec4 gy=abs(gx)-0.5;vec4 tx=floor(gx+0.5);gx=gx-tx;vec2 g00=vec2(gx.x,gy.x);vec2 g10=vec2(gx.y,gy.y);vec2 g01=vec2(gx.z,gy.z);vec2 g11=vec2(gx.w,gy.w);vec4 norm=1.79284291400159-0.85373472095314*vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;float n00=dot(g00,vec2(fx.x,fy.x));float n10=dot(g10,vec2(fx.y,fy.y));float n01=dot(g01,vec2(fx.z,fy.z));float n11=dot(g11,vec2(fx.w,fy.w));vec2 fade_xy=_fade(Pf.xy);vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);float n_xy=mix(n_x.x,n_x.y,fade_xy.y);return 2.3*n_xy;}/***Generates 3D Perlin Noise.**@name gln_perlin*@function*@param{vec3}p Point to sample Perlin Noise at.*@return{float}Value of Perlin Noise at point "p".**@example*float n=gln_perlin(position.xyz);*/float gln_perlin(vec3 P){vec3 Pi0=floor(P);vec3 Pi1=Pi0+vec3(1.0);Pi0=mod(Pi0,289.0);Pi1=mod(Pi1,289.0);vec3 Pf0=fract(P);vec3 Pf1=Pf0-vec3(1.0);vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);vec4 iy=vec4(Pi0.yy,Pi1.yy);vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;vec4 ixy=_permute(_permute(ix)+iy);vec4 ixy0=_permute(ixy+iz0);vec4 ixy1=_permute(ixy+iz1);vec4 gx0=ixy0/7.0;vec4 gy0=fract(floor(gx0)/7.0)-0.5;gx0=fract(gx0);vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);vec4 sz0=step(gz0,vec4(0.0));gx0-=sz0*(step(0.0,gx0)-0.5);gy0-=sz0*(step(0.0,gy0)-0.5);vec4 gx1=ixy1/7.0;vec4 gy1=fract(floor(gx1)/7.0)-0.5;gx1=fract(gx1);vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);vec4 sz1=step(gz1,vec4(0.0));gx1-=sz1*(step(0.0,gx1)-0.5);gy1-=sz1*(step(0.0,gy1)-0.5);vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);vec4 norm0=_taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;vec4 norm1=_taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);vec3 fade_xyz=_fade(Pf0);vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);float n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);return 2.2*n_xyz;}/***Generates 2D Fractional Brownian motion(fBm)from Perlin Noise.**@name gln_pfbm*@function*@param{vec2}p Point to sample fBm at.*@param{gln_tFBMOpts}opts Options for generating Perlin Noise.*@return{float}Value of fBm at point "p".**@example*gln_tFBMOpts opts=*gln_tFBMOpts(uSeed,0.3,2.0,0.5,1.0,5,false,false);**float n=gln_pfbm(position.xy,opts);*/float gln_pfbm(vec2 p,gln_tFBMOpts opts){p+=(opts.seed*100.0);float persistance=opts.persistance;float lacunarity=opts.lacunarity;float redistribution=opts.redistribution;int octaves=opts.octaves;bool terbulance=opts.terbulance;bool ridge=opts.terbulance&&opts.ridge;float result=0.0;float amplitude=1.0;float frequency=1.0;float maximum=amplitude;for(int i=0;i<MAX_FBM_ITERATIONS;i++){if(i>=octaves)break;vec2 p=p*frequency*opts.scale;float noiseVal=gln_perlin(p);if(terbulance)noiseVal=abs(noiseVal);if(ridge)noiseVal=-1.0*noiseVal;result+=noiseVal*amplitude;frequency*=lacunarity;amplitude*=persistance;maximum+=amplitude;}float redistributed=pow(result,redistribution);return redistributed/maximum;}/***Generates 3D Fractional Brownian motion(fBm)from Perlin Noise.**@name gln_pfbm*@function*@param{vec3}p Point to sample fBm at.*@param{gln_tFBMOpts}opts Options for generating Perlin Noise.*@return{float}Value of fBm at point "p".**@example*gln_tFBMOpts opts=*gln_tFBMOpts(uSeed,0.3,2.0,0.5,1.0,5,false,false);**float n=gln_pfbm(position.xy,opts);*/float gln_pfbm(vec3 p,gln_tFBMOpts opts){p+=(opts.seed*100.0);float persistance=opts.persistance;float lacunarity=opts.lacunarity;float redistribution=opts.redistribution;int octaves=opts.octaves;bool terbulance=opts.terbulance;bool ridge=opts.terbulance&&opts.ridge;float result=0.0;float amplitude=1.0;float frequency=1.0;float maximum=amplitude;for(int i=0;i<MAX_FBM_ITERATIONS;i++){if(i>=octaves)break;vec3 p=p*frequency*opts.scale;float noiseVal=gln_perlin(p);if(terbulance)noiseVal=abs(noiseVal);if(ridge)noiseVal=-1.0*noiseVal;result+=noiseVal*amplitude;frequency*=lacunarity;amplitude*=persistance;maximum+=amplitude;}float redistributed=pow(result,redistribution);return redistributed/maximum;}';  

const _Simplex
  = '#define GLSLIFY 1\n/***Generates 2D Simplex Noise.**@name gln_simplex*@function*@param{vec2}v Point to sample Simplex Noise at.*@return{float}Value of Simplex Noise at point "p".**@example*float n=gln_simplex(position.xy);*/float gln_simplex(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1;i1=(x0.x>x0.y)? vec2(1.0,0.0): vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);vec3 p=gln_rand3(gln_rand3(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}/***Generates 3D Simplex Noise.**@name gln_simplex*@function*@param{vec3}v Point to sample Simplex Noise at.*@return{float}Value of Simplex Noise at point "p".**@example*float n=gln_simplex(position.xyz);*/float gln_simplex(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+1.0*C.xxx;vec3 x2=x0-i2+2.0*C.xxx;vec3 x3=x0-1.+3.0*C.xxx;i=mod(i,289.0);vec4 p=_permute(_permute(_permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=1.0/7.0;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=_taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}/***Generates 2D Fractional Brownian motion(fBm)from Simplex Noise.**@name gln_sfbm*@function*@param{vec2}v Point to sample fBm at.*@param{gln_tFBMOpts}opts Options for generating Simplex Noise.*@return{float}Value of fBm at point "p".**@example*gln_tFBMOpts opts=*gln_tFBMOpts(uSeed,0.3,2.0,0.5,1.0,5,false,false);**float n=gln_sfbm(position.xy,opts);*/float gln_sfbm(vec2 v,gln_tFBMOpts opts){v+=(opts.seed*100.0);float persistance=opts.persistance;float lacunarity=opts.lacunarity;float redistribution=opts.redistribution;int octaves=opts.octaves;bool terbulance=opts.terbulance;bool ridge=opts.terbulance&&opts.ridge;float result=0.0;float amplitude=1.0;float frequency=1.0;float maximum=amplitude;for(int i=0;i<MAX_FBM_ITERATIONS;i++){if(i>=octaves)break;vec2 p=v*frequency*opts.scale;float noiseVal=gln_simplex(p);if(terbulance)noiseVal=abs(noiseVal);if(ridge)noiseVal=-1.0*noiseVal;result+=noiseVal*amplitude;frequency*=lacunarity;amplitude*=persistance;maximum+=amplitude;}float redistributed=pow(result,redistribution);return redistributed/maximum;}/***Generates 3D Fractional Brownian motion(fBm)from Simplex Noise.**@name gln_sfbm*@function*@param{vec3}v Point to sample fBm at.*@param{gln_tFBMOpts}opts Options for generating Simplex Noise.*@return{float}Value of fBm at point "p".**@example*gln_tFBMOpts opts=*gln_tFBMOpts(uSeed,0.3,2.0,0.5,1.0,5,false,false);**float n=gln_sfbm(position.xy,opts);*/float gln_sfbm(vec3 v,gln_tFBMOpts opts){v+=(opts.seed*100.0);float persistance=opts.persistance;float lacunarity=opts.lacunarity;float redistribution=opts.redistribution;int octaves=opts.octaves;bool terbulance=opts.terbulance;bool ridge=opts.terbulance&&opts.ridge;float result=0.0;float amplitude=1.0;float frequency=1.0;float maximum=amplitude;for(int i=0;i<MAX_FBM_ITERATIONS;i++){if(i>=octaves)break;vec3 p=v*frequency*opts.scale;float noiseVal=gln_simplex(p);if(terbulance)noiseVal=abs(noiseVal);if(ridge)noiseVal=-1.0*noiseVal;result+=noiseVal*amplitude;frequency*=lacunarity;amplitude*=persistance;maximum+=amplitude;}float redistributed=pow(result,redistribution);return redistributed/maximum;}';  

const _Worley
  = '#define GLSLIFY 1\n/***@typedef{struct}gln_tWorleyOpts Options for Voronoi Noise generators.*@property{float}seed Seed for PRNG generation.*@property{float}distance Size of each generated cell*@property{float}scale "Zoom level" of generated noise.*@property{boolean}invert Invert generated noise.*/struct gln_tWorleyOpts{float seed;float distance;float scale;bool invert;};/***Generates Voronoi Noise.**@name gln_worley*@function*@param{vec2}x                  Point to sample Voronoi Noise at.*@param{gln_tWorleyOpts}opts Options for generating Voronoi Noise.*@return{float}Value of Voronoi Noise at point "p".**@example*gln_tWorleyOpts opts=gln_tWorleyOpts(uSeed,0.0,0.5,false);**float n=gln_worley(position.xy,opts);*/float gln_worley(vec2 point,gln_tWorleyOpts opts){vec2 p=floor(point*opts.scale);vec2 f=fract(point*opts.scale);float res=0.0;for(int j=-1;j<=1;j++){for(int i=-1;i<=1;i++){vec2 b=vec2(i,j);vec2 r=vec2(b)-f+gln_rand(p+b);res+=1./pow(dot(r,r),8.);}}float result=pow(1./res,0.0625);if(opts.invert)result=1.0-result;return result;}/***Generates Fractional Brownian motion(fBm)from Worley Noise.**@name gln_wfbm*@function*@param{vec3}v Point to sample fBm at.*@param{gln_tFBMOpts}opts Options for generating Simplex Noise.*@return{float}Value of fBm at point "p".**@example*gln_tFBMOpts opts=*gln_tFBMOpts(1.0,0.3,2.0,0.5,1.0,5,false,false);**gln_tWorleyOpts voronoiOpts=*gln_tWorleyOpts(1.0,1.0,3.0,false);**float n=gln_wfbm(position.xy,voronoiOpts,opts);*/float gln_wfbm(vec2 v,gln_tFBMOpts opts,gln_tWorleyOpts vopts){v+=(opts.seed*100.0);float persistance=opts.persistance;float lacunarity=opts.lacunarity;float redistribution=opts.redistribution;int octaves=opts.octaves;bool terbulance=opts.terbulance;bool ridge=opts.terbulance&&opts.ridge;float result=0.0;float amplitude=1.0;float frequency=1.0;float maximum=amplitude;for(int i=0;i<MAX_FBM_ITERATIONS;i++){if(i>=octaves)break;vec2 p=v*frequency*opts.scale;float noiseVal=gln_worley(p,vopts);if(terbulance)noiseVal=abs(noiseVal);if(ridge)noiseVal=-1.0*noiseVal;result+=noiseVal*amplitude;frequency*=lacunarity;amplitude*=persistance;maximum+=amplitude;}float redistributed=pow(result,redistribution);return redistributed/maximum;}';  

const _BlendModes
  = "#define GLSLIFY 1\n#define gln_COPY 1\n#define gln_ADD 2\n#define gln_SUBSTRACT 3\n#define gln_MULTIPLY 4\n#define gln_ADDSUB 5\n#define gln_LIGHTEN 6\n#define gln_DARKEN 7\n#define gln_SWITCH 8\n#define gln_DIVIDE 9\n#define gln_OVERLAY 10\n#define gln_SCREEN 11\n#define gln_SOFTLIGHT 12\nfloat gln_softLight(float f,float b){return(f<0.5)? b-(1.0-2.0*f)*b*(1.0-b):(b<0.25)? b+(2.0*f-1.0)*b*((16.0*b-12.0)*b+3.0): b+(2.0*f-1.0)*(sqrt(b)-b);}vec4 gln_softLight(vec4 f,vec4 b){vec4 result;result.x=gln_softLight(f.x,b.x);result.y=gln_softLight(f.y,b.y);result.z=gln_softLight(f.z,b.z);result.a=gln_softLight(f.a,b.a);return result;}vec4 gln_screen(vec4 f,vec4 b){vec4 result;result=1.0-(1.0-f)*(1.0-b);return result;}float gln_overlay(float f,float b){return(b<0.5)? 2.0*f*b : 1.0-2.0*(1.0-f)*(1.0-b);}vec4 gln_overlay(vec4 f,vec4 b){vec4 result;result.x=gln_overlay(f.x,b.x);result.y=gln_overlay(f.y,b.y);result.z=gln_overlay(f.z,b.z);result.a=gln_overlay(f.a,b.a);return result;}vec4 gln_divide(vec4 f,vec4 b){vec4 result=vec4(0.0);result=b/f;return result;}vec4 gln_switch(vec4 f,vec4 b,float o){vec4 result=vec4(0.0);result=max((f*o),(b*(1.0-o)));return result;}vec4 gln_darken(vec4 f,vec4 b){vec4 result=vec4(0.0);result=min(f,b);return result;}vec4 gln_lighten(vec4 f,vec4 b){vec4 result=vec4(0.0);result=max(f,b);return result;}float gln_addSub(float f,float b){return f>0.5 ? f+b : b-f;}vec4 gln_addSub(vec4 f,vec4 b){vec4 result=vec4(0.0);result.r=gln_addSub(f.r,b.r);result.g=gln_addSub(f.g,b.g);result.b=gln_addSub(f.b,b.b);result.a=gln_addSub(f.a,b.a);return result;}vec4 gln_multiply(vec4 f,vec4 b){vec4 result=vec4(0.0);result=f*b;result.a=f.a+b.a*(1.0-f.a);return result;}vec4 gln_subtract(vec4 f,vec4 b){vec4 result=vec4(0.0);result=b-f;result.a=f.a+b.a*(1.0-f.a);return result;}vec4 gln_add(vec4 f,vec4 b){vec4 result=vec4(0.0);result=f+b;result.a=f.a+b.a*(1.0-f.a);return result;}vec4 gln_copy(vec4 f,vec4 b){vec4 result=vec4(0.0);result.a=f.a+b.a*(1.0-f.a);result.rgb=((f.rgb*f.a)+(b.rgb*b.a)*(1.0-f.a));return result;}/***Enum for gl-Noise Blend Modes.*@name gln_BLENDMODES*@enum{number}*@property{number}gln_COPY The<b>Copy</b>blending mode will just place the*foreground on top of the background.*@property{number}gln_ADD The<b>Add</b>blending mode will add the*foreground input value to each corresponding pixel in the background.*@property{number}gln_SUBSTRACT The<b>Substract</b>blending mode will*substract the foreground input value from each corresponding pixel in the*background.*@property{number}gln_MULTIPLY The<b>Multiply</b>blending mode will*multiply the background input value by each corresponding pixel in the*foreground.*@property{number}gln_ADDSUB The<b>Add Sub</b>blending mode works as*following:<ul><li>Foreground pixels with a value higher than 0.5 are added*to their respective background pixels.</li><li>Foreground pixels with a*value lower than 0.5 are substracted from their respective background pixels.*</li>*</ul>*@property{number}gln_LIGHTEN The<b>Lighten(Max)</b>Blending mode will*pick the higher value between the background and the foreground.*@property{number}gln_DARKEN The<b>Darken(Min)</b>Blending mode will pick*the lower value between the background and the foreground.*@property{number}gln_DIVIDE The<b>Divide</b>blending mode will divide the*background input pixels value by each corresponding pixel in the foreground.*@property{number}gln_OVERLAY The<b>Overlay</b>blending mode combines*Multiply and Screen blend modes:<ul><li>If the value of the lower layer*pixel is below 0.5,then a Multiply type blending is applied.</li><li>If*the value of the lower layer pixel is above 0.5,then a Screen type blending*is applied.</li>*</ul>*@property{number}gln_SCREEN With<b>Screen</b>blend mode the values of the*pixels in the two inputs are inverted,multiplied,and then inverted*again.</br>The result is the opposite effect to multiply and is always equal*or higher(brighter)compared to the original.*@property{number}gln_SOFTLIGHT The<b>Soft Light</b>blend mode creates a*subtle lighter or darker result depending on the brightness of the foreground*color.*</br>Blend colors that are more than 50% brightness will lighten the*background pixels and colors that are less than 50% brightness will darken*the background pixels.*//***Blends a Color with another.**@name gln_blend*@function*@param{vec4}f Foreground*@param{vec4}b Background*@param{gln_BLENDMODES}type Blend mode*@return{vec4}Mapped Value**@example*vec4 logo=texture2D(uLogo,uv);*vec4 rect=texture2D(uRect,uv);**vec4 final=gln_blend(logo,rect,gln_COPY);*/vec4 gln_blend(vec4 f,vec4 b,int type){vec4 n;if(type==gln_COPY){n=gln_copy(f,b);}else if(type==gln_ADD){n=gln_add(f,b);}else if(type==gln_SUBSTRACT){n=gln_subtract(f,b);}else if(type==gln_MULTIPLY){n=gln_multiply(f,b);}else if(type==gln_ADDSUB){n=gln_addSub(f,b);}else if(type==gln_LIGHTEN){n=gln_lighten(f,b);}else if(type==gln_DARKEN){n=gln_darken(f,b);}else if(type==gln_DIVIDE){n=gln_divide(f,b);}else if(type==gln_OVERLAY){n=gln_overlay(f,b);}else if(type==gln_SCREEN){n=gln_screen(f,b);}else if(type==gln_SOFTLIGHT){n=gln_softLight(f,b);}return n;}";  

const _Common
  = '#define GLSLIFY 1\n#define MAX_FBM_ITERATIONS 30\n#define gln_PI 3.1415926538\nvec4 _permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}vec4 _taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}/***@typedef{struct}gln_tFBMOpts Options for fBm generators.*@property{float}seed Seed for PRNG generation.*@property{float}persistance Factor by which successive layers of noise*will decrease in amplitude.*@property{float}lacunarity Factor by which successive layers of noise*will increase in frequency.*@property{float}scale "Zoom level" of generated noise.*@property{float}redistribution Flatness in the generated noise.*@property{int}octaves Number of layers of noise to stack.*@property{boolean}terbulance Enable terbulance*@property{boolean}ridge Convert the fBm to Ridge Noise. Only works*when "terbulance" is set to true.*/struct gln_tFBMOpts{float seed;float persistance;float lacunarity;float scale;float redistribution;int octaves;bool terbulance;bool ridge;};/***Converts a number from one range to another.**@name gln_map*@function*@param{}value Value to map*@param{float}min1 Minimum for current range*@param{float}max1 Maximum for current range*@param{float}min2 Minimum for wanted range*@param{float}max2 Maximum for wanted range*@return{float}Mapped Value**@example*float n=gln_map(-0.2,-1.0,1.0,0.0,1.0);**/float gln_map(float value,float min1,float max1,float min2,float max2){return min2+(value-min1)*(max2-min2)/(max1-min1);}/***Normalized a value from the range[-1,1]to the range[0,1].**@name gln_normalize*@function*@param{float}v Value to normalize*@return{float}Normalized Value**@example*float n=gln_normalize(-0.2);**/float gln_normalize(float v){return gln_map(v,-1.0,1.0,0.0,1.0);}/***Generates a random 2D Vector.**@name gln_rand2*@function*@param{vec2}p Vector to hash to generate the random numbers from.*@return{vec2}Random vector.**@example*vec2 n=gln_rand2(vec2(1.0,-4.2));*/vec2 gln_rand2(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);}/***Generates a random 3D Vector.**@name gln_rand3*@function*@param{vec3}p Vector to hash to generate the random numbers from.*@return{vec3}Random vector.**@example*vec3 n=gln_rand3(vec3(1.0,-4.2,0.2));*/vec3 gln_rand3(vec3 p){return mod(((p*34.0)+1.0)*p,289.0);}/***Generates a random 4D Vector.**@name gln_rand4*@function*@param{vec4}p Vector to hash to generate the random numbers from.*@return{vec4}Random vector.**@example*vec4 n=gln_rand4(vec4(1.0,-4.2,0.2,2.2));*/vec4 gln_rand4(vec4 p){return mod(((p*34.0)+1.0)*p,289.0);}/***Generates a random number.**@name gln_rand*@function*@param{float}n Value to hash to generate the number from.*@return{float}Random number.**@example*float n=gln_rand(2.5);*/float gln_rand(float n){return fract(sin(n)*1e4);}/***Generates a random number.**@name gln_rand*@function*@param{vec2}p Value to hash to generate the number from.*@return{float}Random number.**@example*float n=gln_rand(vec2(2.5,-1.8));*/float gln_rand(vec2 p){return fract(1e4*sin(17.0*p.x+p.y*0.1)*(0.1+abs(sin(p.y*13.0+p.x))));}';  

const _GerstnerWave
  = "#define GLSLIFY 1\n/***@typedef{struct}gln_tGerstnerWaveOpts Options for Gerstner Wave*generators.*@property{vec2}direction Direction of the wave*@property{float}steepness Steepness of the peeks*@property{float}wavelength Wavelength of the waves*/struct gln_tGerstnerWaveOpts{vec2 direction;float steepness;float wavelength;};/***Implimentation of Gerstner Wave*Based on: https:**@name gln_GerstnerWave*@function*@param{vec3}p Point to sample Gerstner Waves at.*@param{gln_tGerstnerWaveOpts}opts*@param{float}dt**@example*float n=gln_perlin(position.xy);*/vec3 gln_GerstnerWave(vec3 p,gln_tGerstnerWaveOpts opts,float dt){float steepness=opts.steepness;float wavelength=opts.wavelength;float k=2.0*gln_PI/wavelength;float c=sqrt(9.8/k);vec2 d=normalize(opts.direction);float f=k*(dot(d,p.xy)-c*dt);float a=steepness/k;return vec3(d.x*(a*cos(f)),a*sin(f),d.y*(a*cos(f)));}";  

const _Curl
  = '#define GLSLIFY 1\nvec3 _snois3(vec3 x){float s=gln_simplex(vec3(x));float s1=gln_simplex(vec3(x.y-19.1,x.z+33.4,x.x+47.2));float s2=gln_simplex(vec3(x.z+74.2,x.x-124.5,x.y+99.4));vec3 c=vec3(s,s1,s2);return c;}/***Generates 3D Curl Noise.**@name gln_curl*@function*@param{vec2}p Point to sample Curl Noise at.*@return{float}Value of Curl Noise at point "p".**@example*vec3 n=gln_curl(position);*/vec3 gln_curl(vec3 p){const float e=.1;vec3 dx=vec3(e,0.0,0.0);vec3 dy=vec3(0.0,e,0.0);vec3 dz=vec3(0.0,0.0,e);vec3 p_x0=_snois3(p-dx);vec3 p_x1=_snois3(p+dx);vec3 p_y0=_snois3(p-dy);vec3 p_y1=_snois3(p+dy);vec3 p_z0=_snois3(p-dz);vec3 p_z1=_snois3(p+dz);float x=p_y1.z-p_y0.z-p_z1.y+p_z0.y;float y=p_z1.x-p_z0.x-p_x1.z+p_x0.z;float z=p_x1.y-p_x0.y-p_y1.x+p_y0.x;const float divisor=1.0/(2.0*e);return normalize(vec3(x,y,z)*divisor);}';  

const Perlin = _Perlin
const Simplex = _Simplex
const Worley = _Worley
const BlendModes = _BlendModes
const Common = _Common
const GerstnerWave = _GerstnerWave
const Curl = _Curl
const _all = [Perlin, Simplex, Worley, BlendModes, GerstnerWave, Curl]
const All = _all
const isNode
  = typeof process !== 'undefined'
  && process.versions != null
  && process.versions.node != null
//~START~
//~END~
function getDeps(chunks) {
  const names = []
  const deps = []
  chunks.forEach((chunk) => {
    const name = chunk.match(/#name: (.*)\n/)
    const dep = chunk.match(/#deps: (.*)\n/)
    names.push(name ? name[1] : '')
    deps.push(dep ? dep[1].split(' ') : [])
  })
  return { names, deps }
}
function verifyDeps(chunks) {
  const { names, deps } = getDeps(chunks)
  const missing_dependancy = []
  let missing_dependant
  deps.forEach((dep, i) => {
    dep.forEach((d, j) => {
      if (!names.includes(d)) {
        missing_dependancy.push({
          outter: i,
          inner: j,
        })
        missing_dependant = names[i]
      }
    })
  })
  if (missing_dependancy.length !== 0) {
    const dependancies = missing_dependancy.map(e => deps[e.outter][e.inner])
    throw new Error(
      `glNoise: Missing dependencies "${dependancies.join(
        ', ',
      )}" for "${missing_dependant}"`,
    )
  }
}
/**
 * Loads Shaders without appeneding any Shader Chunks.
 * @deprecated
 *
 * @async
 * @param {string[]} shaders Array of paths to shaders.
 * @returns {Promise<string[]>}         Array of shaders corresponding to each path.
 *
 * @example
 * const [vert, frag] = await loadShadersRaw(["vert.glsl", "frag.glsl"]);
 */
async function loadShadersRaw(shaders) {
  const _fetch = isNode ? window.fetch : window.fetch
  const _shaders = Array.isArray(shaders) ? shaders : [shaders]
  const output = await Promise.all(
    _shaders.map(async s => (await _fetch(s)).text()),
  )
  return Array.isArray(shaders) ? output : output[0]
}
/**
 * Loads shaders with specified Shader Chunks.
 * If chunks not specified, all chunks will be appended.
 * @deprecated
 *
 * @async
 * @param {string[]} paths      Array of Paths to shaders.
 * @param {string[][]} chunks   Array of chunks to append to each shader
 * @param {string[]} headers    Array of headers to be appended to each shader. Can be used to provide precision;
 * @returns {Promise<string[]>}          Array of shaders corresponding to each path with respective chunks applied.
 *
 * @example
 * const head = `
 * precision highp float;
 * ${Common}
 * `;
 *
 * const chunks = [
 *      [Perlin, Simplex],
 *      []
 * ];
 * const paths = [
 *      "vert.glsl",
 *      "frag.glsl",
 * ];
 * const [vert, frag] = await loadShaders(paths, chunks, head);
 */
async function loadShaders(paths, chunks, headers) {
  if (!paths || paths.length <= 0)
    throw new Error('glNoise: \'loadShaders\' requires atleast one path.')
  let _paths
  if (!Array.isArray(paths)) {
    _paths = [paths]
  }
  else {
    _paths = paths
  }
  if (!headers) headers = new Array(_paths.length).fill(Common)
  let shaders = await loadShadersRaw(_paths)
  if (chunks) {
    shaders = shaders.map((s, i) => {
      let c
      if (chunks[i]) c = chunks[i]
      else c = _all
      verifyDeps(c)
      let h
      if (headers[i]) h = headers[i]
      else h = Common
      return `\n${h}\n${c.join('\n')}\n${s}`
    })
  }
  else {
    shaders = shaders.map((s, i) => {
      let h
      if (headers[i]) h = headers[i]
      else h = Common
      return `\n${h}\n${_all.join('\n')}\n${s}`
    })
  }
  if (!Array.isArray(paths)) {
    return shaders[0]
  }
  else {
    return shaders
  }
}
/**
 * Patches shaders with specified Shader Chunks.
 * If chunks not specified, all chunks will be appended.
 *
 * @async
 * @param {string[]} paths      Array of Shaders as strings.
 * @param {string[][]} chunks   Array of chunks to append to each shader
 * @param {string[]} headers    Array of headers to be appended to each shader. Can be used to provide precision;
 * @returns {string[]}          Array of shaders corresponding to each path with respective chunks applied.
 *
 * @example
 * const head = `
 * precision highp float;
 * ${Common}
 * `;
 *
 * const chunks = [
 *      [Perlin, Simplex],
 *      []
 * ];
 * const shaders = [
 *      `
 *         gl_Posiiton = ...
 *      `,
 *         gl_FragColor = ...
 *      `,
 * ];
 * const [vert, frag] = await loadShaders(shaders, chunks, head);
 */
function patchShaders(shader, chunks, headers) {
  if (!shader || shader.length <= 0)
    throw new Error('glNoise: \'loadShaders\' requires atleast one path.')
  let _shader
  if (!Array.isArray(shader)) {
    _shader = [shader]
  }
  else {
    _shader = shader
  }
  if (!headers) headers = new Array(_shader.length).fill(Common)
  let output = _shader
  if (chunks) {
    output = output.map((s, i) => {
      let c
      if (chunks[i]) c = chunks[i]
      else c = _all
      verifyDeps(c)
      let h
      if (headers[i]) h = headers[i]
      else h = Common
      return `\n${h}\n${c.join('\n')}\n${s}`
    })
  }
  else {
    output = output.map((s, i) => {
      let h
      if (headers[i]) h = headers[i]
      else h = Common
      return `\n${h}\n${_all.join('\n')}\n${s}`
    })
  }
  if (!Array.isArray(shader)) {
    return output[0]
  }
  else {
    return output
  }
}
/**
 * Loads shaders with Shader Chunks for use with [THREE-CustomShaderMaterial.]{@link https://github.com/FarazzShaikh/THREE-CustomShaderMaterial}
 * If chunks not specified, all chunks will be appended.
 * @deprecated
 *
 * @async
 * @param {Object} shaders              Paths of shaders.
 * * @param {string} shaders.defines        Path of definitions shader.
 * * @param {string} shaders.header         Path of header shader.
 * * @param {string} shaders.main           Path of main shader.
 * @param {string[]} chunks             Array of chunks to append into the Header Section.
 * @returns {Promise<Object>}                    CSM friendly shader.
 *
 * @example
 * const chunks =  [Perlin, Simplex];
 * const paths = [
 *      defines: "defines.glsl",
 *      header: "header.glsl",
 *      main: "main.glsl",
 * ];
 * const {defines, header, main} = await loadShadersCSM(paths, chunks);
 */
async function loadShadersCSM(shaders, chunks) {
  const _fetch = isNode ? window.fetch : window.fetch
  let _defines = '',
    _header = '',
    _main = ''
  if (shaders.defines) _defines = await (await _fetch(shaders.defines)).text()
  if (shaders.header) _header = await (await _fetch(shaders.header)).text()
  if (shaders.main) _main = await (await _fetch(shaders.main)).text()
  if (!chunks)
    return {
      defines: `\n${_defines}\n${Common}`,
      header: `\n${_all.join('\n')}\n // ABCD \n${_header}`,
      main: `\n${_main}`,
    }
  verifyDeps(chunks)
  return {
    defines: `\n${_defines}\n${Common}`,
    header: `\n${chunks.join('\n')}\n${_header}`,
    main: `\n${_main}`,
  }
}
/**
 * Patches shaders with Shader Chunks for use with [THREE-CustomShaderMaterial.]{@link https://github.com/FarazzShaikh/THREE-CustomShaderMaterial}
 * If chunks not specified, all chunks will be appended.
 *
 * @async
 * @param {Object} shaders              Paths of shaders.
 * * @param {string} shaders.defines        Path of definitions shader.
 * * @param {string} shaders.header         Path of header shader.
 * * @param {string} shaders.main           Path of main shader.
 * @param {string[]} chunks             Array of chunks to append into the Header Section.
 * @returns {Object}                    CSM friendly shader.
 *
 * @example
 * const chunks =  [Perlin, Simplex];
 * const shaders = [
 *      defines: "...",
 *      header: "...",
 *      main: "...",
 * ];
 * const {defines, header, main} = await loadShadersCSM(shaders, chunks);
 */
function patchShadersCSM(shaders, chunks) {
  let _defines = '',
    _header = '',
    _main = ''
  if (shaders.defines) _defines = shaders.defines
  if (shaders.header) _header = shaders.header
  if (shaders.main) _main = shaders.main
  if (!chunks)
    return {
      defines: `\n${_defines}\n${Common}`,
      header: `\n${_all.join('\n')}\n // ABCD \n${_header}`,
      main: `\n${_main}`,
    }
  verifyDeps(chunks)
  return {
    defines: `\n${_defines}\n${Common}`,
    header: `\n${chunks.join('\n')}\n${_header}`,
    main: `\n${_main}`,
  }
}

export {
  All,
  BlendModes,
  Common,
  Curl,
  GerstnerWave,
  Perlin,
  Simplex,
  Worley,
  loadShaders,
  loadShadersCSM,
  loadShadersRaw,
  patchShaders,
  patchShadersCSM,
}
