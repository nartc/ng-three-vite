import { NgtPhysicBody, NgtPhysics } from "@angular-three/cannon";
import { NgtCanvas, NgtTriple } from "@angular-three/core";
import { NgtColorAttribute, NgtVector2Attribute } from "@angular-three/core/attributes";
import { NgtBoxGeometry, NgtPlaneGeometry } from "@angular-three/core/geometries";
import { NgtAmbientLight, NgtDirectionalLight } from "@angular-three/core/lights";
import { NgtMeshLambertMaterial, NgtShadowMaterial } from "@angular-three/core/materials";
import { NgtMesh } from "@angular-three/core/meshes";
import { NgtStats } from "@angular-three/core/stats";
import { NgtSobaOrbitControls } from "@angular-three/soba/controls";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Mesh } from "three";

@Component({
  selector: 'app-box',
  standalone: true,
  template: `
    <ngt-mesh receiveShadow castShadow [ref]="boxRef.ref" [position]="position" [rotation]="rotation">
      <ngt-box-geometry></ngt-box-geometry>
      <ngt-mesh-lambert-material color="tomato"></ngt-mesh-lambert-material>
    </ngt-mesh>
  `,
  imports: [
    NgtMesh,
    NgtBoxGeometry,
    NgtMeshLambertMaterial
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgtPhysicBody],
})
export class Box {
  @Input() position?: NgtTriple;
  readonly rotation: NgtTriple = [0.4, 0.2, 0.5];

  boxRef = this.physicBody.useBox(() => ({
    mass: 1,
    position: this.position,
    rotation: this.rotation,
  }));

  constructor(private physicBody: NgtPhysicBody) {}
}

@Component({
  selector: 'app-floor',
  standalone: true,
  template: `
    <ngt-mesh receiveShadow [ref]="planeRef.ref" [position]="position" [rotation]="rotation">
      <ngt-plane-geometry [args]="[1000, 1000]"></ngt-plane-geometry>
      <ngt-shadow-material color="#171717" transparent opacity="0.4"></ngt-shadow-material>
    </ngt-mesh>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgtPhysicBody],
  imports: [
    NgtMesh,
    NgtPlaneGeometry,
    NgtShadowMaterial
  ]
})
export class Floor {
  readonly position: NgtTriple = [0, -2.5, 0];
  readonly rotation: NgtTriple = [-Math.PI / 2, 0, 0];

  planeRef = this.physicBody.usePlane(() => ({
    args: [1000, 1000],
    rotation: this.rotation,
    position: this.position,
  }));

  constructor(private physicBody: NgtPhysicBody) {}
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <ngt-canvas shadows [dpr]="[1, 2]" [gl]="{ alpha: false }" [camera]="{ position: [-1, 5, 5], fov: 75 }">
      <ngt-color attach="background" color="lightblue"></ngt-color>

      <ngt-ambient-light></ngt-ambient-light>
      <ngt-directional-light [position]="10" castShadow>
        <ngt-vector2 [attach]="['shadow', 'mapSize']" [vector2]="2048"></ngt-vector2>
      </ngt-directional-light>


      <ngt-physics>
        <app-floor></app-floor>
        <app-box [position]="[0.1, 5, 0]"></app-box>
        <app-box [position]="[0.15, 10, 0]"></app-box>
        <app-box [position]="[0, 12, 0]"></app-box>
      </ngt-physics>

      <ngt-soba-orbit-controls></ngt-soba-orbit-controls>
    </ngt-canvas>

    <ngt-stats></ngt-stats>
  `,
  imports: [
    NgtCanvas,
    NgtColorAttribute,
    NgtAmbientLight,
    NgtDirectionalLight,
    NgtVector2Attribute,
    NgtStats,
    NgtPhysics,
    Floor,
    Box,
    NgtSobaOrbitControls,

  ]
})
export class AppComponent {
  count = 0;

  increment() {
    this.count++;
  }

  onBeforeRender(object: Mesh) {
    object.rotation.x += 0.01;
    object.rotation.y += 0.01;
  }
}
