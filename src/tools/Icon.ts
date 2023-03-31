// IconPark设置项
import * as allIcons from "@icon-park/svg/es";
import type { IIconProps } from "@icon-park/svg/lib/runtime";

// SVG转base64工具
import svg64 from "svg64";

export interface Icon {
  name: string; // 图标名称
  props: IIconProps; // 图标设置，参照IconPark组件的props
}

export const getIconBase64 = (icon: Icon): string => {
  // 需要将IconPark的图标名称，去除所有横杠，转成 upper camel case 风格，例如：IconName
  const iconNameWordList = icon.name.split("-");

  let iconName = "";

  // 循环拼合字符串
  for (const word of iconNameWordList) {
    iconName += word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
  }

  // 获取SVG的base64
  const base64 = svg64(allIcons[iconName as string](icon.props));

  return base64;
};
