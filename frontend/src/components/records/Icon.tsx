// import iconList from "@/utils/iconList";
import { CircleHelp } from "lucide-react";

type Props = {
  name: string;
};

export default function Icon({ name, ...props }: Props) {
  //   const IconComponent = iconList[name];
  //   if (!IconComponent) {
  return <CircleHelp />;
  //   }

  //   return <IconComponent {...props} />;
}
