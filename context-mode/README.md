# Context Mode — Memoria de sesión del proyecto

Carpeta de **contexto persistente** para no perder hilos de decisión entre chats de Cursor / agentes.  
Complementa (no reemplaza) `design-system/MASTER.md`, `CLAUDE.md` y `doc/`.

---

## Cómo usar

1. Antes de retomar una feature, lee el archivo del tema en esta carpeta.
2. Tras decisiones importantes del cliente, actualiza el `.md` correspondiente.
3. Los prompts listos para copiar viven en `doc/ejemplos.md`; aquí va el **porqué**, el **estado** y los **pendientes**.

---

## Índice de contextos

| Archivo | Tema | Estado |
|---------|------|--------|
| [ugc-tiktok-3d-carousel.md](./ugc-tiktok-3d-carousel.md) | Carrusel UGC · mockup TikTok · 3D prev\|active\|next | ✅ Implementado (2026-05-15) |

---

## Relación con otras carpetas

```
context-mode/     ← decisiones + estado de implementación (este hilo)
doc/              ← prompts copiables, flujo skills, referencia Tailwind
design-system/    ← reglas visuales canónicas (MASTER.md)
CLAUDE.md         ← contrato técnico del repo
```

---

*Última actualización: 2026-05-15*
