// SPDX-License-Identifier: GPL-3.0-or-later
// common.glsl é automaticamente incluído pelo Burn-My-Windows

uniform float uProgress;
uniform float uRows;
uniform float uCols;
uniform sampler2D uEffectTexture;

void main() {
  float rows = max(uRows, 1.0);
  float cols = max(uCols, 1.0);

  float totalFrames = rows * cols;

  // Evita overflow no último frame
  float p = clamp(uProgress, 0.0, 0.9999);

  float frame = floor(p * totalFrames);

  float col = mod(frame, cols);
  float row = floor(frame / cols);

  vec2 uv = iTexCoord.st;
  uv.x = (uv.x + col) / cols;
  uv.y = (uv.y + row) / rows;

  vec4 color = texture(uEffectTexture, uv);

  // Fade-out obrigatório no final
  float fade = smoothstep(0.85, 1.0, uProgress);
  color.a *= (1.0 - fade);

  setOutputColor(color);
}

