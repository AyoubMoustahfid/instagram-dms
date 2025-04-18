import {v4 as uuid} from "uuid"
import {HomeDuoTone, AutomationDuoTone, RocketDuoTone, SettingsDuoTone} from "@/icons/gloabl-icons"

export type FieldProps = {
    label: string
    id: string
}


type SideBarProps = {
    icon: React.ReactNode
} & FieldProps

export const SIDEBAR_MENU: SideBarProps[] = [
    {
        id: uuid(),
        label: 'home',
        icon: <HomeDuoTone color="white"/>
    },
    {
        id: uuid(),
        label: 'automations',
        icon: <AutomationDuoTone color="white"/>
    },
    {
        id: uuid(),
        label: 'integrations',
        icon: <RocketDuoTone color="white" />
    },
    {
        id: uuid(),
        label: 'settings',
        icon: <SettingsDuoTone color="white"/>
    },
]