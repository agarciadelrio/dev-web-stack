// global.d.ts

import 'alpinejs'

declare global {

    type Accessor<T> = () => T;
    type Setter<T> = (value: T) => void;

    interface BaseFields {
        id: string|number|null;
        name: string;
    }

    interface GrNodeInt {
        id: string
        x:number
        y:number
        selected:boolean

    }

    interface GrEdgeInt {
        id: string;
        n0: GrNode;
        n1: GrNode;
    }

    type PositionType = {
        x: number
        y: number
    }

    interface AppStore {
      localStorageNodesKey:string,
      nodes: NodeComponent[];
      getSavedNodes():NodeComponent[];
      saveNodes(this: AppStore): void;
    }

    interface GlobalStore {
      App: AppStore
    };

    type SelectionRect = {
      left: number;
      top: number;
      width: number;
      height: number;
    };

    interface SysUserInt {
        id: number;
        name: string;
        email: string;
        superuser: number;
    }

}


// Recomendado: personaliza si usas otros tipos (por ejemplo, tus stores, $data, etc.)

type AlpineWatchCallback<T = any> = (value: T, oldValue: T) => void;

interface AlpineMagicProperties {
  $el: HTMLElement;
  $root: HTMLElement;
  $refs: Record<string, HTMLElement>;
  $watch<T = any>(prop: string, callback: AlpineWatchCallback<T>): void;
  $dispatch: (event: string, detail?: any) => boolean;
  $nextTick: (callback: () => void) => void;
  $store: Record<string, any>; // Puede reemplazarse por una Store global tipada
  $data: Record<string, any>;
  $id: (name: string, key?: string | number) => string;
  $persist: <T>(value: T) => T;
  user: SysUserInt | null;
}

// Esta interfaz define qué puede tener un componente Alpine extendido por clases
export interface AlpineComponent<T = any> extends AlpineMagicProperties {
  init?: () => void;
  [key: string]: any; // permite añadir propiedades propias sin romper TS
}

// Para permitir el uso automático en todas las clases y ficheros sin importación explícita
declare global {
  // Para componentes creados como clases que se montan en Alpine
  type AlpineComponent<T = any> = import('./global').AlpineComponent<T>;

  // Puedes agregar helpers globales aquí si usas más extensiones (e.g., bind helpers)
}

export {};