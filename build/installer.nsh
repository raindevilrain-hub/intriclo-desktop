; Custom NSIS hook, auto-included by electron-builder when nsis.oneClick is
; false (see app-builder-lib NsisTarget: customInclude only wired up for the
; assisted/wizard installer). Runs inside the installSection, right after
; the app's own Start Menu / Desktop shortcuts are created.
;
; Adds shortcuts to Windows' built-in Quick Assist (no bundled binary, no
; new remote-access surface — just a launcher for a tool already on the
; machine) so IT can walk a user through "give remote support" without
; hunting for it in Start. Everything here is best-effort: if anything
; fails (missing exe, no admin rights, older/newer Windows layout, ...) we
; swallow the error and let the real app install continue untouched.

!macro customInstall
  ClearErrors

  ; Classic win32 path (Windows 10 and most Windows 11 builds still ship this
  ; even when Quick Assist itself has been migrated to a Store-updatable
  ; package — the System32 shim keeps working as the launch target).
  StrCpy $0 "$WINDIR\System32\quickassist.exe"
  ${if} ${FileExists} "$0"
    CreateShortCut "$SMPROGRAMS\빠른 지원 (Quick Assist).lnk" "$0" "" "$0" 0
    CreateShortCut "$DESKTOP\빠른 지원 (Quick Assist).lnk" "$0" "" "$0" 0
  ${else}
    ; Fallback for layouts without that exe: ms-quickassist: is the URI
    ; scheme Quick Assist registers as its shell handler, so a shortcut can
    ; target the URI directly with no app path to resolve.
    CreateShortCut "$SMPROGRAMS\빠른 지원 (Quick Assist).lnk" "ms-quickassist:" "" "" 0
    CreateShortCut "$DESKTOP\빠른 지원 (Quick Assist).lnk" "ms-quickassist:" "" "" 0
  ${endif}
  ClearErrors

  ; Older Windows 10 builds ship Quick Assist as an optional feature that can
  ; be turned off. Best-effort enable if it's off; never touch SetErrorLevel
  ; and never let a failure (no admin, feature not found, PS missing, ...)
  ; reach the installer — the try/catch below always exits 0.
  ; NB: $$ below is NSIS's escape for a literal "$" (this string is PowerShell
  ; source, not NSIS — a bare $f here would be parsed as an NSIS variable).
  nsExec::ExecToLog 'powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -Command "try { $$f = Get-WindowsOptionalFeature -Online -FeatureName QuickAssist -ErrorAction Stop; if ($$f.State -ne \"Enabled\") { Enable-WindowsOptionalFeature -Online -FeatureName QuickAssist -NoRestart -ErrorAction Stop } } catch { exit 0 }"'
  Pop $0
  ClearErrors
!macroend
