import { rolesArabicNames } from "@/lib/rolesArabicNames";
import type { JWTRole } from "@/store/authStore";
import {
    IconArrowBackUp,
    IconBox,
    IconBuildingCommunity,
    IconBuildingStore,
    IconCategoryFilled,
    IconChartPie3,
    IconCheck,
    IconCoin,
    IconColorFilter,
    IconFileSpreadsheet,
    IconFileTypePdf,
    IconMapPins,
    IconNeedle,
    IconPackageExport,
    IconPackages,
    IconPhotoFilled,
    IconPlayerTrackNext,
    IconRefresh,
    IconSend,
    IconShoppingBag,
    IconTrashFilled,
    IconTruckDelivery,
    IconUserCheck,
    IconUsers
} from "@tabler/icons-react";

interface NavSection {
    link: string;
    label: string;
    enLabel: string;
    icon: typeof IconBox;
    roles: JWTRole[];
    lastOfGroup?: boolean;
}

export const navSections: NavSection[] = [
    {
        link: "/statistics",
        label: "الاحصائيات",
        enLabel: "statistics",
        icon: IconChartPie3,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "COMPANY_MANAGER", "CLIENT"],
        lastOfGroup: true
    },
    {
        link: "/orders",
        label: "الطلبات",
        enLabel: "invoices",
        icon: IconPackageExport,
        roles: Object.keys(rolesArabicNames) as (keyof typeof rolesArabicNames)[]
    },
    {
        link: "/orders-bulk-create",
        label: "انشاء طلبات / يدوي",
        enLabel: "orders bulk create",
        icon: IconPackages,
        roles: ["ACCOUNTANT", "DATA_ENTRY", "COMPANY_MANAGER", "BRANCH_MANAGER"]
    },
    {
        link: "/orders-bulk-create",
        label: "انشاء طلبات / يدوي",
        enLabel: "orders bulk create",
        icon: IconPackages,
        roles: ["CLIENT"]
    },
    {
        link: "/orders-sheet",
        label: "انشاء طلبات / اكسل",
        enLabel: "orders sheet",
        icon: IconFileSpreadsheet,
        roles: ["DATA_ENTRY", "COMPANY_MANAGER", "CLIENT"]
    },
    {
        link: "/forwarded",
        label: "الطلبات المحالة للشركة",
        enLabel: "forwarded orders",
        icon: IconSend,
        roles: ["COMPANY_MANAGER"]
    },
    {
        link: "/forwarded-to-company",
        label: "الطلبات المحالة من الشركة",
        enLabel: "forwarded orders to company",
        icon: IconPlayerTrackNext,
        roles: ["COMPANY_MANAGER"]
    },
    {
        link: "/client-orders-confirm",
        label: "تأكيد طلبات العملاء",
        enLabel: "client orders confirm",
        icon: IconCheck,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "COMPANY_MANAGER", "REPOSITORIY_EMPLOYEE", "DATA_ENTRY"]
    },
    {
        link: "/orders-auto-update",
        label: "التحديث التلقائي للطلبات",
        enLabel: "orders auto update",
        icon: IconRefresh,
        roles: ["COMPANY_MANAGER"],
        lastOfGroup: true
    },
    {
        link: "/reports",
        label: "الكشوفات",
        enLabel: "reports",
        icon: IconFileTypePdf,
        roles: [
            "ADMIN",
            "ADMIN_ASSISTANT",
            "BRANCH_MANAGER",
            "ACCOUNTANT",
            "REPOSITORIY_EMPLOYEE",
            "CLIENT",
            "COMPANY_MANAGER"
        ]
    },
    {
        link: "/repository-entries",
        label: "ادخال رواجع المخزن",
        enLabel: "repository entries",
        icon: IconArrowBackUp,
        roles: ["COMPANY_MANAGER", "REPOSITORIY_EMPLOYEE", "BRANCH_MANAGER"],
        lastOfGroup: true
    },
    {
        link: "/clients",
        label: "العملاء",
        enLabel: "clients",
        icon: IconUsers,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "ACCOUNTANT", "DATA_ENTRY", "BRANCH_MANAGER", "COMPANY_MANAGER"]
    },
    {
        link: "/stores",
        label: "المتاجر",
        enLabel: "stores",
        icon: IconShoppingBag,
        roles: [
            "ADMIN",
            "ADMIN_ASSISTANT",
            "DATA_ENTRY",
            "ACCOUNTANT",
            "BRANCH_MANAGER",
            "CLIENT",
            "CLIENT_ASSISTANT",
            "COMPANY_MANAGER"
        ]
    },
    {
        link: "/home",
        label: "المنتجات",
        enLabel: "home",
        icon: IconBox,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "DATA_ENTRY", "COMPANY_MANAGER", "CLIENT", "CLIENT_ASSISTANT"],
        lastOfGroup: true
    },
    {
        link: "/tenants",
        label: "الشركات",
        enLabel: "tenants",
        icon: IconBuildingCommunity,
        roles: ["ADMIN", "ADMIN_ASSISTANT"]
    },
    {
        link: "/branches",
        label: "الفروع",
        enLabel: "branches",
        icon: IconUsers,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "COMPANY_MANAGER"]
    },
    {
        link: "/repositories",
        label: "المخازن",
        enLabel: "repositories",
        icon: IconBuildingStore,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "REPOSITORIY_EMPLOYEE", "ACCOUNTANT", "COMPANY_MANAGER"]
    },
    {
        link: "/locations",
        label: "المناطق",
        enLabel: "regions",
        icon: IconMapPins,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "BRANCH_MANAGER", "ACCOUNTANT", "DATA_ENTRY", "COMPANY_MANAGER"]
    },
    {
        link: "/employees",
        label: "الموظفين",
        enLabel: "employees",
        icon: IconUserCheck,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "COMPANY_MANAGER", "BRANCH_MANAGER"]
    },
    {
        link: "/employees/add",
        label: "اضافة مندوب",
        enLabel: "employees",
        icon: IconUserCheck,
        roles: ["BRANCH_MANAGER"]
    },
    {
        link: "/agents-manifest",
        label: "منافيست المندوبين",
        enLabel: "agents manifest",
        icon: IconTruckDelivery,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "ACCOUNTANT", "BRANCH_MANAGER", "DATA_ENTRY", "COMPANY_MANAGER"]
    },
    {
        link: "/treasury",
        label: "الخزنة",
        enLabel: "treasury",
        icon: IconCoin,
        roles: ["ACCOUNTANT", "COMPANY_MANAGER"]
    },
    {
        link: "/banners",
        label: "البنرات",
        enLabel: "banners",
        icon: IconPhotoFilled,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "COMPANY_MANAGER"],
        lastOfGroup: true
    },
    {
        link: "/users/login-history",
        label: "سجل دخول المستخدمين",
        enLabel: "users login history",
        icon: IconBuildingCommunity,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "COMPANY_MANAGER"],
        lastOfGroup: true
    },
    {
        link: "/categories",
        label: "الاصناف",
        enLabel: "categories",
        icon: IconCategoryFilled,
        roles: ["CLIENT", "CLIENT_ASSISTANT"]
    },
    {
        link: "/sizes",
        label: "الاحجام",
        enLabel: "sizes",
        icon: IconNeedle,
        roles: ["CLIENT", "CLIENT_ASSISTANT"]
    },
    {
        link: "/colors",
        label: "الالوان",
        enLabel: "colors",
        icon: IconColorFilter,
        roles: ["CLIENT", "CLIENT_ASSISTANT"],
        lastOfGroup: true
    },
    {
        link: "/deleted",
        label: "المحذوفات",
        enLabel: "deleted",
        icon: IconTrashFilled,
        roles: ["ADMIN", "ADMIN_ASSISTANT", "COMPANY_MANAGER"]
    }
];
