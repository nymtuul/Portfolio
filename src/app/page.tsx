import { PortfolioLanding } from "@/components/portfolio/portfolio-landing";
import { PortfolioLandingMobile } from "@/components/portfolio/portfolio-landing-mobile";
import { DiarySection, DiarySectionMobile } from "@/components/portfolio/diary-section";
import { ScaleToFit } from "@/components/scale-to-fit";

export default function Home() {
  return (
    <>
      <div className="only-desktop">
        <PortfolioLanding />
        <ScaleToFit designWidth={1280}>
          <DiarySection />
        </ScaleToFit>
      </div>
      <div className="only-mobile">
        <PortfolioLandingMobile />
        <DiarySectionMobile />
      </div>
    </>
  );
}
