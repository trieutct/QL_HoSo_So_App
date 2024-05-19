export function getFileInfoFromPath(filePath: string) {
  const pathParts = filePath.split("/");

  const fileName = pathParts[pathParts.length - 1];
  const [name, extension] = fileName.split(".");
  const [id, ...nameWithoutId] = name.split("-");
  const userName = nameWithoutId.join("-");
  return {
    id,
    userName,
    fileName,
    extension,
    fullPath: filePath,
  };
}
