export default function download(content: string | Blob, filename: string) {
  const eleLink = document.createElement("a");

  let url: string;
  if (content instanceof Blob) url = URL.createObjectURL(content);
  else url = URL.createObjectURL(new Blob([content]));
  eleLink.download = filename;
  eleLink.style.display = "none";

  eleLink.href = url;

  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
  URL.revokeObjectURL(url);
}

export function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}
