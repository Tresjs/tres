export const gamesOfSinus = `
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
