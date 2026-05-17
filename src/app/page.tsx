import { PortfolioLanding } from "@/components/portfolio/portfolio-landing";
import { DiarySection } from "@/components/portfolio/diary-section";
import { ScaleToFit } from "@/components/scale-to-fit";

export default function Home() {
  return (
    <>
      <PortfolioLanding />
      <ScaleToFit designWidth={1280}>
        <DiarySection />
      </ScaleToFit>
    </>
  );
}
