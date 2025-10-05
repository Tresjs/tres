import { GrannyKnot } from 'three-stdlib'
import { reactive, shallowRef, onMounted } from 'vue'
import * as audio from './audio'
import type { ExplosionData } from './Explosions.vue'
import { Box3, Clock, Euler, Matrix4, Object3D, PerspectiveCamera, Ray, TubeGeometry, Vector2, Vector3 } from 'three'

let guid = 0
const spline = new GrannyKnot()
const track = new TubeGeometry(spline, 250, 0.2, 10, true)

export const gameStore = reactive({
    spline,
    points: 0,
    health: 100,
    lasers: [] as number[],
    explosions: [] as ExplosionData[],
    rocks: randomData(100, track, 150, 8, () => 1 + Math.random() * 2.5),
    enemies: randomData(10, track, 20, 15, 1),
    rings: randomRings(30, track),
    camera: new PerspectiveCamera(),
    sound: false,
    mutation: {
        t: 0,
        position: new Vector3(),
        startTime: Date.now(),

        track: track as TubeGeometry,
        scale: 15,
        fov: 70,
        hits: 0,

        particles: randomData(1500, track, 100, 1, () => 0.5 + Math.random() * 0.8),
        looptime: 40 * 1000,
        binormal: new Vector3(),
        normal: new Vector3(),
        clock: new Clock(false),
        mouse: new Vector2(-250, 50),

        // Re-usable objects
        dummy: new Object3D(),
        ray: new Ray(),
        box: new Box3(),

        cancelExplosionTO: setTimeout(() => { }, 1),
        cancelLaserTO: setTimeout(() => { }, 1)
    },

    actions: {
        playAudio: (_audio: HTMLAudioElement, _volume?: number, _loop?: boolean) => { },
        toggleSound: (_sound?: boolean) => { },
        shoot: () => { },
        test: (_data: { size: number; offset: Vector3; scale: number; hit: Vector3; distance: number }) => false,
        updateMouse: (_mouse: { clientX: number; clientY: number }) => { },
        init: (_camera: PerspectiveCamera) => { },
        update: () => { },
    },
})

gameStore.actions.playAudio = (audio: HTMLAudioElement, volume = 1, loop = false) => {
    if (gameStore.sound) {
        audio.currentTime = 0
        audio.volume = volume
        audio.loop = loop
        audio.play()
    }
    else {
        audio.pause()
    }
}

gameStore.actions.toggleSound = (sound?: boolean) => {
    if (sound !== false && sound !== true) sound = !gameStore.sound
    gameStore.sound = sound
    gameStore.actions.playAudio(audio.engine, 1, true)
    gameStore.actions.playAudio(audio.engine2, 0.3, true)
    gameStore.actions.playAudio(audio.bg, 1, true)
}

gameStore.actions.init = (camera: PerspectiveCamera) => {
    gameStore.mutation.clock.start()
    gameStore.camera = camera
    gameStore.camera.far = 10000
    gameStore.mutation.clock.start()
    gameStore.actions.toggleSound(gameStore.sound)
}

gameStore.actions.updateMouse = (mouse) => {
    gameStore.mutation.mouse.set(mouse.clientX - window.innerWidth / 2, mouse.clientY - window.innerHeight / 2)
}

gameStore.actions.shoot = () => {
    gameStore.lasers = [...gameStore.lasers, Date.now()]
    clearTimeout(gameStore.mutation.cancelLaserTO)
    gameStore.mutation.cancelLaserTO = setTimeout(() => gameStore.lasers = gameStore.lasers.filter(t => Date.now() - t <= 1000), 1000)
    gameStore.actions.playAudio(audio.zap, 0.5)
}

gameStore.actions.test = (data) => {
    gameStore.mutation.box.min.copy(data.offset)
    gameStore.mutation.box.max.copy(data.offset)
    gameStore.mutation.box.expandByScalar(data.size * data.scale)
    data.hit.set(10000, 10000, 10000)
    const result = gameStore.mutation.ray.intersectBox(gameStore.mutation.box, data.hit)
    data.distance = gameStore.mutation.ray.origin.distanceTo(data.hit)
    return result
}

gameStore.actions.updateMouse = ({ clientX, clientY }) => {
    gameStore.mutation.mouse.x = clientX - window.innerWidth / 2
    gameStore.mutation.mouse.y = clientY - window.innerHeight / 2
}

