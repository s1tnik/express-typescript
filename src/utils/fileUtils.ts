import fs from "fs";
import AdmZip from "adm-zip";
import path from "path";

export async function deleteDirectory(dirPath: string): Promise<void> {
  const files = await fs.promises.readdir(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = await fs.promises.lstat(filePath);

    if (stat.isDirectory()) {
      await deleteDirectory(filePath);
    } else {
      await fs.promises.unlink(filePath);
    }
  }

  await fs.promises.rmdir(dirPath);
}

export async function deleteFile(filePath: string): Promise<void> {
  await fs.promises.unlink(filePath);
}

// Extracts a zip archive to a temporary directory and returns the path to the directory
export async function extractArchive(archivePath: string): Promise<string> {
  const tempDir = await fs.promises.mkdtemp("extract-");
  const zip = new AdmZip(archivePath);
  zip.extractAllTo(tempDir);
  return tempDir;
}

// Reads the contents of a directory and returns a list of files and directories
export async function readDir(dirPath: string): Promise<string[]> {
  const files = await fs.promises.readdir(dirPath);
  return files.map((file) => path.join(dirPath, file));
}
