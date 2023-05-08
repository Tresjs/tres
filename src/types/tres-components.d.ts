
      import type { DefineComponent } from 'vue'
      import type { Vector2, Vector3, Color } from 'three'
      export type TresVectorProp = Vector2 | Vector3 | number[] | number
      export type TresColor = string | number | Color | number[]
      import type {
        Mesh,
        AmbientLight,
ArrayCamera,
ArrowHelper,
AxesHelper,
Box3Helper,
BoxBufferGeometry,
BoxGeometry,
BoxHelper,
BufferGeometry,
Camera,
CameraHelper,
CapsuleBufferGeometry,
CapsuleGeometry,
CircleBufferGeometry,
CircleGeometry,
ConeBufferGeometry,
ConeGeometry,
CubeCamera,
CylinderBufferGeometry,
CylinderGeometry,
DirectionalLight,
DirectionalLightHelper,
DodecahedronBufferGeometry,
DodecahedronGeometry,
EdgesGeometry,
ExtrudeBufferGeometry,
ExtrudeGeometry,
Fog,
GridHelper,
HemisphereLight,
HemisphereLightHelper,
IcosahedronBufferGeometry,
IcosahedronGeometry,
InstancedBufferGeometry,
LatheBufferGeometry,
LatheGeometry,
Light,
LineBasicMaterial,
LineDashedMaterial,
Material,
MeshBasicMaterial,
MeshDepthMaterial,
MeshDistanceMaterial,
MeshLambertMaterial,
MeshMatcapMaterial,
MeshNormalMaterial,
MeshPhongMaterial,
MeshPhysicalMaterial,
MeshStandardMaterial,
MeshToonMaterial,
OctahedronBufferGeometry,
OctahedronGeometry,
OrthographicCamera,
PerspectiveCamera,
PlaneBufferGeometry,
PlaneGeometry,
PlaneHelper,
PointLight,
PointLightHelper,
PointsMaterial,
PolarGridHelper,
PolyhedronBufferGeometry,
PolyhedronGeometry,
RawShaderMaterial,
RectAreaLight,
RingBufferGeometry,
RingGeometry,
ShaderMaterial,
ShadowMaterial,
ShapeBufferGeometry,
ShapeGeometry,
SkeletonHelper,
SphereBufferGeometry,
SphereGeometry,
SpotLight,
SpotLightHelper,
SpriteMaterial,
StereoCamera,
TetrahedronBufferGeometry,
TetrahedronGeometry,
TorusBufferGeometry,
TorusGeometry,
TorusKnotBufferGeometry,
TorusKnotGeometry,
TubeBufferGeometry,
TubeGeometry,
WireframeGeometry
      } from 'three';

      type OverwrittenProps = 'position' | 'rotation' | 'scale' | 'color'

      type TresModifiedObject = {
        /**
         * A Vector3 | Array | scalar representing the object's local position. Default is (0, 0, 0).
         *
         * @type {TresVectorProp}
         */
        position: TresVectorProp
        /**
         * A Vector3 | Array | scalar representing the object's local rotation. Default is (0, 0, 0).
         *
         * @type {TresVectorProp}
         */
        rotation: TresVectorProp
        /**
         * A Vector3 | Array | scalar representing the object's local scale. Default is (0, 0, 0).
         *
         * @type {TresVectorProp}
         */
        scale: TresVectorProp
        /**
         * Color of the material, by default set to white (0xffffff).
         *
         * @type {TresColor}
         */
        color: TresColor,
        /**
         * Arguments of the THREE instance, by default set to empty array.
         *
         * @type {any[]}
         * 
         * @example
         * 
         * ```html
         * <TresBoxGeometry args="[1, 3, 4]" /> // BoxGeometry(1, 3, 4)
         * ```
         */
        args?: any[],
      }
      
      declare module 'vue' {
        export interface GlobalComponents {
          TresMesh: DefineComponent<Partial<Omit<Mesh, OverwrittenProps> & TresModifiedObject>>
      TresBoxBufferGeometry: DefineComponent<Partial<Omit<BoxBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresBoxGeometry: DefineComponent<Partial<Omit<BoxGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresBufferGeometry: DefineComponent<Partial<Omit<BufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresCapsuleBufferGeometry: DefineComponent<Partial<Omit<CapsuleBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresCapsuleGeometry: DefineComponent<Partial<Omit<CapsuleGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresCircleBufferGeometry: DefineComponent<Partial<Omit<CircleBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresCircleGeometry: DefineComponent<Partial<Omit<CircleGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresConeBufferGeometry: DefineComponent<Partial<Omit<ConeBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresConeGeometry: DefineComponent<Partial<Omit<ConeGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresCylinderBufferGeometry: DefineComponent<Partial<Omit<CylinderBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresCylinderGeometry: DefineComponent<Partial<Omit<CylinderGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresDodecahedronBufferGeometry: DefineComponent<Partial<Omit<DodecahedronBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresDodecahedronGeometry: DefineComponent<Partial<Omit<DodecahedronGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresEdgesGeometry: DefineComponent<Partial<Omit<EdgesGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresExtrudeBufferGeometry: DefineComponent<Partial<Omit<ExtrudeBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresExtrudeGeometry: DefineComponent<Partial<Omit<ExtrudeGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresIcosahedronBufferGeometry: DefineComponent<Partial<Omit<IcosahedronBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresIcosahedronGeometry: DefineComponent<Partial<Omit<IcosahedronGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresInstancedBufferGeometry: DefineComponent<Partial<Omit<InstancedBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresLatheBufferGeometry: DefineComponent<Partial<Omit<LatheBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresLatheGeometry: DefineComponent<Partial<Omit<LatheGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresOctahedronBufferGeometry: DefineComponent<Partial<Omit<OctahedronBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresOctahedronGeometry: DefineComponent<Partial<Omit<OctahedronGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresPlaneBufferGeometry: DefineComponent<Partial<Omit<PlaneBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresPlaneGeometry: DefineComponent<Partial<Omit<PlaneGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresPolyhedronBufferGeometry: DefineComponent<Partial<Omit<PolyhedronBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresPolyhedronGeometry: DefineComponent<Partial<Omit<PolyhedronGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresRingBufferGeometry: DefineComponent<Partial<Omit<RingBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresRingGeometry: DefineComponent<Partial<Omit<RingGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresShapeBufferGeometry: DefineComponent<Partial<Omit<ShapeBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresShapeGeometry: DefineComponent<Partial<Omit<ShapeGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresSphereBufferGeometry: DefineComponent<Partial<Omit<SphereBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresSphereGeometry: DefineComponent<Partial<Omit<SphereGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresTetrahedronBufferGeometry: DefineComponent<Partial<Omit<TetrahedronBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresTetrahedronGeometry: DefineComponent<Partial<Omit<TetrahedronGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresTorusBufferGeometry: DefineComponent<Partial<Omit<TorusBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresTorusGeometry: DefineComponent<Partial<Omit<TorusGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresTorusKnotBufferGeometry: DefineComponent<Partial<Omit<TorusKnotBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresTorusKnotGeometry: DefineComponent<Partial<Omit<TorusKnotGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresTubeBufferGeometry: DefineComponent<Partial<Omit<TubeBufferGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresTubeGeometry: DefineComponent<Partial<Omit<TubeGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
TresWireframeGeometry: DefineComponent<Partial<Omit<WireframeGeometry['parameters'], OverwrittenProps> & TresModifiedObject>>
        TresAmbientLight: DefineComponent<Partial<Omit<AmbientLight, OverwrittenProps > & TresModifiedObject>>
TresArrayCamera: DefineComponent<Partial<Omit<ArrayCamera, OverwrittenProps > & TresModifiedObject>>
TresArrowHelper: DefineComponent<Partial<Omit<ArrowHelper, OverwrittenProps > & TresModifiedObject>>
TresAxesHelper: DefineComponent<Partial<Omit<AxesHelper, OverwrittenProps > & TresModifiedObject>>
TresBox3Helper: DefineComponent<Partial<Omit<Box3Helper, OverwrittenProps > & TresModifiedObject>>
TresBoxBufferGeometry: DefineComponent<Partial<Omit<BoxBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresBoxGeometry: DefineComponent<Partial<Omit<BoxGeometry, OverwrittenProps > & TresModifiedObject>>
TresBoxHelper: DefineComponent<Partial<Omit<BoxHelper, OverwrittenProps > & TresModifiedObject>>
TresBufferGeometry: DefineComponent<Partial<Omit<BufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresCamera: DefineComponent<Partial<Omit<Camera, OverwrittenProps > & TresModifiedObject>>
TresCameraHelper: DefineComponent<Partial<Omit<CameraHelper, OverwrittenProps > & TresModifiedObject>>
TresCapsuleBufferGeometry: DefineComponent<Partial<Omit<CapsuleBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresCapsuleGeometry: DefineComponent<Partial<Omit<CapsuleGeometry, OverwrittenProps > & TresModifiedObject>>
TresCircleBufferGeometry: DefineComponent<Partial<Omit<CircleBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresCircleGeometry: DefineComponent<Partial<Omit<CircleGeometry, OverwrittenProps > & TresModifiedObject>>
TresConeBufferGeometry: DefineComponent<Partial<Omit<ConeBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresConeGeometry: DefineComponent<Partial<Omit<ConeGeometry, OverwrittenProps > & TresModifiedObject>>
TresCubeCamera: DefineComponent<Partial<Omit<CubeCamera, OverwrittenProps > & TresModifiedObject>>
TresCylinderBufferGeometry: DefineComponent<Partial<Omit<CylinderBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresCylinderGeometry: DefineComponent<Partial<Omit<CylinderGeometry, OverwrittenProps > & TresModifiedObject>>
TresDirectionalLight: DefineComponent<Partial<Omit<DirectionalLight, OverwrittenProps > & TresModifiedObject>>
TresDirectionalLightHelper: DefineComponent<Partial<Omit<DirectionalLightHelper, OverwrittenProps > & TresModifiedObject>>
TresDodecahedronBufferGeometry: DefineComponent<Partial<Omit<DodecahedronBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresDodecahedronGeometry: DefineComponent<Partial<Omit<DodecahedronGeometry, OverwrittenProps > & TresModifiedObject>>
TresEdgesGeometry: DefineComponent<Partial<Omit<EdgesGeometry, OverwrittenProps > & TresModifiedObject>>
TresExtrudeBufferGeometry: DefineComponent<Partial<Omit<ExtrudeBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresExtrudeGeometry: DefineComponent<Partial<Omit<ExtrudeGeometry, OverwrittenProps > & TresModifiedObject>>
TresFog: DefineComponent<Partial<Omit<Fog, OverwrittenProps > & TresModifiedObject>>
TresGridHelper: DefineComponent<Partial<Omit<GridHelper, OverwrittenProps > & TresModifiedObject>>
TresHemisphereLight: DefineComponent<Partial<Omit<HemisphereLight, OverwrittenProps > & TresModifiedObject>>
TresHemisphereLightHelper: DefineComponent<Partial<Omit<HemisphereLightHelper, OverwrittenProps > & TresModifiedObject>>
TresIcosahedronBufferGeometry: DefineComponent<Partial<Omit<IcosahedronBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresIcosahedronGeometry: DefineComponent<Partial<Omit<IcosahedronGeometry, OverwrittenProps > & TresModifiedObject>>
TresInstancedBufferGeometry: DefineComponent<Partial<Omit<InstancedBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresLatheBufferGeometry: DefineComponent<Partial<Omit<LatheBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresLatheGeometry: DefineComponent<Partial<Omit<LatheGeometry, OverwrittenProps > & TresModifiedObject>>
TresLight: DefineComponent<Partial<Omit<Light, OverwrittenProps > & TresModifiedObject>>
TresLineBasicMaterial: DefineComponent<Partial<Omit<LineBasicMaterial, OverwrittenProps > & TresModifiedObject>>
TresLineDashedMaterial: DefineComponent<Partial<Omit<LineDashedMaterial, OverwrittenProps > & TresModifiedObject>>
TresMaterial: DefineComponent<Partial<Omit<Material, OverwrittenProps > & TresModifiedObject>>
TresMeshBasicMaterial: DefineComponent<Partial<Omit<MeshBasicMaterial, OverwrittenProps > & TresModifiedObject>>
TresMeshDepthMaterial: DefineComponent<Partial<Omit<MeshDepthMaterial, OverwrittenProps > & TresModifiedObject>>
TresMeshDistanceMaterial: DefineComponent<Partial<Omit<MeshDistanceMaterial, OverwrittenProps > & TresModifiedObject>>
TresMeshLambertMaterial: DefineComponent<Partial<Omit<MeshLambertMaterial, OverwrittenProps > & TresModifiedObject>>
TresMeshMatcapMaterial: DefineComponent<Partial<Omit<MeshMatcapMaterial, OverwrittenProps > & TresModifiedObject>>
TresMeshNormalMaterial: DefineComponent<Partial<Omit<MeshNormalMaterial, OverwrittenProps > & TresModifiedObject>>
TresMeshPhongMaterial: DefineComponent<Partial<Omit<MeshPhongMaterial, OverwrittenProps > & TresModifiedObject>>
TresMeshPhysicalMaterial: DefineComponent<Partial<Omit<MeshPhysicalMaterial, OverwrittenProps > & TresModifiedObject>>
TresMeshStandardMaterial: DefineComponent<Partial<Omit<MeshStandardMaterial, OverwrittenProps > & TresModifiedObject>>
TresMeshToonMaterial: DefineComponent<Partial<Omit<MeshToonMaterial, OverwrittenProps > & TresModifiedObject>>
TresOctahedronBufferGeometry: DefineComponent<Partial<Omit<OctahedronBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresOctahedronGeometry: DefineComponent<Partial<Omit<OctahedronGeometry, OverwrittenProps > & TresModifiedObject>>
TresOrthographicCamera: DefineComponent<Partial<Omit<OrthographicCamera, OverwrittenProps > & TresModifiedObject>>
TresPerspectiveCamera: DefineComponent<Partial<Omit<PerspectiveCamera, OverwrittenProps > & TresModifiedObject>>
TresPlaneBufferGeometry: DefineComponent<Partial<Omit<PlaneBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresPlaneGeometry: DefineComponent<Partial<Omit<PlaneGeometry, OverwrittenProps > & TresModifiedObject>>
TresPlaneHelper: DefineComponent<Partial<Omit<PlaneHelper, OverwrittenProps > & TresModifiedObject>>
TresPointLight: DefineComponent<Partial<Omit<PointLight, OverwrittenProps > & TresModifiedObject>>
TresPointLightHelper: DefineComponent<Partial<Omit<PointLightHelper, OverwrittenProps > & TresModifiedObject>>
TresPointsMaterial: DefineComponent<Partial<Omit<PointsMaterial, OverwrittenProps > & TresModifiedObject>>
TresPolarGridHelper: DefineComponent<Partial<Omit<PolarGridHelper, OverwrittenProps > & TresModifiedObject>>
TresPolyhedronBufferGeometry: DefineComponent<Partial<Omit<PolyhedronBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresPolyhedronGeometry: DefineComponent<Partial<Omit<PolyhedronGeometry, OverwrittenProps > & TresModifiedObject>>
TresRawShaderMaterial: DefineComponent<Partial<Omit<RawShaderMaterial, OverwrittenProps > & TresModifiedObject>>
TresRectAreaLight: DefineComponent<Partial<Omit<RectAreaLight, OverwrittenProps > & TresModifiedObject>>
TresRingBufferGeometry: DefineComponent<Partial<Omit<RingBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresRingGeometry: DefineComponent<Partial<Omit<RingGeometry, OverwrittenProps > & TresModifiedObject>>
TresShaderMaterial: DefineComponent<Partial<Omit<ShaderMaterial, OverwrittenProps > & TresModifiedObject>>
TresShadowMaterial: DefineComponent<Partial<Omit<ShadowMaterial, OverwrittenProps > & TresModifiedObject>>
TresShapeBufferGeometry: DefineComponent<Partial<Omit<ShapeBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresShapeGeometry: DefineComponent<Partial<Omit<ShapeGeometry, OverwrittenProps > & TresModifiedObject>>
TresSkeletonHelper: DefineComponent<Partial<Omit<SkeletonHelper, OverwrittenProps > & TresModifiedObject>>
TresSphereBufferGeometry: DefineComponent<Partial<Omit<SphereBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresSphereGeometry: DefineComponent<Partial<Omit<SphereGeometry, OverwrittenProps > & TresModifiedObject>>
TresSpotLight: DefineComponent<Partial<Omit<SpotLight, OverwrittenProps > & TresModifiedObject>>
TresSpotLightHelper: DefineComponent<Partial<Omit<SpotLightHelper, OverwrittenProps > & TresModifiedObject>>
TresSpriteMaterial: DefineComponent<Partial<Omit<SpriteMaterial, OverwrittenProps > & TresModifiedObject>>
TresStereoCamera: DefineComponent<Partial<Omit<StereoCamera, OverwrittenProps > & TresModifiedObject>>
TresTetrahedronBufferGeometry: DefineComponent<Partial<Omit<TetrahedronBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresTetrahedronGeometry: DefineComponent<Partial<Omit<TetrahedronGeometry, OverwrittenProps > & TresModifiedObject>>
TresTorusBufferGeometry: DefineComponent<Partial<Omit<TorusBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresTorusGeometry: DefineComponent<Partial<Omit<TorusGeometry, OverwrittenProps > & TresModifiedObject>>
TresTorusKnotBufferGeometry: DefineComponent<Partial<Omit<TorusKnotBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresTorusKnotGeometry: DefineComponent<Partial<Omit<TorusKnotGeometry, OverwrittenProps > & TresModifiedObject>>
TresTubeBufferGeometry: DefineComponent<Partial<Omit<TubeBufferGeometry, OverwrittenProps > & TresModifiedObject>>
TresTubeGeometry: DefineComponent<Partial<Omit<TubeGeometry, OverwrittenProps > & TresModifiedObject>>
TresWireframeGeometry: DefineComponent<Partial<Omit<WireframeGeometry, OverwrittenProps > & TresModifiedObject>>
        }
      }
      