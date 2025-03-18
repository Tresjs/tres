import type { JointAxesMask } from '@dimforge/rapier3d-compat'
import type { Component } from 'vue'
import NativeBaseJoint from './BaseJoint.vue'
import type {
  JointProps,
  JointType,
  QuaternionArray,
  VectorArray,
} from '../../types'

const createJoint = <Props extends Omit<Props, 'type'>>(type: JointType): Component<Props> => ({
  __name: `${type.charAt(0).toUpperCase() + type.slice(1)}Joint`,
  extends: NativeBaseJoint,
  props: {
    ...NativeBaseJoint.props,
    type: {
      type: String,
      default: type,
      validator: (value: typeof type) => value === type,
    },
  },
  setup: (_props, ctx) => NativeBaseJoint?.setup?.(
    _props as unknown as Parameters<
      Exclude<(typeof NativeBaseJoint)['setup'], undefined>
    >['0'],
    ctx,
  ),
})

/** @description Joint set as `Fixed` */
export const FixedJoint = createJoint<Omit<JointProps, 'params'> & {
  params: [
    anchor1: VectorArray,
    frame1: QuaternionArray,
    anchor2: VectorArray,
    frame2: QuaternionArray,
  ]
}>('fixed')

/** @description Joint set as `Generic` */
export const GenericJoint = createJoint<Omit<JointProps, 'params'> & {
  params: [
    anchor1: VectorArray,
    anchor2: VectorArray,
    axis: VectorArray,
    axesMask: JointAxesMask,
  ]
}>('generic')

/** @description Joint set as ` Prismatic` */
export const PrismaticJoint = createJoint<Omit<JointProps, 'params'> & {
  params: [
    anchor1: VectorArray,
    anchor2: VectorArray,
    axis: VectorArray,
  ]
}>('prismatic')

/** @description Joint set as `Revolute` */
export const RevoluteJoint = createJoint<Omit<JointProps, 'params'> & {
  params: [
    anchor1: VectorArray,
    anchor2: VectorArray,
    axis: VectorArray,
  ]
}>('revolute')

/** @description Joint set as `Rope` */
export const RopeJoint = createJoint<Omit<JointProps, 'params'> & {
  params: [
    length: number,
    anchor1: VectorArray,
    anchor2: VectorArray,
  ]
}>('rope')

/** @description Joint set as `Spherical` */
export const SphericalJoint = createJoint<Omit<JointProps, 'params'> & {
  params: [
    anchor1: VectorArray,
    anchor2: VectorArray,
  ]
}>('spherical')

/** @description Joint set as `Spring` */
export const SpringJoint = createJoint<Omit<JointProps, 'params'> & {
  params: [
    rest_length: number,
    stiffness: number,
    damping: number,
    anchor1: VectorArray,
    anchor2: VectorArray,
  ]
}>('spring')

export const BaseJoint = NativeBaseJoint
