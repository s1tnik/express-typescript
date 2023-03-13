import { readDir } from "./fileUtils";
import fs from "fs";
import path from "path";

// Extracts the compatibility version from the given project file and returns it as an object
async function analyzeIOSProject(projectFilePath: string): Promise<any> {
  let projectFile: string | undefined;

  const iosProjectFiles = await readDir(projectFilePath);
  projectFile = iosProjectFiles.find((file) => file.endsWith(".pbxproj"));
  if (!projectFile) {
    throw new Error("Could not find IOS project file");
  }

  const content = fs.readFileSync(
    path.join(__dirname, "../..", projectFile),
    "utf8"
  );

  const iosMatch = content.match(/CompatibilityVersion = "(.*?)"/i);
  if (!iosMatch || !iosMatch[1]) {
    throw new Error("Could not extract IOS compatibility version");
  }
  return { CompatibilityVersion: iosMatch[1] };
}

export default analyzeIOSProject;
