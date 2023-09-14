export default function getFileExtension(url: string) {
  if (url.split(":")[0] === "file") {
    return url.slice(url.lastIndexOf(".") + 1);
  }

  // Split the URL by '/' to get the path components
  const pathComponents = url.split("/");

  // Get the last component which should contain the filename
  const fileNameWithQuery = pathComponents[pathComponents.length - 1];

  // Use regular expressions to extract the file extension
  const matches = fileNameWithQuery.match(/\.([^.?#]+)(?:[?#]|$)/);

  if (matches && matches.length === 2) {
    return matches[1].toLowerCase(); // Return the file extension in lowercase
  } else {
    return null; // No file extension found
  }
}
