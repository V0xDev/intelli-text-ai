import { NavBarButton } from "@/components/SettingsContainer/ButtonSettings.types";
import SettingsModel from "@/components/SettingsContainer/Modal/SettingsModel.vue";
import SystemSettings from "@/components/SettingsContainer/Modal/SystemSettings.vue";
import { BrainIcon, GearIcon } from "@/shared/components";

export const NavBarButtons: NavBarButton[] = [
  {
    name: "Системные настройки",
    component: SystemSettings,
    icon: GearIcon,
  },
  {
    name: "Настройки модели",
    component: SettingsModel,
    icon: BrainIcon,
  },
];
