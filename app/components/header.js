"use client";
import { Text, Link, Grid } from "@geist-ui/core";
import { Github } from "@geist-ui/icons";

export default function Header() {
  return (
    <Grid.Container className="header">
      <Grid sm={24} xs={24}>
        <Text h2 mb={0}>
          Subscription Converter
        </Text>
      </Grid>

      <Grid sm={12} xs={24}>
        <Text>Quickly convert Clash & Stash configuration files.</Text>
      </Grid>

      <Grid sm={12} xs={0} justify="flex-end">
        <Link
          href="https://github.com/yorunning/clash_conf"
          target="_blank"
          underline
          className="header-link"
        >
          View source code
          <Github size="1rem" />
        </Link>
      </Grid>
    </Grid.Container>
  );
}
