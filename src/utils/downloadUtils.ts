import axios from "axios";
import AdmZip from "adm-zip";
import path from "path";
import fs from "fs";
import { SourceType } from "../types";

// Downloads the archive from the given URL and returns the path to the downloaded file
export async function downloadArchive(
  sourceType: SourceType,
  url: string
): Promise<string> {
  let response;
  switch (sourceType) {
    case "GitHub":
      response = await axios.get(url, { responseType: "arraybuffer" });
      break;
    default:
      throw new Error("Unsupported source type.");
  }

  const zip = new AdmZip(response.data);
  const fileName = `repo-${new Date().getTime()}.zip`;
  const archivePath = path.join(__dirname, fileName);
  fs.writeFileSync(archivePath, zip.toBuffer());
  return archivePath;
}
