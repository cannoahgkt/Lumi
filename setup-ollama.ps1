# PowerShell script to set up Ollama for easy access
# Run this as Administrator to add Ollama to your PATH

$ollamaPath = "C:\Users\Asare\AppData\Local\Programs\Ollama"

# Check if the path is already in PATH
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($currentPath -notlike "*$ollamaPath*") {
    Write-Host "Adding Ollama to PATH..."
    $newPath = "$currentPath;$ollamaPath"
    [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
    Write-Host "Ollama added to PATH. Please restart your terminal."
} else {
    Write-Host "Ollama is already in PATH."
}

# Test Ollama
Write-Host "Testing Ollama..."
& "$ollamaPath\ollama.exe" --version
