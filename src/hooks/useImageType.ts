export const onlineImageData = [
    {
        name: "health_insurance",
        value: 10,
        label: "健康保険証"
    },
    {
        name: "public_expense_beneficiary",
        value: 20,
        label: "公費受益者カード"
    },
    {
        name: "others",
        value: 30,
        label: "その他"
    },
]

export const useImageType = (kind: String) => {
    return onlineImageData.find((item:any) => item.value == kind)
}
