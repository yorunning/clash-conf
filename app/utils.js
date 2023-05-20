function processSubLink(convertType, subLink) {
  return convertType === "stash-ml"
    ? encodeURIComponent(
        `https://cghost.elkcloud.cf/&&${subLink}&&puui.qpic.cn&&&&80`
      )
    : subLink;
}

export function generateRawLink(convertType, configName, subLink) {
  const precessedUrl = processSubLink(convertType, subLink);
  return (
    "https://sub.xeton.dev/sub?target=clash&udp=true" +
    "&config=https://cdn.jsdelivr.net/gh/yorunning/clash-conf@main/config/" +
    `${convertType}.ini&filename=${configName}&url=${precessedUrl}`
  );
}

export function generateShortLink(convertType, configName, subLink) {
  return `https://sub.yorun.me/api?type=${convertType}&filename=${configName}&url=${subLink}`;
}
