use serde::Serialize;
use std::time::{Instant};
use std::process::Command;

#[derive(Serialize)]
pub struct RunResult {
    pub output: String,
    pub execution_time_ms: u128,
    pub code_length: usize,
}

#[tauri::command]
pub fn run_code(code: String, path: String) -> Result<RunResult, String> {
    let start = Instant::now();
    let code_length = code.len();

    let code = code.trim();
    if code.is_empty() {
        return Err("No code provided".into());
    };
    
    // 1. Validate the path
    // 2. Validate the code (basic checks)
    // 3. Execute the code in the specified path context (this involves some sort of parsing to exectute. We might just want to open a rails console and execute, collect output on a loop, idk)
    // 4. Capture output and execution time
    // 5. Return results
    
    // Practicing with simple grep command before moving to rails commands
    let output_result = Command::new("grep")
        .arg(code)
        .arg("README.md") // Example file to search in
        .current_dir(&path)
        .output()
        .map_err(|e| format!("Failed to execute grep: {}", e))?;
    
    let execution_time_ms = start.elapsed().as_millis();
    
    let stdout = String::from_utf8_lossy(&output_result.stdout);
    let stderr = String::from_utf8_lossy(&output_result.stderr);

    println!("Grep stdout: {}", stdout);
    
    let output = if output_result.status.success() {
        stdout.to_string()
    } else {
        format!("No matches found or error occurred:\n{}", stderr)
    };
    
    Ok(RunResult {
        output,
        execution_time_ms,
        code_length,
    })
}