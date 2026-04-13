export const truchet = `
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
