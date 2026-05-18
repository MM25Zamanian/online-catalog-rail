import type { ComponentProps } from "react";
import TrainIconBase from "~icons/material-symbols-light/train-outline.jsx";
import TruckIconBase from "~icons/material-symbols-light/local-shipping-outline.jsx";
import ShipIconBase from "~icons/material-symbols-light/directions-boat-outline.jsx";
import StoreIconBase from "~icons/material-symbols-light/store-outline.jsx";
import LocationIconBase from "~icons/material-symbols-light/location-on-outline.jsx";
import PhoneIconBase from "~icons/material-symbols-light/call-outline.jsx";
import DeskphoneIconBase from "~icons/material-symbols-light/phone-in-talk-outline.jsx";
import InstagramIconBase from "~icons/mynaui/instagram.jsx";
import GlobeIconBase from "~icons/material-symbols-light/language.jsx";

type IconProps = ComponentProps<"svg">;

export function TrainIcon(props: IconProps) {
  return <TrainIconBase aria-hidden="true" {...props} />;
}

export function TruckIcon(props: IconProps) {
  return <TruckIconBase aria-hidden="true" {...props} />;
}

export function ShipIcon(props: IconProps) {
  return <ShipIconBase aria-hidden="true" {...props} />;
}

export function StoreIcon(props: IconProps) {
  return <StoreIconBase aria-hidden="true" {...props} />;
}

export function LocationIcon(props: IconProps) {
  return <LocationIconBase aria-hidden="true" {...props} />;
}

export function PhoneIcon(props: IconProps) {
  return <PhoneIconBase aria-hidden="true" {...props} />;
}

export function DeskphoneIcon(props: IconProps) {
  return <DeskphoneIconBase aria-hidden="true" {...props} />;
}

export function InstagramIcon(props: IconProps) {
  return <InstagramIconBase aria-hidden="true" {...props} />;
}

export function GlobeIcon(props: IconProps) {
  return <GlobeIconBase aria-hidden="true" {...props} />;
}
