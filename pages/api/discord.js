import { spawnSync } from 'child_process';

export default async (req, res) => {
  // Specify the absolute path to the Python script
  const scriptPath = '/Users/ben/Documents/programming/hack-mit/utils/discord.py';

  // Check if the script file exists
  const fs = require('fs');
  if (!fs.existsSync(scriptPath)) {
    console.error(`Python Script not found at ${scriptPath}`);
    res.status(500).json({ message: 'Python script not found' });
    return;
  }

  // Spawn a Python3 process and execute the script
  const dataToPass = req.body;
  const pythonProcess = spawnSync('python3', [scriptPath, dataToPass]);

  // Capture stdout and stderr
  const stdoutData = pythonProcess.stdout.toString();
  const stderrData = pythonProcess.stderr.toString();

  console.log(`Python Script Output: ${stdoutData}`);

  if (stderrData) {
    console.error(`Python Script Error: ${stderrData}`);
    // Handle error if stderrData is not empty
    res.status(500).json({ message: 'Error occurred while executing Python script' });
  } else {
    console.log(`Python Script Closed with Code ${pythonProcess.status}`);
    res.status(200).json({ message: 'Python script executed successfully' });
  }
};
