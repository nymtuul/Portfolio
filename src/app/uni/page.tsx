import type { Metadata } from "next";
import { LocationPage, LocationPageMobile } from "@/components/location/location-page";
import { ScaleToFit } from "@/components/scale-to-fit";

export const metadata: Metadata = {
  title: "uni",
  description: "where i'm pretending to be a serious student",
};

export default function Page() {
  return (
    <>
      <div className="only-desktop">
        <ScaleToFit designWidth={1440}>
          <LocationPage />
        </ScaleToFit>
      </div>
      <div className="only-mobile">
        <LocationPageMobile />
      </div>
    </>
  );
}
