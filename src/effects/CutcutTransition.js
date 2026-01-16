import * as utils from '../utils.js';

// ShaderFactory só existe no processo do Shell
const ShaderFactory = await utils.importInShellOnly('./ShaderFactory.js');
const _ = await utils.importGettext();

export default class Effect {

  constructor() {
    this.shaderFactory = new ShaderFactory(
      Effect.getNick(),
      (shader) => {
        shader._uRows = shader.get_uniform_location('uRows');
        shader._uCols = shader.get_uniform_location('uCols');

        shader.connect('begin-animation', (shader, settings) => {
          shader.set_uniform_float(
            shader._uRows,
            1,
            [Math.max(1, settings.get_int('cutcut-transition-rows'))]
          );

          shader.set_uniform_float(
            shader._uCols,
            1,
            [Math.max(1, settings.get_int('cutcut-transition-cols'))]
          );
        });
      }
    );
  }

  // ID interno (nome dos arquivos, schema, shader)
  static getNick() {
    return 'cutcut-transition';
  }

  // Nome exibido na interface
  static getLabel() {
    return _('Cutcut Transition');
  }

  static getDescription() {
    return _('Plays a spritesheet animation over the window.');
  }

  // PNG usado pelo shader (fica em resources/textures)
  static getTexture() {
    return 'cutcut-transition.png';
  }

  static getMinShellVersion() {
    return 40;
  }

  static getMaxShellVersion() {
    return 47;
  }

  static getPreferencesPage() {
    return 'cutcut-transition';
  }

  static bindPreferences(dialog) {
    dialog.bindAdjustment('cutcut-transition-animation-time');
    dialog.bindAdjustment('cutcut-transition-rows');
    dialog.bindAdjustment('cutcut-transition-cols');
  }
}

