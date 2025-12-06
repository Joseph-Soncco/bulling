# GUÍA: CONFIGURAR DOMINIO PERSONALIZADO EN GITHUB PAGES
## Dominio: stopciberbullying.site

---

## 🔍 DIAGNÓSTICO DEL PROBLEMA

Según las imágenes que compartiste, veo que:
- ✅ Tienes el dominio configurado en GitHub Pages
- ✅ Tienes registros A en Namecheap apuntando a GitHub
- ✅ Tienes CNAME para www
- ⚠️ GitHub muestra "DNS Check in Progress"
- ⚠️ HTTPS no está disponible aún

---

## ✅ CONFIGURACIÓN CORRECTA EN NAMECHEAP

### 1. REGISTROS A (Ya los tienes correctos)
En Namecheap → Advanced DNS, debes tener estos 4 registros A:

```
Tipo: A Record
Host: @
Valor: 185.199.108.153
TTL: Automatic

Tipo: A Record
Host: @
Valor: 185.199.109.153
TTL: Automatic

Tipo: A Record
Host: @
Valor: 185.199.110.153
TTL: Automatic

Tipo: A Record
Host: @
Valor: 185.199.111.153
TTL: Automatic
```

✅ **Estos ya están correctos según tu configuración**

---

### 2. REGISTRO CNAME PARA WWW (Ya lo tienes)
```
Tipo: CNAME Record
Host: www
Valor: joseph-soncco.github.io.
TTL: Automatic
```

✅ **Este también está correcto**

---

### 3. ⚠️ REGISTRO CNAME PARA DOMINIO RAÍZ (Puede faltar)

**IMPORTANTE:** Para GitHub Pages, también necesitas un CNAME en el archivo del repositorio.

**NO agregues un CNAME en Namecheap para @ (dominio raíz).** Solo usa los registros A.

---

## 📝 CONFIGURACIÓN EN GITHUB

### 1. Verificar en GitHub Pages Settings

1. Ve a tu repositorio: `Joseph-Soncco/bulling`
2. Settings → Pages
3. En "Custom domain" debe estar: `stopciberbullying.site`
4. Haz clic en "Save"

### 2. Crear archivo CNAME en el repositorio

**IMPORTANTE:** GitHub necesita un archivo `CNAME` en la raíz de tu repositorio.

#### Opción A: Crear manualmente
1. En tu repositorio, haz clic en "Add file" → "Create new file"
2. Nombre del archivo: `CNAME` (sin extensión, todo en mayúsculas)
3. Contenido del archivo:
```
stopciberbullying.site
```
4. Commit: "Add CNAME file for custom domain"
5. Haz clic en "Commit new file"

#### Opción B: Crear desde tu computadora
Crea un archivo llamado `CNAME` (sin extensión) en la raíz de tu proyecto con este contenido:
```
stopciberbullying.site
```

Luego haz commit y push:
```bash
git add CNAME
git commit -m "Add CNAME file for custom domain"
git push
```

---

## ⏰ TIEMPO DE PROPAGACIÓN DNS

### ¿Cuánto tarda?
- **Mínimo:** 10-30 minutos
- **Promedio:** 2-4 horas
- **Máximo:** 24-48 horas

### ¿Por qué dice "DNS Check in Progress"?
GitHub está verificando que los registros DNS estén correctos. Esto puede tardar porque:
1. Los cambios DNS necesitan propagarse por internet
2. GitHub verifica periódicamente (cada cierto tiempo)
3. Diferentes servidores DNS pueden tener información diferente

---

## 🔧 PASOS PARA SOLUCIONAR

