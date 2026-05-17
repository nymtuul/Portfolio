import type { Metadata } from "next";
import { LocationPage } from "@/components/location/location-page";
import { ScaleToFit } from "@/components/scale-to-fit";

export const metadata: Metadata = {
  title: "Location — Help Choi Jiwoo find her love",
  description: "find jiwoo on the map",
};

export default function Page() {
  return (
    <ScaleToFit designWidth={1440}>
      <LocationPage />
    </ScaleToFit>
  );
}
