<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2024-03-27 10:20:36
 * @LastEditors: 程
 * @LastEditTime: 2025-02-11 14:05:25
-->
<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入字体加载器
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// 导入几何缓冲
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// 创建场景
const scene = new THREE.Scene();
// 创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.set(0, 0, 800);
// 设置渲染器
const renderdr = new THREE.WebGLRenderer({ antialias: true });
renderdr.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderdr.domElement);
// 添加控制器
const controls = new OrbitControls(camera, renderdr.domElement);
controls.enableDamping = true;
// 监听屏幕大小的改变，修改渲染器的宽高和相机的比例
window.addEventListener('resize', () => {
  renderdr.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// 设置渲染函数
const render = () => {
  controls.update();
  requestAnimationFrame(render);
  renderdr.render(scene, camera);
};
render();

// 设环境纹理置
const img = new URL(`/tool/animate.png`, import.meta.url).href;
const texture = new THREE.TextureLoader().load(img);
texture.mapping = THREE.EquirectangularReflectionMapping; // 全景贴图反射
scene.background = texture;
scene.environment = texture;

// 设置背景的模糊度
scene.backgroundBlurriness = 0.2;

// 加载字体
const url = new URL(`/fonts/gentilis_bold.typeface.json`, import.meta.url).href;
const loader = new FontLoader();
loader.load(url, font => {
  // 创建几何体
  const geometry = new TextGeometry('Cheng Lei Blog', {
    font: font, // 字体
    size: 80, // 字体大小
    height: 10, // 字体厚度
    curveSegments: 12, // 曲线分段数
    bevelEnabled: true, // 是否启用斜角
    bevelThickness: 1, // 斜角厚度
    bevelSize: 1, // 斜角大小
    bevelSegments: 5, // 斜角分段数
  });
  geometry.center();
  // 设置几何体的材质
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    roughness: 0,
    reflectivity: 1,
    thickness: 0,
    ior: 1.5,
    side: THREE.DoubleSide,
  });
  // 创建字体
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});
</script>
<template>
  <div id="scene"></div>
</template>
<style lang="less" scoped></style>
