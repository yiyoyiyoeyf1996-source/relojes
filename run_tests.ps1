# ==============================================================================
# RelojNori — Suite de Pruebas Automatizadas de Integridad y Estructura (PowerShell)
# ==============================================================================
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "  RELOJNORI HORLOGERIE -- SUITE DE PRUEBAS AUTOMATIZADAS          " -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

$targetFile = "nordi_tienda_relojes_frontend.html"
$passed = 0
$failed = 0

function Assert-Test {
    param (
        [Parameter(Mandatory=$true)]
        [string]$TestName,
        [Parameter(Mandatory=$true)]
        [bool]$Condition,
        [Parameter(Mandatory=$false)]
        [string]$ErrorMessage = ""
    )
    if ($Condition) {
        Write-Host "  [PASS] $TestName" -ForegroundColor Green
        $script:passed++
    } else {
        Write-Host "  [FAIL] $TestName" -ForegroundColor Red
        if ($ErrorMessage) {
            Write-Host "         Detalle: $ErrorMessage" -ForegroundColor Yellow
        }
        $script:failed++
    }
}

if (-not (Test-Path $targetFile)) {
    Write-Host "Error: No se encontro el archivo $targetFile" -ForegroundColor Red
    exit 1
}

$content = [System.IO.File]::ReadAllText((Resolve-Path $targetFile), [System.Text.Encoding]::UTF8)

# ------------------------------------------------------------------------------
# 1. PRUEBAS DE ESTRUCTURA Y ETIQUETAS HTML
# ------------------------------------------------------------------------------
Write-Host "`n1. Verificacion de Estructura HTML y Cierre de Etiquetas:" -ForegroundColor White

Assert-Test -TestName 'Declaracion de DOCTYPE HTML5' -Condition ($content -match '<!DOCTYPE html>')
Assert-Test -TestName 'Atributo de idioma es-CO' -Condition ($content -match '<html\s+lang="es-CO"')
Assert-Test -TestName 'Cierre de etiqueta head' -Condition ($content -match '</head>')
Assert-Test -TestName 'Apertura de etiqueta body' -Condition ($content -match '<body>')
Assert-Test -TestName 'Cierre de etiqueta body' -Condition ($content -match '</body>')
Assert-Test -TestName 'Cierre de etiqueta html' -Condition ($content -match '</html>')
Assert-Test -TestName 'Presencia y cierre de main' -Condition ($content -match '<main>' -and $content -match '</main>')
Assert-Test -TestName 'Presencia y cierre de footer' -Condition ($content -match '<footer' -and $content -match '</footer>')

# ------------------------------------------------------------------------------
# 2. PRUEBAS DE SEGURIDAD (CSP, CABECERAS Y DIRECTIVAS)
# ------------------------------------------------------------------------------
Write-Host "`n2. Verificacion de Directivas de Seguridad Multinivel:" -ForegroundColor White

Assert-Test -TestName 'Content-Security-Policy (CSP) presente' -Condition ($content -match 'http-equiv="Content-Security-Policy"')
Assert-Test -TestName 'X-Content-Type-Options (nosniff)' -Condition ($content -match 'http-equiv="X-Content-Type-Options"\s+content="nosniff"')
Assert-Test -TestName 'X-Frame-Options (DENY) anti-clickjacking' -Condition ($content -match 'http-equiv="X-Frame-Options"\s+content="DENY"')
Assert-Test -TestName 'Referrer-Policy (strict-origin-when-cross-origin)' -Condition ($content -match 'name="referrer"\s+content="strict-origin-when-cross-origin"')
Assert-Test -TestName 'Permissions-Policy configurada' -Condition ($content -match 'http-equiv="Permissions-Policy"')
Assert-Test -TestName 'Modulo JavaScript Security implementado' -Condition ($content -match 'const Security\s*=\s*\{')
Assert-Test -TestName 'Mecanismo Frame-Busting implementado' -Condition ($content -match 'window\.top\s*!==\s*window\.self')
Assert-Test -TestName 'Campo Honeypot anti-spam en newsletter' -Condition ($content -match 'id="newsletterHp"')

# ------------------------------------------------------------------------------
# 3. PRUEBAS DE OPEN GRAPH Y METADATOS
# ------------------------------------------------------------------------------
Write-Host "`n3. Verificacion de Etiquetas Open Graph y Twitter Cards:" -ForegroundColor White

Assert-Test -TestName 'og:title configurado' -Condition ($content -match 'property="og:title"')
Assert-Test -TestName 'og:description configurado' -Condition ($content -match 'property="og:description"')
Assert-Test -TestName 'og:image y og:image:secure_url configurados' -Condition ($content -match 'property="og:image"' -and $content -match 'property="og:image:secure_url"')
Assert-Test -TestName 'og:type website configurado' -Condition ($content -match 'property="og:type"\s+content="website"')
Assert-Test -TestName 'og:locale es_CO configurado' -Condition ($content -match 'property="og:locale"\s+content="es_CO"')
Assert-Test -TestName 'product:price:currency COP configurado' -Condition ($content -match 'property="product:price:currency"\s+content="COP"')
Assert-Test -TestName 'Twitter Cards summary_large_image' -Condition ($content -match 'name="twitter:card"\s+content="summary_large_image"')
Assert-Test -TestName 'Modulo OpenGraphManager implementado' -Condition ($content -match 'const OpenGraphManager\s*=\s*\{')

