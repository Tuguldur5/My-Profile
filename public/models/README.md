# 3D character

The hero character is controlled by one setting in `lib/scene-config.ts`:

```ts
export const CHARACTER_URL = "/models/character.glb"
```

Point it at either export:

| Kind     | Value                              |
| -------- | ---------------------------------- |
| Realistic | `/models/character.glb`            |
| Cartoon   | `/models/character-cartoon.glb`    |

If the file is missing or fails to load, the page keeps working: the hero stays
centered on the flashlight-person background and the 3D panel is not shown.

## Requirements

- Keep it under **5 MB**.
- A rig with at least one idle/breathing clip is recommended.
- Clip names are detected with these patterns:
  - idle: `idle`, `breath`, `stand`, `pose`, `loop` (falls back to the first clip)
  - wave: `wave`, `hello`, `greet`, `hi`, `hand`
- All clip names are logged to the console as `[character] animation clips: ...`.
- If your model faces away from the camera, set `MODEL_YAW = Math.PI` in
  `components/three/character.tsx`.

## Draco

Compressed models are decoded with the local decoder in `public/draco/gltf/`,
so no CDN request is made and no CSP exception is needed.
