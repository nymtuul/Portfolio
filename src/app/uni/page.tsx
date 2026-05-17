import type { Metadata } from "next";
import { LocationPage } from "@/components/location/location-page";
import { ScaleToFit } from "@/components/scale-to-fit";

export const metadata: Metadata = {
  title: "uni",
  description: "where i'm pretending to be a serious student",
};

export default function Page() {
  return (
    <ScaleToFit designWidth={1440}>
      <LocationPage />
    </ScaleToFit>
  );
}
