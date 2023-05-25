import { useState, useMemo } from "react";
import {
  Text,
  Button,
  Input,
  Textarea,
  Radio,
  Toggle,
  Tooltip,
} from "@geist-ui/core";
import { useToasts, useClipboard } from "@geist-ui/core";
import { Copy, ExternalLink, Link2 } from "@geist-ui/icons";

import styles from "./content.module.scss";
import { generateRawLink, generateShortLink } from "@/lib/utils";

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
  const [enableShortLink, setEnableShortLink] = useState(true);

  const resultLink = useMemo(() => {
    if (subLink !== "" && configName !== "") {
      return enableShortLink
        ? generateShortLink(convertType, configName, subLink)
        : generateRawLink(convertType, configName, subLink);
    }
    return "";
  }, [convertType, subLink, configName, enableShortLink]);

  const { setToast } = useToasts();
  const { copy } = useClipboard();

  function handleCopyLink() {
    if (resultLink) {
      copy(resultLink);
      setToast({ text: promptMessage.success });
    } else {
      setToast({ text: promptMessage.error });
    }
  }

  function handleImportToClient() {
    if (resultLink) {
      window.location.href =
        "clash://install-config?url=" + encodeURIComponent(resultLink);
    } else {
      setToast({ text: promptMessage.error });
    }
  }

  return (
    <div className={styles["content"]}>
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
          type={subLink !== "" ? "secondary" : "default"}
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
          type={configName !== "" ? "secondary" : "default"}
          value={configName}
          onChange={(e) => {
            setConfigName(e.target.value);
          }}
        >
          Configuration name
        </Input>
      </div>

      <div>
        <div className={styles["result-link"]}>
          <div>
            <Text>Result link</Text>
            <Tooltip text="Enable / Disable short link." placement="topStart">
              <Link2
                color={enableShortLink ? "#0070f3" : "#444"}
                size="1.3rem"
              />
            </Tooltip>
          </div>
          <Toggle
            initialChecked
            scale={1.5}
            checked={enableShortLink}
            onChange={(e) => {
              setEnableShortLink(e.target.checked);
            }}
          />
        </div>

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

      <div className={styles["button-group"]}>
        <Button
          type="secondary"
          shadow
          iconRight={<Copy />}
          onClick={handleCopyLink}
        >
          Copy link
        </Button>
        <Button
          type="success"
          shadow
          iconRight={<ExternalLink />}
          onClick={handleImportToClient}
        >
          Import to client
        </Button>
      </div>
    </div>
  );
}
