"use client";
import { useState, useMemo } from "react";
import { Text, Button, Input, Textarea, Radio } from "@geist-ui/core";
import { useToasts, useClipboard } from "@geist-ui/core";
import { Copy, ExternalLink } from "@geist-ui/icons";

const radioItems = [
  { value: "clash", text: "Clash" },
  { value: "stash", text: "Stash" },
  { value: "stash-ml", text: "Stash (zero-rated)" },
];

const promptMessage = {
  success: "🎉 Copy successful!",
  error: "🚧 Empty values in input.",
};

export default function Content() {
  const [convertType, setConvertType] = useState("clash");
  const [subLink, setSubLink] = useState("");
  const [configName, setConfigName] = useState("");

  const { setToast } = useToasts();
  const { copy } = useClipboard();

  const resultLink = useMemo(() => {
    const baseUrl =
      "https://sub.xeton.dev/sub?target=clash&udp=true" +
      "&config=https://cdn.jsdelivr.net/gh/yorunning/clash-conf@main/config/" +
      `${convertType}.ini`;

    const ensureSubLink =
      convertType === "stash-ml"
        ? encodeURIComponent(
            `https://cghost.elkcloud.cf/&&${subLink}&&puui.qpic.cn&&&&80`
          )
        : subLink;

    if (subLink !== "" && configName !== "") {
      return `${baseUrl}&filename=${configName}&url=${ensureSubLink}`;
    }
    return "";
  }, [convertType, subLink, configName]);

  function copyHandler() {
    if (resultLink) {
      copy(resultLink);
      setToast({ text: promptMessage.success });
    } else {
      setToast({ text: promptMessage.error });
    }
  }

  function importHandler() {
    if (resultLink) {
      window.location.href = `clash://install-config?url=${encodeURIComponent(
        resultLink
      )}`;
    } else {
      setToast({ text: promptMessage.error });
    }
  }

  return (
    <div className="content">
      <div>
        <Text>Conversion type</Text>
        <Radio.Group
          useRow
          value={convertType}
          onChange={(val) => setConvertType(val)}
        >
          {radioItems.map((radioItem) => (
            <Radio key={radioItem.value} value={radioItem.value}>
              <Text span style={{ fontWeight: "normal" }}>
                {radioItem.text}
              </Text>
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div>
        <Input
          width="100%"
          font="1rem"
          placeholder="Please enter"
          clearable
          value={subLink}
          onChange={(e) => {
            setSubLink(e.target.value);
          }}
        >
          Subscription link
        </Input>
      </div>

      <div>
        <Input
          width="100%"
          font="1rem"
          placeholder="Please enter"
          clearable
          value={configName}
          onChange={(e) => {
            setConfigName(e.target.value);
          }}
        >
          Configuration name
        </Input>
      </div>

      <div>
        <Text>Result link</Text>
        <Textarea
          width="100%"
          height="5rem"
          font="1rem"
          placeholder="Read-only text box, waiting for input."
          readOnly
          type={resultLink !== "" ? "success" : "default"}
          value={resultLink}
        />
      </div>

      <div className="button-group">
        <Button
          type="secondary"
          shadow
          iconRight={<Copy />}
          onClick={copyHandler}
        >
          Copy link
        </Button>
        <Button
          type="success"
          shadow
          iconRight={<ExternalLink />}
          onClick={importHandler}
        >
          Import to client
        </Button>
      </div>
    </div>
  );
}
