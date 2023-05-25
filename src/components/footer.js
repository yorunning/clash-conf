import Image from "next/image";
import { Text, User } from "@geist-ui/core";

import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer-left"]}>
        <Text>Powered by</Text>
        <Image src="/next.svg" width={80} height={48} alt="Next.js" />
      </div>

      <div className={styles["footer-right"]}>
        <Text>Developed by</Text>
        <User
          src="https://avatars.githubusercontent.com/u/25226871?v=4"
          name="Yorun"
          altText="yorun"
        >
          <User.Link href="https://github.com/yorunning">@yorunning</User.Link>
        </User>
      </div>
    </div>
  );
}