# ------------------------------------------------------------------------------
# 4. PRUEBAS DE DATOS ESTRUCTURADOS JSON-LD (SCHEMA.ORG)
# ------------------------------------------------------------------------------
Write-Host "`n4. Validacion Sintactica de Esquemas JSON-LD (Schema.org):" -ForegroundColor White

$jsonLdRegex = '(?s)<script type="application/ld\+json">(.*?)</script>'
$matches = [regex]::Matches($content, $jsonLdRegex)

Assert-Test -TestName 'Presencia de bloques JSON-LD (minimo 5)' -Condition ($matches.Count -ge 5) -ErrorMessage "Se encontraron $($matches.Count) bloques"

$blockIndex = 1
foreach ($m in $matches) {
    $rawJson = $m.Groups[1].Value.Trim()
    try {
        $parsed = ConvertFrom-Json $rawJson
        $typeVal = $parsed."@type"
        if ($typeVal -is [array]) { $typeVal = $typeVal -join "/" }
        $desc = "Bloque $blockIndex JSON-LD valido (tipo: $typeVal)"
        Assert-Test -TestName $desc -Condition ($null -ne $parsed)
    } catch {
        $desc = "Bloque $blockIndex JSON-LD valido"
        Assert-Test -TestName $desc -Condition $false -ErrorMessage $_.Exception.Message
    }
    $blockIndex++
}

# ------------------------------------------------------------------------------
# 5. PRUEBAS DE LA ESPECIFICACION TECNICA Y FUNCIONES REQUERIDAS
# ------------------------------------------------------------------------------
Write-Host "`n5. Verificacion de Funciones de la Especificacion Tecnica:" -ForegroundColor White

$requiredFunctions = @(
    "renderProducts",
    "addToCart",
    "renderCart",
    "saveCart",
    "openCart",
    "closeCart",
    "showToast",
    "showModal",
    "addProduct",
    "updateBoutiqueStatus",
    "runTests"
)

foreach ($fn in $requiredFunctions) {
    $found = ($content -match "function\s+$fn\s*\(") -or ($content -match "$fn\s*:\s*$fn")
    Assert-Test -TestName "Funcion requerida disponible: $fn()" -Condition $found
}

# ------------------------------------------------------------------------------
# 6. ENLACES EXTERNOS SEGUROS (NOOPENER NOREFERRER)
# ------------------------------------------------------------------------------
Write-Host "`n6. Verificacion de Seguridad en Enlaces Externos:" -ForegroundColor White

$linkRegex = '<a\s+[^>]*href="https?://[^>]*>'
$links = [regex]::Matches($content, $linkRegex)
$insecureLinks = @()

foreach ($l in $links) {
    $tag = $l.Value
    if ($tag -match 'target="_blank"' -and $tag -notmatch 'rel="[^"]*noopener[^"]*"') {
        $insecureLinks += $tag
    }
}

Assert-Test -TestName 'Todos los enlaces target=_blank contienen rel=noopener' -Condition ($insecureLinks.Count -eq 0) -ErrorMessage "Enlaces inseguros: $($insecureLinks.Count)"

# ------------------------------------------------------------------------------
# 7. VERIFICACIÓN DE SUITE DE PRUEBAS WEB (TEST_SUITE.HTML)
# ------------------------------------------------------------------------------
Write-Host "`n7. Verificacion de Suite de Pruebas Web (test_suite.html):" -ForegroundColor White

$suiteFile = "test_suite.html"
$suiteExists = Test-Path $suiteFile
Assert-Test -TestName 'Archivo test_suite.html generado y accesible' -Condition $suiteExists

if ($suiteExists) {
    $suiteContent = [System.IO.File]::ReadAllText((Resolve-Path $suiteFile), [System.Text.Encoding]::UTF8)
    Assert-Test -TestName 'test_suite.html contiene TestRunner' -Condition ($suiteContent -match 'const TestRunner\s*=\s*\{')
    Assert-Test -TestName 'test_suite.html contiene aserciones expect()' -Condition ($suiteContent -match 'const expect\s*=')
    Assert-Test -TestName 'test_suite.html contiene Suite Catalogo' -Condition ($suiteContent -match 'Cat.logo y Modelo de Datos')
    Assert-Test -TestName 'test_suite.html contiene Suite Carrito' -Condition ($suiteContent -match 'Motor de Carrito')
    Assert-Test -TestName 'test_suite.html contiene Suite Favoritos' -Condition ($suiteContent -match 'Favoritos y Lista de Deseos')
    Assert-Test -TestName 'test_suite.html contiene Suite Seguridad' -Condition ($suiteContent -match 'Seguridad Multinivel y Anti-XSS')
    Assert-Test -TestName 'test_suite.html contiene Suite Open Graph' -Condition ($suiteContent -match 'Open Graph Din.mico')
    Assert-Test -TestName 'test_suite.html contiene Suite SEO-GEO' -Condition ($suiteContent -match 'Arquitectura SEO-GEO')
}

# ------------------------------------------------------------------------------
# RESUMEN DE RESULTADOS
# ------------------------------------------------------------------------------
Write-Host "`n=================================================================" -ForegroundColor Cyan
$color = if ($failed -eq 0) { "Green" } else { "Red" }
Write-Host "  RESUMEN DE PRUEBAS: Total: $($passed + $failed) | Pasadas: $passed | Fallidas: $failed" -ForegroundColor $color
Write-Host "=================================================================" -ForegroundColor Cyan

if ($failed -gt 0) {
    exit 1
} else {
    exit 0
}
