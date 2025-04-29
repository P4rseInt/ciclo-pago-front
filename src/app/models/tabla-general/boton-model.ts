type CssRule = string;

export interface Boton {
  titulo: string;
  icono: string;
  class: string;
  type: string;
  styles: CssRule[];
  action: () => void;
}