gameStore.actions.update = () => {
    const { rocks, enemies, mutation } = gameStore

    const time = Date.now()
    const t = (mutation.t = ((time - mutation.startTime) % mutation.looptime) / mutation.looptime)
    mutation.position = track.parameters.path.getPointAt(t)
    mutation.position.multiplyScalar(mutation.scale)

    // test for wormhole/warp
    let warping = false
    if (t > 0.3 && t < 0.4) {
        if (!warping) {
            warping = true
            gameStore.actions.playAudio(audio.warp)
        }
    }
    else if (t > 0.5) warping = false

    // test for hits
    const rocksHit = rocks.filter(gameStore.actions.test)
    const enemiesHit = enemies.filter(gameStore.actions.test)
    const allHit = rocksHit.concat(enemiesHit)
    const previous = mutation.hits
    mutation.hits = allHit.length
    if (previous === 0 && mutation.hits) gameStore.actions.playAudio(audio.click)
    const lasers = gameStore.lasers
    if (mutation.hits && lasers.length && time - lasers[lasers.length - 1] < 100) {
        gameStore.actions.playAudio(new Audio(audio.mp3.explosion), 0.5)
        const updates: ExplosionData[] = []
        allHit.forEach(data => updates.push({
            time: Date.now(),
            ...data,
            color: 'white',
            particles: Array.from({ length: 20 }).fill(0).map(_ => ({
                position: new Vector3(),
                dPos: new Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2).normalize().multiplyScalar(.40),
            })),
        }))
        allHit.forEach(data => updates.push({
            time: Date.now(),
            ...data,
            color: 'orange',
            particles: Array.from({ length: 20 }).fill(0).map(_ => ({
                position: new Vector3(),
                dPos: new Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2).normalize().multiplyScalar(.60),
            })),
        }))
        gameStore.explosions = [...gameStore.explosions, ...updates]

        clearTimeout(gameStore.mutation.cancelExplosionTO)
        gameStore.mutation.cancelExplosionTO = setTimeout(() => {
            gameStore.explosions = gameStore.explosions.filter(({ time }) => Date.now() - time <= 1000)
        }
            , 1000)
        gameStore.points = gameStore.points + rocksHit.length * 100 + enemiesHit.length * 200
        gameStore.rocks = gameStore.rocks.filter(rock => !rocksHit.find(r => r.guid === rock.guid))
        gameStore.enemies = gameStore.enemies.filter(enemy => !enemiesHit.find(e => e.guid === enemy.guid))
    }
}

export type GameStore = typeof gameStore

function randomData(count: number, track: TubeGeometry, radius: number, size: number, scale: number | (() => number)) {
    return new Array(count).fill({}).map(() => {
        const t = Math.random()
        const pos = track.parameters.path.getPointAt(t)
        pos.multiplyScalar(15)
        const offset = pos
            .clone()
            .add(new Vector3(-radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2))
        const speed = 0.1 + Math.random()
        return { guid: guid++, scale: typeof scale === 'function' ? scale() : scale, size, offset, pos, speed, radius, t, hit: new Vector3(), distance: 1000, rotation: new Euler(Math.random(), Math.random(), Math.random()) }
    })
}

function randomRings(count: number, track: TubeGeometry) {
    const temp = []
    let t = 0.4
    for (let i = 0; i < count; i++) {
        t += 0.003
        const pos = track.parameters.path.getPointAt(t)
        pos.multiplyScalar(15)
        const segments = track.tangents.length
        const pickt = t * segments
        const pick = Math.floor(pickt)
        const lookAt = track.parameters.path.getPointAt((t + 1 / track.parameters.path.getLength()) % 1).multiplyScalar(15)
        const matrix = new Matrix4().lookAt(pos, lookAt, track.binormals[pick])
        const rotation = new Euler().setFromVector3((new Vector3(0, 1, 0).applyMatrix4(matrix)))

        temp.push({ position: pos.toArray(), rotation, scale: 30 + i * 5 * Math.sin(i * 0.1) * Math.PI / 2 })
    }
    return temp
}

const camera = shallowRef(new PerspectiveCamera())
onMounted(() => {
    gameStore.actions.init(camera.value)
})