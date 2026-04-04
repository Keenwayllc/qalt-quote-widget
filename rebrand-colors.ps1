$srcDir = "c:\Users\Emmanuel and Claudia\ANTI\quote-widget-saas\src"

$files = Get-ChildItem -Path $srcDir -Recurse -Include "*.tsx","*.ts","*.css"

$replacements = @(
  # Selection highlights
  ("selection:bg-blue-100", "selection:bg-red-100"),
  ("selection:text-blue-900", "selection:text-red-900"),
  ("selection:bg-blue-50", "selection:bg-red-50"),

  # Shadow colors
  ("shadow-blue-900/30", "shadow-red-900/30"),
  ("shadow-blue-200", "shadow-red-200"),
  ("shadow-blue-100", "shadow-red-100"),
  ("shadow-blue-500", "shadow-red-500"),

  # Blue backgrounds
  ("bg-blue-950", "bg-slate-900"),
  ("bg-blue-900", "bg-red-900"),
  ("bg-blue-700", "bg-red-700"),
  ("bg-blue-600", "bg-red-600"),
  ("bg-blue-500", "bg-red-500"),
  ("bg-blue-400", "bg-red-400"),
  ("bg-blue-200", "bg-red-200"),
  ("bg-blue-100", "bg-red-100"),
  ("bg-blue-50",  "bg-red-50"),
  ("bg-blue-600/10", "bg-red-600/10"),
  ("bg-blue-600/15", "bg-red-600/15"),
  ("bg-blue-600/20", "bg-red-600/20"),
  ("bg-blue-500/10", "bg-red-500/10"),
  ("bg-blue-400/5",  "bg-red-400/5"),

  # Blue text
  ("text-blue-900", "text-red-900"),
  ("text-blue-700", "text-red-700"),
  ("text-blue-600", "text-red-600"),
  ("text-blue-500", "text-red-500"),
  ("text-blue-400", "text-red-400"),
  ("text-blue-200", "text-red-200"),
  ("text-blue-100", "text-red-100"),

  # Blue borders
  ("border-blue-700", "border-red-700"),
  ("border-blue-600", "border-red-600"),
  ("border-blue-500", "border-red-500"),
  ("border-blue-400", "border-red-400"),
  ("border-blue-200", "border-red-200"),
  ("border-blue-100", "border-red-100"),

  # Hover blue backgrounds
  ("hover:bg-blue-700", "hover:bg-red-700"),
  ("hover:bg-blue-600", "hover:bg-red-600"),
  ("hover:bg-blue-500", "hover:bg-red-500"),
  ("hover:bg-blue-100", "hover:bg-red-100"),
  ("hover:bg-blue-50",  "hover:bg-red-50"),

  # Hover blue text
  ("hover:text-blue-600", "hover:text-red-600"),
  ("hover:text-blue-700", "hover:text-red-700"),

  # Hover blue border
  ("hover:border-blue-600", "hover:border-red-600"),
  ("hover:border-blue-500", "hover:border-red-500"),

  # Focus / ring
  ("focus:ring-blue-600", "focus:ring-red-600"),
  ("focus:ring-blue-500", "focus:ring-red-500"),
  ("focus-visible:ring-blue-600", "focus-visible:ring-red-600"),
  ("focus-visible:ring-blue-500", "focus-visible:ring-red-500"),
  ("ring-blue-600", "ring-red-600"),
  ("ring-blue-500", "ring-red-500"),

  # Gradient from/via/to — blue
  ("from-blue-950", "from-slate-900"),
  ("from-blue-900", "from-red-900"),
  ("from-blue-700", "from-red-700"),
  ("from-blue-600", "from-red-600"),
  ("from-blue-50",  "from-red-50"),
  ("via-blue-950",  "via-slate-900"),
  ("via-blue-900",  "via-red-900"),
  ("via-blue-600",  "via-red-600"),
  ("to-blue-950",   "to-slate-900"),
  ("to-blue-900",   "to-red-900"),
  ("to-blue-600",   "to-red-600"),

  # Indigo
  ("bg-indigo-400/5",   "bg-red-400/5"),
  ("bg-indigo-400",     "bg-slate-500"),
  ("bg-indigo-600",     "bg-red-600"),
  ("text-indigo-600",   "text-red-600"),
  ("text-indigo-400",   "text-slate-400"),
  ("border-indigo-600", "border-red-600"),
  ("border-indigo-400", "border-slate-400"),
  ("from-indigo-600",   "from-red-600"),
  ("from-indigo-400",   "from-slate-400"),
  ("to-indigo-600",     "to-red-600"),
  ("to-indigo-400",     "to-slate-400"),
  ("via-indigo-600",    "via-red-600"),
  ("via-indigo-400",    "via-slate-400"),
  ("hover:bg-indigo-700", "hover:bg-red-700"),

  # Hex values for dark CTA sections (blue/purple base → red/charcoal)
  ("[#1a1636]", "[#1c0f0f]"),
  ("[#2d1b54]", "[#2d1215]"),
  ("[#131526]", "[#150f0f]"),

  # Violet
  ("bg-violet-500",   "bg-rose-600"),
  ("bg-violet-400",   "bg-rose-500"),
  ("text-violet-600", "text-rose-600"),
  ("text-violet-500", "text-rose-500"),
  ("from-violet-500", "from-rose-600"),
  ("to-violet-500",   "to-rose-600"),
  ("via-violet-500",  "via-rose-600"),
  ("hover:bg-violet-600", "hover:bg-rose-700"),

  # Purple
  ("bg-purple-600",   "bg-rose-700"),
  ("bg-purple-500",   "bg-rose-600"),
  ("text-purple-600", "text-rose-600"),
  ("text-purple-500", "text-rose-500"),
  ("from-purple-600", "from-rose-700"),
  ("from-purple-500", "from-rose-600"),
  ("to-purple-600",   "to-rose-700"),
  ("to-purple-500",   "to-rose-600"),
  ("via-purple-500",  "via-rose-600"),
  ("border-purple-500", "border-rose-600"),

  # Stroke/fill
  ("stroke-blue-", "stroke-red-"),
  ("fill-blue-",   "fill-red-")
)

$totalChanges = 0
foreach ($file in $files) {
  $content = [System.IO.File]::ReadAllText($file.FullName)
  $original = $content
  foreach ($pair in $replacements) {
    $content = $content.Replace($pair[0], $pair[1])
  }
  if ($content -ne $original) {
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    $totalChanges++
    Write-Output "Updated: $($file.Name)"
  }
}
Write-Output ""
Write-Output "Total files updated: $totalChanges"
