$images = Get-ChildItem -Path "d:\WORK\JUJCO\assets\img" -Include *.jpg,*.jpeg,*.png -Recurse
Write-Host "Found $($images.Count) images to convert."

$successCount = 0
foreach ($img in $images) {
    $outPath = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")
    
    # Run ffmpeg
    $process = Start-Process -FilePath "ffmpeg.exe" -ArgumentList "-y -i "$($img.FullName)" -c:v libwebp -q:v 80 "$outPath"" -Wait -NoNewWindow -PassThru
    
    if ($process.ExitCode -eq 0) {
        Remove-Item -Path $img.FullName -Force
        $successCount++
    } else {
        Write-Host "Failed: $($img.Name)"
    }
}
Write-Host "Successfully converted $successCount images to WebP."

$codeFiles = Get-ChildItem -Path "d:\WORK\JUJCO" -Include *.html,*.css,*.js -Recurse | Where-Object { $_.FullName -notlike "*\OLD\*" }
$updatedCount = 0
foreach ($file in $codeFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    # Update image extensions
    $newContent = $content -replace '\.png\b', '.webp' -replace '\.jpg\b', '.webp' -replace '\.jpeg\b', '.webp'
    
    if ($content -cne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $updatedCount++
    }
}
Write-Host "Updated references in $updatedCount files."
