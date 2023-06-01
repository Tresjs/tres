import { computed } from 'vue'
import { useRaycaster2 } from '../useRaycaster2'
import type { Object3D } from 'three'

type EventProps = {
  // TODO this should not be here but in the type that is used for mesh props
  // TODO deep
  onClick?: () => void
  onPointerEnter?: () => void
  onPointerMove?: () => void
  onPointerLeave?: () => void
}

export const usePointerEventHandler = () => {
  const objectsWithEventListeners = {
    click: new Map<Object3D, () => void>(),
  }

  const registerObject = (object: Object3D, { onClick }: EventProps) => {
    if (onClick) objectsWithEventListeners.click.set(object, onClick)
  }

  const objectsToWatch = computed(() => Array.from(objectsWithEventListeners.click.keys()))

  const { onClick } = useRaycaster2(objectsToWatch)

  onClick(({ intersects }) => {
    console.log(intersects)
  })

  return {
    registerObject,
  }
}
