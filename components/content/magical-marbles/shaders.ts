export const vertex = /* glsl */ `
  varying vec3 v_pos;
  varying vec3 v_dir;

    void main() {
        v_pos = position;
        v_dir = position - cameraPosition; // Points from camera to vertex

        // csm_Position = position;
    }
`

export const fragment = /* glsl */ `
      #define FLIP vec2(1., -1.)

      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform sampler2D heightMap;
      uniform sampler2D displacementMap;
      uniform int iterations;
      uniform float depth;
      uniform float smoothing;
      uniform float displacement;
      uniform float time;

      varying vec3 v_pos;
      varying vec3 v_dir;

         	/**
         * @param p - Point to displace
         * @param strength - How much the map can displace the point
         * @returns Point with scrolling displacement applied
         */
        vec3 displacePoint(vec3 p, float strength) {
        	vec2 uv = equirectUv(normalize(p));
          vec2 scroll = vec2(time, 0.);
          vec3 displacementA = texture(displacementMap, uv + scroll).rgb; // Upright
					vec3 displacementB = texture(displacementMap, uv * FLIP - scroll).rgb; // Upside down

          // Center the range to [-0.5, 0.5], note the range of their sum is [-1, 1]
          displacementA -= 0.5;
          displacementB -= 0.5;

          return p + strength * (displacementA + displacementB);
        }

				/**
          * @param rayOrigin - Point on sphere
          * @param rayDir - Normalized ray direction
          * @returns Diffuse RGB color
          */
        vec3 marchMarble(vec3 rayOrigin, vec3 rayDir) {
          float perIteration = 1. / float(iterations);
          vec3 deltaRay = rayDir * perIteration * depth;

          // Start at point of intersection and accumulate volume
          vec3 p = rayOrigin;
          float totalVolume = 0.;

          for (int i=0; i<iterations; ++i) {
            // Read heightmap from spherical direction of displaced ray position
            vec3 displaced = displacePoint(p, displacement);
            vec2 uv = equirectUv(normalize(displaced));
            float heightMapVal = texture(heightMap, uv).r;

            // Take a slice of the heightmap
            float height = length(p); // 1 at surface, 0 at core, assuming radius = 1
            float cutoff = 1. - float(i) * perIteration;
            float slice = smoothstep(cutoff, cutoff + smoothing, heightMapVal);

            // Accumulate the volume and advance the ray forward one step
            totalVolume += slice * perIteration;
            p += deltaRay;
          }
          return mix(colorA, colorB, totalVolume);
        }

    void main() {
      	vec3 rayDir = normalize(v_dir);
        vec3 rayOrigin = v_pos;

        vec3 rgb = marchMarble(rayOrigin, rayDir);
				csm_DiffuseColor = vec4(rgb, 1.);
    } `
