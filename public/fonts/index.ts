import { Inter, Noto_Sans_KR } from "next/font/google";

import { pretendard } from "./pretendard";

const inter = Inter({ subsets: ["latin"] });
const notoSans = Noto_Sans_KR({
  weight: "400",
  subsets: ["latin"],
  // display: "swap",
  // adjustFontFallback: false,
});

export { pretendard, inter, notoSans };
