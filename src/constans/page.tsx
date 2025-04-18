import { AutomationDuoTone, ContactsDuoTone, HomeDuoTone, RocketDuoTone, SettingsDuoTone } from "@/icons/gloabl-icons"

export const PAGE_BREAD_CRUMBS: string[] = [
    'contacts',
    'automations',
    'integrations',
    'settings'
]


type Props = {
    [page in string]: React.ReactNode
}

export const PAGE_ICON: Props = {
    AUTOMATIONS: <AutomationDuoTone color="blue"/>,
    CONTACTS: <ContactsDuoTone color="blue"/>,
    INTEGRATIONS: <RocketDuoTone color="blue" />,
    SETTING: <SettingsDuoTone color="blue"/>,
    HOME: <HomeDuoTone color="blue" width="35" height="35"/>
}

export const PLANS = [
    {
        name: "Free Plan",
        description: "Perfect for getting started",
        price: "$0",
        features: [
            "Boost engagement with target responses",
            "Automate comment replies to enhance audience interaction",
            "Turn followers into customers with targeted messaging"
        ],
        cta: "Get Started",
        featured: false
    },
    {
        name: "Smart AI Plan",
        description: "Advanced features for power users",
        price: "$29",
        features: [
            "All features from Free Plan",
            "AI-powered response generation",
            "Advanced analytics and insights",
            "Priority customer support",
            "Custom branding options"
        ],
        cta: "Upgrade Now",
        featured: true
    }
];