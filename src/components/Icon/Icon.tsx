import type { SVGProps } from 'react';
import HomeIcon from '../../../assets/icons/home.svg?react';
import ClassesIcon from '../../../assets/icons/classes.svg?react';
import BookingsIcon from '../../../assets/icons/bookings.svg?react';
import ProfileIcon from '../../../assets/icons/profile.svg?react';

const icons = {
  home: HomeIcon,
  classes: ClassesIcon,
  bookings: BookingsIcon,
  profile: ProfileIcon,
};

export type IconName = keyof typeof icons;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

/** Inline SVG from assets/icons. Its stroke is currentColor, so it takes the parent's `color`. */
export function Icon({ name, ...rest }: IconProps) {
  const Svg = icons[name];
  return <Svg aria-hidden="true" focusable="false" {...rest} />;
}
