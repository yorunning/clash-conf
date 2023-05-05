"use client";
import { Text, Button, Input, Textarea, Radio, Grid } from "@geist-ui/core";
import { useToasts, useClipboard } from "@geist-ui/core";
import { Copy, ExternalLink } from "@geist-ui/icons";
import { useState, useMemo } from "react";

const radioItems = [
  { value: "clash", text: "Clash" },
  { value: "stash", text: "Stash" },
  { value: "stash-ml", text: "Stash (zero-rated)" },
];

export default function Operator() {
  const [convertType, setConvertType] = useState("clash");
  const [subLink, setSubLink] = useState("");
  const [configName, setConfigName] = useState("");

  const { setToast } = useToasts();
  const { copy } = useClipboard();

  const resultLink = useMemo(() => {
    const baseUrl = `https://sub.xeton.dev/sub?target=clash&config=https://cdn.jsdelivr.net/gh/yorunning/clash_conf@main/config/${convertType}.ini&udp=true`;

    if (subLink !== "" && configName !== "") {
      return `${baseUrl}&filename=${configName}&url=${subLink}`;
    }
    return "";
  }, [convertType, subLink, configName]);

  function copyHandler() {
    if (resultLink) {
      copy(resultLink);
      setToast({ text: "🎉 Copy successful!" });
    } else {
      setToast({ text: "🚧 Empty values in input." });
    }
  }

  function importHandler() {
    if (resultLink) {
      window.location.href = `stash://install-config?url=${encodeURIComponent(
        resultLink
      )}`;
    } else {
      setToast({ text: "🚧 Empty values in input." });
    }
  }

  return (
    <Grid.Container alignContent="center" className="operator">
      <Grid sm={24} xs={24} direction="column" justify="center">
        <Text font="14px" mt={0} style={{ color: "#444" }}>
          Conversion type
        </Text>
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
      </Grid>

      <Grid sm={24} xs={24}>
        <Input
          w="100%"
          placeholder="Please enter"
          clearable
          value={subLink}
          onChange={(e) => {
            setSubLink(e.target.value);
          }}
        >
          Subscription link
        </Input>
      </Grid>

      <Grid sm={24} xs={24}>
        <Input
          w="100%"
          placeholder="Please enter"
          clearable
          value={configName}
          onChange={(e) => {
            setConfigName(e.target.value);
          }}
        >
          Configuration name
        </Input>
      </Grid>

      <Grid sm={24} xs={24} direction="column" justify="center">
        <Text font="14px" mt={0} mb={"7px"} style={{ color: "#444" }}>
          Result link
        </Text>
        <Textarea
          placeholder="Read-only text box, waiting for input."
          readOnly
          type={resultLink !== "" ? "success" : "default"}
          value={resultLink}
        />
      </Grid>

      <Grid sm={24} xs={24} justify="center" alignItems="center">
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
      </Grid>
    </Grid.Container>
  );
}
