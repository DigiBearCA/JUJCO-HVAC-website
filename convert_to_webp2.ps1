$images = Get-ChildItem -Path "d:\WORK\JUJCO\assets\img" -Include *.jpg,*.jpeg,*.png -Recurse
Write-Host "Found $($images.Count) images to convert."

$successCount = 0
foreach ($img in $images) {
    $outPath = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")
    
    # Run ffmpeg directly to avoid argument parsing issues
    & ffmpeg.exe -y -i "$($img.FullName)" -c:v libwebp -q:v 80 "$outPath" 2> $null
    
    if ($LASTEXITCODE -eq 0) {
        Remove-Item -Path $img.FullName -Force
        $successCount++
    } else {
        Write-Host "Failed: $($img.Name)"
    }
}
Write-Host "Successfully converted $successCount images to WebP."
