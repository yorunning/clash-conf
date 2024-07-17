function processSubLink(convertType, subLink) {
  return convertType === "stash-ml"
    ? encodeURIComponent(
        "https://host.fawncloud.one/update_v2ray_subscribe.php?" +
          `subscribe=${subLink}&&host=puui.qpic.cn&&port=80`
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