### Paso 1: Verificar archivo CNAME en GitHub
1. Ve a tu repositorio en GitHub
2. Verifica que existe un archivo `CNAME` en la raíz
3. El contenido debe ser solo: `stopciberbullying.site` (sin www, sin http://, sin https://)

### Paso 2: Verificar DNS en Namecheap
1. Ve a Namecheap → Domain List → stopciberbullying.site → Advanced DNS
2. Verifica que tienes los 4 registros A (ya los tienes)
3. Verifica que tienes el CNAME para www (ya lo tienes)
4. **NO agregues CNAME para @ (dominio raíz)**

### Paso 3: Esperar propagación
1. Puedes verificar el estado en: https://www.whatsmydns.net/#A/stopciberbullying.site
2. Debe mostrar las 4 IPs de GitHub en diferentes servidores DNS
3. Si no aparecen todas, espera más tiempo

### Paso 4: Verificar en GitHub
1. Ve a Settings → Pages
2. Espera a que el estado cambie de "DNS Check in Progress" a "Your site is live"
3. Una vez que esté verificado, aparecerá la opción para habilitar HTTPS

---

## 🚨 PROBLEMAS COMUNES Y SOLUCIONES

### Problema 1: "DNS Check in Progress" no cambia
**Solución:**
- Espera 24-48 horas
- Verifica que el archivo CNAME existe en tu repositorio
- Verifica que los registros A están correctos en Namecheap
- Intenta hacer un cambio pequeño en GitHub Pages settings (quitar y volver a agregar el dominio)

### Problema 2: HTTPS no está disponible
**Solución:**
- HTTPS solo se habilita DESPUÉS de que DNS esté completamente verificado
- Una vez que DNS esté verificado, GitHub automáticamente solicitará un certificado SSL
- Esto puede tardar adicionales 24 horas después de la verificación DNS

### Problema 3: El sitio no carga
**Solución:**
- Verifica que tu repositorio está configurado para GitHub Pages (Settings → Pages → Source: main branch)
- Verifica que tienes un archivo index.html en la raíz
- Espera a que DNS se propague completamente
- Limpia la caché de tu navegador

### Problema 4: www funciona pero el dominio raíz no
**Solución:**
- Verifica que los 4 registros A están configurados para @ (dominio raíz)
- NO uses CNAME para @, solo registros A
- Espera la propagación DNS

---

## ✅ CHECKLIST DE VERIFICACIÓN

- [ ] Archivo CNAME existe en la raíz del repositorio
- [ ] Contenido del CNAME es solo: `stopciberbullying.site`
- [ ] 4 registros A configurados en Namecheap para @
- [ ] CNAME para www configurado en Namecheap
- [ ] Dominio configurado en GitHub Pages Settings
- [ ] Repositorio configurado para publicar desde main branch
- [ ] Esperado al menos 2-4 horas para propagación DNS
- [ ] Verificado DNS en whatsmydns.net

---

## 🔍 CÓMO VERIFICAR QUE ESTÁ FUNCIONANDO

### 1. Verificar DNS
Visita: https://www.whatsmydns.net/#A/stopciberbullying.site

Debe mostrar las 4 IPs de GitHub en la mayoría de servidores:
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

### 2. Verificar en GitHub
En Settings → Pages debe mostrar:
- ✅ "Your site is live at http://stopciberbullying.site/"
- ✅ Sin mensaje de "DNS Check in Progress"
- ✅ Opción para habilitar HTTPS disponible

### 3. Probar el sitio
- Visita: http://stopciberbullying.site
- Debe cargar tu landing page
- Si carga, ¡está funcionando!

---

## 📋 CONFIGURACIÓN FINAL CORRECTA

### En Namecheap (Advanced DNS):
```
A Record    @    185.199.108.153    Automatic
A Record    @    185.199.109.153    Automatic
A Record    @    185.199.110.153    Automatic
A Record    @    185.199.111.153    Automatic
CNAME       www  joseph-soncco.github.io.  Automatic
```

### En GitHub:
1. Archivo `CNAME` en la raíz con contenido: `stopciberbullying.site`
2. Settings → Pages → Custom domain: `stopciberbullying.site`

---

## 💡 TIPS ADICIONALES

1. **No uses CNAME para @ (dominio raíz)** en Namecheap, solo registros A
2. **El archivo CNAME es obligatorio** en GitHub para dominios personalizados
3. **La propagación DNS puede tardar**, sé paciente
4. **HTTPS se habilita automáticamente** después de que DNS esté verificado
5. **No cambies los registros DNS** mientras GitHub está verificando

---

## 🆘 SI SIGUE SIN FUNCIONAR DESPUÉS DE 48 HORAS

1. **Verifica el archivo CNAME:**
   - Debe estar en la raíz del repositorio
   - Debe contener solo: `stopciberbullying.site`
   - Sin espacios, sin www, sin http://

2. **Verifica los registros A:**
   - Deben ser exactamente esas 4 IPs
   - Host debe ser @ (no www, no nada más)

3. **Intenta reiniciar la verificación:**
   - En GitHub Pages, quita el dominio
   - Espera 5 minutos
   - Vuelve a agregarlo

4. **Contacta soporte:**
   - GitHub Support si el problema es de GitHub
   - Namecheap Support si el problema es de DNS

---

**¡Con esta configuración debería funcionar! 🚀**

*Nota: La verificación DNS puede tardar, pero con los registros correctos y el archivo CNAME, debería funcionar en 2-24 horas.*

