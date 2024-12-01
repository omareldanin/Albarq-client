enum Role {
    ADMIN = "ادمن",
    COMPANY_MANAGER = "مدير شركة",
    ACCOUNT_MANAGER = "مدير حسابات",
    ACCOUNTANT = "محاسب",
    DELIVERY_AGENT = "مندوب توصيل",
    RECEIVING_AGENT = "مندوب استلام",
    BRANCH_MANAGER = "مدير فرع",
    EMERGENCY_EMPLOYEE = "موظف متابعة",
    DATA_ENTRY = "مدخل بيانات",
    REPOSITORIY_EMPLOYEE = "موظف مخزن",
    INQUIRY_EMPLOYEE = "موظف دعم",
    ADMIN_ASSISTANT = "مساعد ادمن",
    CLIENT_ASSISTANT = "مساعد عميل"
}

export const rolesArabicNames = {
    ADMIN: "مدير عام",
    COMPANY_MANAGER: "مدير شركة",
    ACCOUNT_MANAGER: "مدير حسابات", // need to clarify
    ACCOUNTANT: "محاسب",
    DELIVERY_AGENT: "مندوب توصيل", // won't use the dashboard
    RECEIVING_AGENT: "مندوب استلام", // won't use the dashboard
    BRANCH_MANAGER: "مدير فرع",
    EMERGENCY_EMPLOYEE: "موظف متابعة", // need to clarify
    DATA_ENTRY: "مدخل بيانات",
    REPOSITORIY_EMPLOYEE: "موظف مخزن",
    INQUIRY_EMPLOYEE: "موظف دعم", // need to clarify
    ADMIN_ASSISTANT: "مساعد ادمن",
    CLIENT_ASSISTANT: "مساعد عميل",
    CLIENT: "عميل"
};

export const rolesArray: { label: string; value: string }[] = Object.entries(Role).map(([value, label]) => ({
    label,
    value
}));
