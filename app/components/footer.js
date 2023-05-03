"use client";
import Image from "next/image";
import { Text, User, Grid } from "@geist-ui/core";

export default function Footer() {
  return (
    <Grid.Container alignItems="center" className="footer">
      <Grid sm xs={24}>
        <Text font="14px" mr=".5rem">
          Powered by
        </Text>
        <Image src="/next.svg" width={80} height={44} alt="Next.js" />
      </Grid>

      <Grid sm xs={0} justify="flex-end">
        <Text font="14px">Developed by</Text>
        <User
          src="https://avatars.githubusercontent.com/u/25226871?v=4"
          name="Yorun"
          altText="yorun"
        >
          <User.Link href="https://github.com/yorunning">@yorunning</User.Link>
        </User>
      </Grid>
    </Grid.Container>
  );
}
