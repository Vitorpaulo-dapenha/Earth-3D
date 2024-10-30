/**
 * @file
 * A cena principal.
 */

/**
 * Define constantes.
 */
const TEXTURE_PATH = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/';

/**
 * Cria a função de requisição de animação.
 */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function () {
        return window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback, element) {
                // 60 FPS
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

/**
 * Define variáveis globais.
 */
var camera,
    scene,
    renderer,
    effect,
    controls,
    element,
    container,
    sphere,
    sphereCloud,
    rotationPoint;
var degreeOffset = 90;
var earthRadius = 80;

// Calcula a rotação inicial da Terra.
var getEarthRotation = function () {
    var d = new Date();
    var h = d.getUTCHours();
    var m = d.getUTCMinutes();
    var minutes = h * 60 + m;
    var degrees = minutes / 3.9907 + degreeOffset;
    return degrees;
}

var degrees = getEarthRotation();

// Atualiza a rotação da Terra a cada minuto.
setInterval(function () {
    var d = new Date();
    var h = d.getUTCHours();
    var m = d.getUTCMinutes();
    var minutes = h * 60 + m;
    degrees = minutes / 3.9907 + degreeOffset;
}, 60000);

init();
animate();

/**
 * Função de inicialização.
 */
function init() {
    // Cria o contêiner
    container = document.createElement('div');
    document.body.appendChild(container);

    // Cria a cena.
    scene = new THREE.Scene();

    // Ponto de rotação da Terra.
    baseRotationPoint = new THREE.Object3D();
    baseRotationPoint.position.set(0, 0, 0);
    scene.add(baseRotationPoint);

    // Ponto de rotação do mundo.
    worldRotationPoint = new THREE.Object3D();
    worldRotationPoint.position.set(0, 0, 0);
    scene.add(worldRotationPoint);

    rotationPoint = new THREE.Object3D();
    rotationPoint.position.set(0, 0, earthRadius * 4);
    baseRotationPoint.add(rotationPoint);

    // Configura a câmera.
    camera = new THREE.PerspectiveCamera(
        45, // Ângulo
        window.innerWidth / window.innerHeight, // Proporção.
        1, // Visão próxima.
        10000 // Visão distante.
    );
    rotationPoint.add(camera);

    // Configura o renderizador.
    renderer = new THREE.WebGLRenderer();
    element = renderer.domElement;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled;
    container.appendChild(element);

    // Configura os controles.
    controls = new THREE.OrbitControls(camera, element);
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.maxDistance = earthRadius * 8;
    controls.minDistance = earthRadius * 2;
    controls.target.copy(new THREE.Vector3(0, 0, -1 * earthRadius * 4));

    function setOrientationControls(e) {
        if (!e.alpha) {
            return;
        }

        controls = new THREE.DeviceOrientationControls(camera);
        controls.connect();

        window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
    window.addEventListener('deviceorientation', setOrientationControls, true);

    // Luz ambiente
    var ambient = new THREE.AmbientLight(0x222222);
    scene.add(ambient);

    // Configuração da "luz do sol".
    var light = new THREE.PointLight(0xffeecc, 1, 5000);
    light.position.set(-400, 0, 100);
    scene.add(light);

    // Adiciona outras luzes como "preenchimento".
    var light2 = new THREE.PointLight(0xffffff, 0.6, 4000);
    light2.position.set(-400, 0, 250);
    scene.add(light2);

    var light3 = new THREE.PointLight(0xffffff, 0.6, 4000);
    light3.position.set(-400, 0, -150);
    scene.add(light3);

    var light4 = new THREE.PointLight(0xffffff, 0.6, 4000);
    light4.position.set(-400, 150, 100);
    scene.add(light4);

    var light5 = new THREE.PointLight(0xffffff, 0.6, 4000);
    light5.position.set(-400, -150, 100);
    scene.add(light5);

    // Cria a esfera representando a Terra.
    var geometry = new THREE.SphereGeometry(earthRadius, 128, 128);

    // Configura os materiais da Terra.
    loader = new THREE.TextureLoader();
    loader.setCrossOrigin('https://s.codepen.io');
    var texture = loader.load(TEXTURE_PATH + 'ColorMap.jpg');

    var bump = loader.load(TEXTURE_PATH + 'Bump.jpg');
    var spec = loader.load(TEXTURE_PATH + 'SpecMask.jpg');

    var material = new THREE.MeshPhongMaterial({
        color: "#ffffff",
        shininess: 5,
        map: texture,
        specularMap: spec,
        specular: "#666666",
        bumpMap: bump,
    });

    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    sphere.rotation.y = Math.PI;
    sphere.rotation.y = -1 * (8.7 * Math.PI / 17);
    worldRotationPoint.add(sphere);

    // Adiciona nuvens sobre a Terra.
    var geometryCloud = new THREE.SphereGeometry(earthRadius + 0.2, 128, 128);
    var alpha = loader.load(TEXTURE_PATH + "alphaMap.jpg");

    var materialCloud = new THREE.MeshPhongMaterial({
        alphaMap: alpha,
        transparent: true,
    });

    sphereCloud = new THREE.Mesh(geometryCloud, materialCloud);
    scene.add(sphereCloud);

    // Efeito de brilho.
    var glowMap = loader.load(TEXTURE_PATH + "glow.png");
    var spriteMaterial = new THREE.SpriteMaterial({
        map: glowMap,
        color: 0x0099ff,
        transparent: false,
        blending: THREE.AdditiveBlending
    });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(earthRadius * 2.5, earthRadius * 2.5, 1.0);
    sphereCloud.add(sprite);

    // Adiciona o céu ao redor.
    addSkybox();

    window.addEventListener('resize', onWindowResize, false);
}

/**
 * Ajusta a cena ao redimensionar a janela.
 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Cria o Sol na cena.
 */
function createSun() {
    var sunGeometry = new THREE.SphereGeometry(100, 16, 16);
    var sunMaterial = new THREE.MeshLambertMaterial({
        color: '#ffff55',
        emissive: '#ffff55',
    });

    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.castShadow = false;
    sun.receiveShadow = false;
    sun.position.set(-9500, 0, 0);
    sun.rotation.y = Math.PI;

    scene.add(sun);
}

createSun();

/**
 * Atualizações da cena.
 */
function update() {
    camera.updateProjectionMatrix();
    worldRotationPoint.rotation.y = degrees * Math.PI / 180;
    sphereCloud.rotation.y += 0.00025;
    baseRotationPoint.rotation.y -= 0.00025;
}

/**
 * Renderiza a cena.
 */
function render() {
    renderer.render(scene, camera);
}

/**
 * Anima a cena.
 */
function animate() {
    requestAnimationFrame(animate);
    update();
    render();
}

function addSkybox() {
    var urlPrefix = TEXTURE_PATH;
    var urls = [
        urlPrefix + 'test.jpg',
        urlPrefix + 'test.jpg',
        urlPrefix + 'test.jpg',
        urlPrefix + 'test.jpg',
        urlPrefix + 'test.jpg',
        urlPrefix + 'test.jpg',
    ];

    var loader = new THREE.CubeTextureLoader();
    loader.setCrossOrigin('https://s.codepen.io');

    var textureCube = loader.load(urls);
    textureCube.format = THREE.RGBFormat;

    var shader = THREE.ShaderLib["cube"];
    shader.uniforms["tCube"].value = textureCube;

    var material = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });

    var geometry = new THREE.BoxGeometry(2000, 2000, 2000);
    var skybox = new THREE.Mesh(geometry, material);
    scene.add(skybox);
}
