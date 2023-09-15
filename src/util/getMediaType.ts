export default function isPictureOrVideo(
  fileExtension: string
): "picture" | "video" | void {
  const pictureExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
  const videoExtensions = ["mp4", "avi", "mkv", "mov", "wmv", "flv"];

  if (pictureExtensions.includes(fileExtension)) {
    return "picture";
  }
  if (videoExtensions.includes(fileExtension)) {
    return "video";
  }
}
