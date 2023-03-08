import type { DefineComponent } from 'vue'
import type { 
LineBasicMaterialParameters,
LineDashedMaterialParameters,
MeshBasicMaterialParameters,
MeshDepthMaterialParameters,
MeshDistanceMaterialParameters,
MeshLambertMaterialParameters,
MeshMatcapMaterialParameters,
MeshNormalMaterialParameters,
MeshPhongMaterialParameters,
MeshPhysicalMaterialParameters,
MeshStandardMaterialParameters,
MeshToonMaterialParameters,
PointsMaterialParameters,
ShaderMaterialParameters,
ShadowMaterialParameters,
SpriteMaterialParameters,
MaterialParameters,
BoxGeometry,
CapsuleGeometry,
CircleGeometry,
ConeGeometry,
CylinderGeometry,
DodecahedronGeometry,
EdgesGeometry,
IcosahedronGeometry,
LatheGeometry,
OctahedronGeometry,
PlaneGeometry,
PolyhedronGeometry,
RingGeometry,
SphereGeometry,
TetrahedronGeometry,
TorusGeometry,
TorusKnotGeometry,
TubeGeometry,
WireframeGeometry } from 'three'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    TresLineBasicMaterial: DefineComponent<Partial<LineBasicMaterialParameters>>
    TresLineDashedMaterial: DefineComponent<Partial<LineDashedMaterialParameters>>
    TresMeshBasicMaterial: DefineComponent<Partial<MeshBasicMaterialParameters>>
    TresMeshDepthMaterial: DefineComponent<Partial<MeshDepthMaterialParameters>>
    TresMeshDistanceMaterial: DefineComponent<Partial<MeshDistanceMaterialParameters>>
    TresMeshLambertMaterial: DefineComponent<Partial<MeshLambertMaterialParameters>>
    TresMeshMatcapMaterial: DefineComponent<Partial<MeshMatcapMaterialParameters>>
    TresMeshNormalMaterial: DefineComponent<Partial<MeshNormalMaterialParameters>>
    TresMeshPhongMaterial: DefineComponent<Partial<MeshPhongMaterialParameters>>
    TresMeshPhysicalMaterial: DefineComponent<Partial<MeshPhysicalMaterialParameters>>
    TresMeshStandardMaterial: DefineComponent<Partial<MeshStandardMaterialParameters>>
    TresMeshToonMaterial: DefineComponent<Partial<MeshToonMaterialParameters>>
    TresPointsMaterial: DefineComponent<Partial<PointsMaterialParameters>>
    TresRawShaderMaterial: DefineComponent<Partial<ShaderMaterialParameters>>
    TresShaderMaterial: DefineComponent<Partial<ShaderMaterialParameters>>
    TresShadowMaterial: DefineComponent<Partial<ShadowMaterialParameters>>
    TresSpriteMaterial: DefineComponent<Partial<SpriteMaterialParameters>>
    TresMaterial: DefineComponent<Partial<MaterialParameters>>
    TresBoxGeometry: DefineComponent<Partial<BoxGeometry['parameters']>>
    TresCapsuleGeometry: DefineComponent<Partial<CapsuleGeometry['parameters']>>
    TresCircleGeometry: DefineComponent<Partial<CircleGeometry['parameters']>>
    TresConeGeometry: DefineComponent<Partial<ConeGeometry['parameters']>>
    TresCylinderGeometry: DefineComponent<Partial<CylinderGeometry['parameters']>>
    TresDodecahedronGeometry: DefineComponent<Partial<DodecahedronGeometry['parameters']>>
    TresEdgesGeometry: DefineComponent<Partial<EdgesGeometry['parameters']>>
    TresIcosahedronGeometry: DefineComponent<Partial<IcosahedronGeometry['parameters']>>
    TresLatheGeometry: DefineComponent<Partial<LatheGeometry['parameters']>>
    TresOctahedronGeometry: DefineComponent<Partial<OctahedronGeometry['parameters']>>
    TresPlaneGeometry: DefineComponent<Partial<PlaneGeometry['parameters']>>
    TresPolyhedronGeometry: DefineComponent<Partial<PolyhedronGeometry['parameters']>>
    TresRingGeometry: DefineComponent<Partial<RingGeometry['parameters']>>
    TresSphereGeometry: DefineComponent<Partial<SphereGeometry['parameters']>>
    TresTetrahedronGeometry: DefineComponent<Partial<TetrahedronGeometry['parameters']>>
    TresTorusGeometry: DefineComponent<Partial<TorusGeometry['parameters']>>
    TresTorusKnotGeometry: DefineComponent<Partial<TorusKnotGeometry['parameters']>>
    TresTubeGeometry: DefineComponent<Partial<TubeGeometry['parameters']>>
    TresWireframeGeometry: DefineComponent<Partial<WireframeGeometry['parameters']>>
  }
}