# videos/ — Catálogo y conversión de media

Carpeta de trabajo para **clasificar, comprimir y registrar** videos del portafolio antes de subirlos a Cloudinary.

## Origen de los archivos (rutas fuente)

Los masters locales viven en `ugc_mady/` (no se commitea). Estructura relevante:

| Ruta en repo | Contenido | `group` en manifiesto |
|--------------|-----------|------------------------|
| `ugc_mady/corte fino/contenido de tik tok/` | Reels exportados de TikTok (Cortefino) | `cortefino-tiktok` |
| `ugc_mady/corte fino/animaciones/` | Motion / animaciones de marca | `cortefino-animaciones` |
| `ugc_mady/producciones/` | Piezas de producción universitarias / clientes | `mady-producciones` → salida en `videos/producciones/*_720p.mp4` (720p HD 16:9) |
| `ugc_mady/fotografias/` | Fotografías personales (Producciones §07) | `public/ugc/fotografias/*.webp` — ver [doc/README.md § Fotografías](../doc/README.md#fotografías--compresión-ugc_mady--public) |
| `produccion/` | Masters listos para post (ej. Pony Nebula, DESCONGELAR) | `produccion` |

### Archivos en `contenido de tik tok/` (Cortefino)

- `_CORREGIDO _MITOS YVERDADES SOBRE EL VACIO.mp4`
- `ASMR PREPARACION.mp4`
- `recomendaciones_cortes.mp4`
- `tomahawkXribeye(2).mp4`
- `Vino_cortes.mp4`

Los 4 reels ya publicados en el carousel (`ugcVideos`) están solo en **Cloudinary** (`group: cortefino-tiktok-live`, `sourcePath` vacío). Los 5 de la carpeta anterior son candidatos nuevos (`cortefino-tiktok`).

## Archivos de esta carpeta

| Archivo | Rol |
|---------|-----|
| `videos.manifest.json` | Fuente de verdad (metadata + rutas + Cloudinary) |
| `videos.ts` | Catálogo TypeScript (`videoCatalog`, `tiktokVideos`, …) |
| `conversor_videos.py` | CLI FFmpeg + sync |
| `out/` | Salidas TikTok verticales (espejo de `ugc_mady/...`) |
| `producciones/` | Salidas 720p HD desde `ugc_mady/producciones/` |
| preset `720hd-cloud` | 720p + CRF 30 + tope 800k — piezas largas para Cloudinary |

## CLI

Desde la **raíz del repo** (requiere FFmpeg en PATH):

```bash
python videos/conversor_videos.py list
python videos/conversor_videos.py group cortefino-tiktok --720
python videos/conversor_videos.py cortefino-asmr --720
python videos/conversor_videos.py cortefino-asmr --info
python videos/conversor_videos.py cortefino-asmr --ruta --720

# Tras subir *_720p.mp4 a Cloudinary:
python videos/conversor_videos.py cloudinary cortefino-asmr "https://res.cloudinary.com/.../v123/id.mp4"
python videos/conversor_videos.py sync
```

`sync` regenera el bloque `videoCatalog` en `videos/videos.ts`. El sitio importa desde `lib/videos.ts` (re-export).

## Clasificaciones (`kind`)

| `kind` | Uso en sitio |
|--------|----------------|
| `tiktok` | Carousel UGC / mockup For You (`ugcVideos` si hay `publicId`) |
| `reel` | Reels editoriales (futuro) |
| `production` | Producción/post (`productionVideos`) |
| `animation` | Motion de marca |

Campos vacíos en el manifiesto (`tiktokUrl`, `publicId`, contadores, `videoAlt`) están a propósito para completar a mano.

## Salida comprimida

Ejemplo:

```
videos/out/ugc_mady/corte fino/contenido de tik tok/ASMR PREPARACION_720p.mp4
```

Sube el `*_720p.mp4` a Cloudinary y registra la URL con `cloudinary <key> "<url>"`.
