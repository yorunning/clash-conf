export function generateRawLink(target, filename, url) {
  return (
    "https://sub.xeton.dev/sub?target=clash&udp=true" +
    "&config=https://cdn.jsdelivr.net/gh/yorunning/clash-conf@main/config/" +
    `${target}.ini&filename=${filename}&url=${url}`
  );
}

export function generateShortLink(target, filename, url) {
  return `https://sub.yorun.me/api?target=${target}&filename=${filename}&url=${url}`;
}

export function processSubLink(convertType, subLink) {
  return convertType === "stash-ml"
    ? encodeURIComponent(
        `https://cghost.elkcloud.cf/&&${subLink}&&puui.qpic.cn&&&&80`
      )
    : subLink;
}
