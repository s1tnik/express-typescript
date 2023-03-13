import analyzeIOSProject from "./analyzeIOSProject";
import { downloadArchive } from "./downloadUtils";
import { ProjectType, SourceType } from "../types";
import {
  extractArchive,
  readDir,
  deleteDirectory,
  deleteFile,
} from "./fileUtils";

export const analyzeRepository = async (
  sourceType: SourceType,
  link: string
): Promise<any> => {
  const archivePath = await downloadArchive(sourceType, link);
  const projectType = getProjectType(archivePath);
  const { projectFilePath, projectDirectoryPath } = await extractProjectFile(
    archivePath,
    projectType
  );
  let projectInformation: any;

  switch (projectType) {
    case "IOS":
      projectInformation = analyzeIOSProject(projectFilePath);
      break;
    default:
      throw new Error(`Unsupported project type: ${projectType}`);
  }

  await deleteDirectory(projectDirectoryPath);
  await deleteFile(archivePath);
  return projectInformation;
};

// Returns the project type based on the file path
export function getProjectType(archivePath: string): ProjectType {
  return "IOS";
}

// Extracts the project file from the given archive and returns the path to the extracted file
export async function extractProjectFile(
  archivePath: string,
  projectType: ProjectType
): Promise<{ projectFilePath: string; projectDirectoryPath: string }> {
  let projectFilePath = "";
  let projectDirectoryPath = "";

  switch (projectType) {
    case "IOS":
      projectDirectoryPath = await extractArchive(archivePath);
      const [mainFolder] = await readDir(projectDirectoryPath);
      const xcodeprojFiles = await readDir(mainFolder);
      projectFilePath =
        xcodeprojFiles.find((f) => f.endsWith(".xcodeproj")) || "";
      break;
    default:
      throw new Error(`Unsupported project type: ${projectType}`);
  }

  if (!projectFilePath) {
    await deleteDirectory(projectDirectoryPath);
    throw new Error("Project file not found");
  }

  return { projectFilePath, projectDirectoryPath };
}
