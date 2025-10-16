use serde::Serialize;
use std::time::{Instant};
use std::process::Command;
use std::env;

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

    let escaped_code = code.replace("'", "'\\''");
    let command = format!("rails runner 'puts {}'", escaped_code);
    let shell = env::var("SHELL").unwrap_or_else(|_| "/bin/bash".to_string());
    
    // Execute rails runner
    let output_result = Command::new(&shell)
      .arg("-c")
      .arg(&command)
      .current_dir(&path)
      .output()
      .map_err(|e| format!("Failed to execute rails runner: {}", e))?;
    
    let execution_time_ms = start.elapsed().as_millis();
    
    let stdout = String::from_utf8_lossy(&output_result.stdout);
    let stderr = String::from_utf8_lossy(&output_result.stderr);

    println!("stdout: {}", stdout);
    
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

