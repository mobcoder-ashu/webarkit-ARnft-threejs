import { Object3D,
         PlaneGeometry,
         TextureLoader,
         VideoTexture,
         Mesh,
         MeshStandardMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface ARvideo {
  play: () => void;
}

export default class NFTaddTJS {
    private root: Object3D;
    constructor(root: Object3D) {
        this.root = root;
    }
    public add(mesh: Object3D) {
        document.addEventListener('getNFTData', (ev: any) => {
            var msg = ev.detail
            mesh.position.y = (msg.height / msg.dpi * 2.54 * 10) / 2.0
            mesh.position.x = (msg.width / msg.dpi * 2.54 * 10) / 2.0
        })
        this.root.add(mesh);
    }
    public addModel (url: string, x: number, y: number, z: number, scale: number) {
        let model
        /* Load Model */
        const threeGLTFLoader = new GLTFLoader()
        threeGLTFLoader.load(url, gltf => {
            model = gltf.scene
            model.scale.set(scale, scale, scale)
            model.rotation.x = Math.PI / 2
            model.position.x = x
            model.position.y = y
            model.position.z = z
            this.root.add(model)
        })
    }
    public addImage (imageUrl: string, color: string, scale: number) {
       const planeGeom = new PlaneGeometry(1, 1, 1, 1)
       const texture = new TextureLoader().load(imageUrl)
       const material = new MeshStandardMaterial({ color: color, map: texture});
       const plane = new Mesh(planeGeom, material)
       plane.scale.set(scale, scale, scale)
       document.addEventListener('getNFTData', (ev: any) => {
            var msg = ev.detail
            plane.position.y = (msg.height / msg.dpi * 2.54 * 10) / 2.0
            plane.position.x = (msg.width / msg.dpi * 2.54 * 10) / 2.0
       })
       this.root.add(plane)
    }
    public addVideo (id: string, scaleX: number,scaleY: number,scaleZ: number) {
       const root = this.root
        console.log("dataInThis::::",scaleX,scaleY,scaleZ)

        const ARVideo: HTMLVideoElement = document.getElementById(id) as HTMLVideoElement;
       const texture = new VideoTexture(ARVideo as HTMLVideoElement)
       const mat = new MeshStandardMaterial({ color: 0xbbbbff, map: texture })
       const planeGeom = new PlaneGeometry(1, 1, 1, 1)
       const plane = new Mesh(planeGeom, mat)
        plane.scale.set(scaleX, scaleY, scaleZ)
        document.addEventListener('getNFTData', (ev: any) => {
            console.log("dataInThis",ev)
            ARVideo.play()
            var msg = ev.detail
            plane.position.y = (msg.height / msg.dpi * 2.54 * 10) / 2.0
            plane.position.x = (msg.width / msg.dpi * 2.54 * 10) / 2.0
        })
       this.root.add(plane)
    }
}
