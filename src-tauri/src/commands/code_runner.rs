use serde::Serialize;
use std::time::{Instant};
use std::process::Command;
use std::{vec};

#[derive(Serialize)]
pub struct RunResult {
    pub output: Vec<String>,
    pub execution_time_ms: u128,
    pub command_count: usize,
}

#[tauri::command(async)]
pub fn run_code(code: String, path: String) -> Result<RunResult, String> {
    let start = Instant::now();
    let formatted_code = format_for_rails_runner(&code);
    
    let output_result = Command::new("bundle")
      .args(&["exec", "rails", "runner", formatted_code.0.as_str()])
      .current_dir(&path)
      .output()
      .map_err(|e| format!("Failed to execute: {}", e))?;
    
    let execution_time_ms = start.elapsed().as_millis();

    let stdout = String::from_utf8_lossy(&output_result.stdout);
    let stderr = String::from_utf8_lossy(&output_result.stderr);

    let parsed_stout: Vec<String> = stdout
          .to_string()
          .split(|c| c == '\n')
          .map(|line| line.trim().to_string())
          .filter(|line| !line.is_empty())
          .collect();

    let parsed_sterr: Vec<String> = vec![stderr.to_string()];
    
    let output: Vec<String> = if output_result.status.success() {
      parsed_stout
    } else {
      [parsed_stout, parsed_sterr].concat()
    };
    
    Ok(RunResult {
        output: output,
        execution_time_ms: execution_time_ms,
        command_count: formatted_code.1,
    })
}


fn format_for_rails_runner(code: &str) -> (String, usize) {
    let commands: Vec<&str> = code
        .split(|c| c == '\n' || c == ';')
        .map(|line| line.trim())
        .filter(|line| !line.is_empty())
        .collect();
    
    let formatted_commands: Vec<String> = commands
        .iter()
        .map(|cmd| {
            let cmd = cmd.trim_end_matches(';');
            format!("puts ({})", cmd)
        })
        .collect();
    
    (formatted_commands.join("; "), formatted_commands.len())
}

