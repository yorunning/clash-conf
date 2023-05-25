import { Text, Link } from "@geist-ui/core";
import { Github } from "@geist-ui/icons";

import siteinfo from "@/app/siteinfo.json";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <div className={styles["header"]}>
      <div className={styles["title"]}>
        <Text h2>{siteinfo.title}</Text>
      </div>

      <div>
        <Text>{siteinfo.description}</Text>
      </div>

      <div className={styles["view-code"]}>
        <Link
          href="https://github.com/yorunning/clash_conf"
          target="_blank"
          underline
        >
          View source code
          <Github size="1rem" />
        </Link>
      </div>
    </div>
  );
}
