import React, { useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../../../components/templates/DefaultLayout'
import OriginalHeader from '../../../components/organisms/OriginalHeader'
import Regist, {
    RegistSection,
    RegistHeader,
    RegistBody,
    RegistInput,
} from '../../../components/organisms/OriginalRegist'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
    Stack,
    StackMulti,
    Item,
    ItemInline,
} from '../../../components/atoms/Stack'
import { Stack as MuiStack, Box } from '@mui/material'
import { SubmitButton } from '../../../components/atoms/OriginalButton'
import formCss from '../../../components/atoms/OriginalForm.module.scss'

// フォーム項目
type Inputs = {
    symptom: string // 症状・病名
}

const QuestionInputPage: React.FC = () => {
    const router = useRouter()

    // バリデーション用
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    // ラジオボタン:副作用
    const [reaction, setReaction] = useState('')
    // チェックボックス:アレルギー
    const [allergy, setAllergy] = useState<string[]>([])
    // チェックボックス:食事
    const [meal, setMeal] = useState<string[]>([])
    // 食事の習慣、食事制限あり（true | false）
    const [dietaryRestrictions, setDietaryRestrictions] = useState(false)
    // 嗜好品、飲酒（true | false）
    const [drinking, setDrinking] = useState(false)
    // 嗜好品、その他（true | false）
    const [luxuryGoodsOher, setLuxuryGoodsOher] = useState(false)
    // 体質、花粉症（true | false）
    const [hayFever, setHayFever] = useState(false)
    // 体質、その他（true | false）
    const [constitutionOher, setConstitutionOher] = useState(false)
    // ラジオボタン:女性の方
    const [femaleStatus, setFemaleStatus] = useState('')
    // ラジオボタン:他の医療機関の通院状況
    const [outpatient, setOutpatient] = useState('')
    // ラジオボタン:服用しているお薬
    const [taking, setTaking] = useState('')
    // 現在治療中の病気、その他（true | false）
    const [underTreatmentOher, setUnderTreatmentOher] = useState(false)
    // 過去に治療中の病気、その他（true | false）
    const [pastTreatmentOher, setPastTreatmentOher] = useState(false)

    // アレルギーに該当するものはありますか？
    // なし | 牛乳, 卵, その他
    const onChangeAllergy = (
        e: React.ChangeEvent<HTMLInputElement>,
        value: string
    ) => {
        let newAllergy: string[]
        if (e.target.checked) {
            if (value === 'no') {
                newAllergy = [value]
            } else {
                newAllergy = [...allergy, value]
                newAllergy = newAllergy.filter(function (a) {
                    return a !== 'no'
                })
            }
            setAllergy(newAllergy)
        } else {
            newAllergy = allergy.filter(function (a) {
                return a !== value
            })
            setAllergy(newAllergy)
        }
    }

    // 食事を摂る時間帯
    // 朝, 昼, 夕
    const onChangeMeal = (
        e: React.ChangeEvent<HTMLInputElement>,
        value: string
    ) => {
        let newMeal: string[]
        if (e.target.checked) {
            newMeal = [...meal, value]
            setMeal(newMeal)
        } else {
            newMeal = meal.filter(function (a) {
                return a !== value
            })
            setMeal(newMeal)
        }
    }

    // 送信処理
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data.symptom)
    }

    return (
        <>
            <DefaultLayout>
                <OriginalHeader
                    title="質問票に記入"
                    prevURL="back"
                    prevDialog={false}
                    isHomeBtn={false}
                />
                <main className="main">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box
                            sx={{
                                mt: '14px',
                            }}
                        >
                            <Regist>
                                <RegistSection>
                                    <RegistHeader>
                                        <h2 className="headerTitle">
                                            処方箋送信する人の情報
                                        </h2>
                                    </RegistHeader>
                                    <RegistBody>
                                        <Box
                                            sx={{
                                                mb: '10px',
                                                fontSize: '21px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            川野　裕子
                                        </Box>
                                        <Box
                                            sx={{
                                                fontSize: '15px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            1974年10月05日　47歳　女性
                                        </Box>
                                    </RegistBody>
                                </RegistSection>
                                <RegistSection>
                                    <RegistHeader>
                                        <h2 className="headerTitle">
                                            症状・お薬のことについてお聞きします
                                        </h2>
                                    </RegistHeader>
                                    <RegistBody>
                                        <RegistInput>
                                            <div className="label">
                                                1.今回、どのような症状でおかかりになりましたか？
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                症状・病名
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="text"
                                                    className={
                                                        errors.symptom?.type ===
                                                        'required'
                                                            ? `${formCss.formText} ${formCss.error}`
                                                            : `${formCss.formText}`
                                                    }
                                                    {...register('symptom', {
                                                        required: true,
                                                    })}
                                                />
                                                {errors.symptom?.type ===
                                                    'required' && (
                                                    <span
                                                        className={
                                                            formCss.errorText
                                                        }
                                                    >
                                                        必須項目です
                                                    </span>
                                                )}
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                2.お薬を服用して体調が悪くなるなどの症状（副作用）がでたことはありますか？
                                            </div>
                                            <div className="form">
                                                <Stack>
                                                    <ItemInline>
                                                        <input
                                                            type="radio"
                                                            className={
                                                                formCss.formRadio
                                                            }
                                                            id="reaction1"
                                                            value="no"
                                                            checked={
                                                                reaction ===
                                                                'no'
                                                            }
                                                            onChange={() => {
                                                                setReaction(
                                                                    'no'
                                                                )
                                                            }}
                                                        />
                                                        <label htmlFor="reaction1">
                                                            いいえ
                                                        </label>
                                                    </ItemInline>
                                                    <ItemInline>
                                                        <input
                                                            type="radio"
                                                            className={
                                                                formCss.formRadio
                                                            }
                                                            id="reaction2"
                                                            value="yes"
                                                            checked={
                                                                reaction ===
                                                                'yes'
                                                            }
                                                            onChange={() => {
                                                                setReaction(
                                                                    'yes'
                                                                )
                                                            }}
                                                        />
                                                        <label htmlFor="reaction2">
                                                            はい
                                                        </label>
                                                    </ItemInline>
                                                </Stack>
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                お薬の名前
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="text"
                                                    className={formCss.formText}
                                                    disabled={
                                                        reaction !== 'yes'
                                                    }
                                                />
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">症状</div>
                                            <div className="form">
                                                <input
                                                    type="text"
                                                    className={formCss.formText}
                                                    disabled={
                                                        reaction !== 'yes'
                                                    }
                                                />
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">時期</div>
                                            <div className="form">
                                                <MuiStack
                                                    direction="row"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: '58%',
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            className={
                                                                formCss.formText
                                                            }
                                                            disabled={
                                                                reaction !==
                                                                'yes'
                                                            }
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            width: '6%',
                                                            fontSize: '15px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        年
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            width: '30%',
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            className={
                                                                formCss.formText
                                                            }
                                                            disabled={
                                                                reaction !==
                                                                'yes'
                                                            }
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            width: '6%',
                                                            fontSize: '15px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        月
                                                    </Box>
                                                </MuiStack>
                                            </div>
                                        </RegistInput>
                                    </RegistBody>
                                </RegistSection>
                                <RegistSection>
                                    <RegistHeader>
                                        <h2 className="headerTitle">
                                            生活状況や体質についてお聞きします
                                        </h2>
                                    </RegistHeader>
                                    <RegistBody>
                                        <RegistInput>
                                            <div className="label">
                                                1.下記のアレルギーに該当するものはありますか？
                                            </div>
                                            <div className="form">
                                                <Stack>
                                                    <ItemInline>
                                                        <input
                                                            type="checkbox"
                                                            id="allergy1"
                                                            className={`
                                                        ${formCss.formCheckbox} ${formCss.minimum}`}
                                                            checked={allergy.includes(
                                                                'no'
                                                            )}
                                                            onChange={(e) =>
                                                                onChangeAllergy(
                                                                    e,
                                                                    'no'
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="allergy1">
                                                            なし
                                                        </label>
                                                    </ItemInline>
                                                    <ItemInline>
                                                        <input
                                                            type="checkbox"
                                                            id="allergy2"
                                                            className={`
                                                        ${formCss.formCheckbox} ${formCss.minimum}`}
                                                            checked={allergy.includes(
                                                                'milk'
                                                            )}
                                                            onChange={(e) =>
                                                                onChangeAllergy(
                                                                    e,
                                                                    'milk'
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="allergy2">
                                                            牛乳
                                                        </label>
                                                    </ItemInline>
                                                    <ItemInline>
                                                        <input
                                                            type="checkbox"
                                                            id="allergy3"
                                                            className={`
                                                        ${formCss.formCheckbox} ${formCss.minimum}`}
                                                            checked={allergy.includes(
                                                                'egg'
                                                            )}
                                                            onChange={(e) =>
                                                                onChangeAllergy(
                                                                    e,
                                                                    'egg'
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="allergy3">
                                                            卵
                                                        </label>
                                                    </ItemInline>
                                                </Stack>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="allergy4"
                                                    className={`
                                                        ${formCss.formCheckbox} ${formCss.minimum}`}
                                                    checked={allergy.includes(
                                                        'other'
                                                    )}
                                                    onChange={(e) =>
                                                        onChangeAllergy(
                                                            e,
                                                            'other'
                                                        )
                                                    }
                                                />
                                                <label htmlFor="allergy4">
                                                    その他
                                                </label>
                                            </div>
                                            <div className="form">
                                                <Box
                                                    sx={{
                                                        pl: '30px',
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        className={
                                                            formCss.formText
                                                        }
                                                        disabled={
                                                            !allergy.includes(
                                                                'other'
                                                            )
                                                        }
                                                    />
                                                </Box>
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                2.食事の習慣について教えて下さい。
                                                <br />
                                                ※食事を摂る時間帯を選択してて下さい。
                                            </div>
                                            <div className="form">
                                                <Stack>
                                                    <ItemInline>
                                                        <Box
                                                            sx={{
                                                                fontSize:
                                                                    '15px',
                                                                lineHeight:
                                                                    '22px',
                                                            }}
                                                        >
                                                            食事
                                                        </Box>
                                                    </ItemInline>
                                                    <ItemInline>
                                                        <input
                                                            type="checkbox"
                                                            id="meal1"
                                                            className={`
                                                        ${formCss.formCheckbox} ${formCss.minimum}`}
                                                            checked={meal.includes(
                                                                'breakfast'
                                                            )}
                                                            onChange={(e) =>
                                                                onChangeMeal(
                                                                    e,
                                                                    'breakfast'
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="meal1">
                                                            朝
                                                        </label>
                                                    </ItemInline>
                                                    <ItemInline>
                                                        <input
                                                            type="checkbox"
                                                            id="meal2"
                                                            className={`
                                                        ${formCss.formCheckbox} ${formCss.minimum}`}
                                                            checked={meal.includes(
                                                                'lunch'
                                                            )}
                                                            onChange={(e) =>
                                                                onChangeMeal(
                                                                    e,
                                                                    'lunch'
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="meal2">
                                                            昼
                                                        </label>
                                                    </ItemInline>
                                                    <ItemInline>
                                                        <input
                                                            type="checkbox"
                                                            id="meal3"
                                                            className={`
                                                        ${formCss.formCheckbox} ${formCss.minimum}`}
                                                            checked={meal.includes(
                                                                'dinner'
                                                            )}
                                                            onChange={(e) =>
                                                                onChangeMeal(
                                                                    e,
                                                                    'dinner'
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="meal3">
                                                            夕
                                                        </label>
                                                    </ItemInline>
                                                </Stack>
                                            </div>
                                            <div className="form">
                                                <Box
                                                    sx={{
                                                        pl: '50px',
                                                        fontSize: '15px',
                                                        lineHeight: '22px',
                                                    }}
                                                >
                                                    1日 {meal.length} 回
                                                </Box>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="meal4"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                />
                                                <label htmlFor="meal4">
                                                    食事時間が不規則
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="meal5"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                    checked={
                                                        dietaryRestrictions
                                                    }
                                                    onChange={() =>
                                                        setDietaryRestrictions(
                                                            !dietaryRestrictions
                                                        )
                                                    }
                                                />
                                                <label htmlFor="meal5">
                                                    食事制限あり
                                                </label>
                                            </div>
                                            <div className="form">
                                                <Box
                                                    sx={{
                                                        pl: '30px',
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        className={
                                                            formCss.formText
                                                        }
                                                        disabled={
                                                            !dietaryRestrictions
                                                        }
                                                    />
                                                </Box>
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                3.嗜好品はありますか？
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="luxury_goods1"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                />
                                                <label htmlFor="luxury_goods1">
                                                    なし
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="luxury_goods2"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                />
                                                <label htmlFor="luxury_goods2">
                                                    コーヒー・紅茶・緑茶
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="luxury_goods3"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                    checked={drinking}
                                                    onChange={() =>
                                                        setDrinking(!drinking)
                                                    }
                                                />
                                                <label htmlFor="luxury_goods3">
                                                    飲酒
                                                </label>
                                            </div>
                                            <div className="form">
                                                <MuiStack
                                                    direction="row"
                                                    alignItems="center"
                                                    spacing={2}
                                                    sx={{
                                                        pl: '30px',
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            fontSize: '15px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        回数
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            width: '70px',
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                                            disabled={!drinking}
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: '15px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        回/週
                                                    </Box>
                                                </MuiStack>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="luxury_goods4"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                    checked={luxuryGoodsOher}
                                                    onChange={() =>
                                                        setLuxuryGoodsOher(
                                                            !luxuryGoodsOher
                                                        )
                                                    }
                                                />
                                                <label htmlFor="luxury_goods4">
                                                    その他
                                                </label>
                                            </div>
                                            <div className="form">
                                                <Box
                                                    sx={{
                                                        pl: '30px',
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        className={
                                                            formCss.formText
                                                        }
                                                        disabled={
                                                            !luxuryGoodsOher
                                                        }
                                                    />
                                                </Box>
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                4.体質について教えて下さい。
                                            </div>
                                            <div className="form">
                                                <MuiStack
                                                    direction="row"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    <Box
                                                        sx={{
                                                            fontSize: '15px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        身長
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            width: '70px',
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: '15px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        cm
                                                    </Box>
                                                </MuiStack>
                                            </div>
                                            <div className="form">
                                                <MuiStack
                                                    direction="row"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    <Box
                                                        sx={{
                                                            fontSize: '15px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        体重
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            width: '70px',
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: '15px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        kg
                                                    </Box>
                                                </MuiStack>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="constitution1"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                    checked={hayFever}
                                                    onChange={() =>
                                                        setHayFever(!hayFever)
                                                    }
                                                />
                                                <label htmlFor="constitution1">
                                                    花粉症
                                                </label>
                                            </div>
                                            <div className="form">
                                                <MuiStack
                                                    direction="row"
                                                    alignItems="center"
                                                    spacing={2}
                                                    sx={{
                                                        pl: '30px',
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: '16%',
                                                            fontSize: '15px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        種類
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            width: '84%',
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                                            disabled={!hayFever}
                                                        />
                                                    </Box>
                                                </MuiStack>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="constitution2"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                />
                                                <label htmlFor="constitution2">
                                                    胃腸が弱い
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="constitution3"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                />
                                                <label htmlFor="constitution3">
                                                    下痢しやすい
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="constitution4"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                />
                                                <label htmlFor="constitution4">
                                                    便秘しやすい
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="constitution5"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                />
                                                <label htmlFor="constitution5">
                                                    風邪ひきやすい
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="constitution6"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                />
                                                <label htmlFor="constitution6">
                                                    飲み込む力が弱い
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="constitution7"
                                                    className={`
                                                    ${formCss.formCheckbox} ${formCss.minimum}`}
                                                    checked={constitutionOher}
                                                    onChange={() =>
                                                        setConstitutionOher(
                                                            !constitutionOher
                                                        )
                                                    }
                                                />
                                                <label htmlFor="constitution7">
                                                    その他
                                                </label>
                                            </div>
                                            <div className="form">
                                                <Box
                                                    sx={{
                                                        pl: '30px',
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        className={
                                                            formCss.formText
                                                        }
                                                        disabled={
                                                            !constitutionOher
                                                        }
                                                    />
                                                </Box>
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                5.日常生活や仕事で当てはまることはありますか？
                                            </div>
                                            <div className="form">
                                                <StackMulti>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="work1"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="work1">
                                                            車の運転
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="work2"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="work2">
                                                            高所作業
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="work3"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="work3">
                                                            機械作業
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="work4"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="work4">
                                                            夜間作業
                                                        </label>
                                                    </Item>
                                                </StackMulti>
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                6.
                                                女性の方にお聞きします。妊娠中もしくは授乳中(母乳)ですか？　
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="radio"
                                                    className={
                                                        formCss.formRadio
                                                    }
                                                    id="femaleStatus1"
                                                    checked={
                                                        femaleStatus ===
                                                        'pregnant'
                                                    }
                                                    onChange={() => {
                                                        setFemaleStatus(
                                                            'pregnant'
                                                        )
                                                    }}
                                                />
                                                <label htmlFor="femaleStatus1">
                                                    妊娠中
                                                </label>
                                            </div>
                                            <div className="form">
                                                <Box
                                                    sx={{
                                                        pl: '30px',
                                                        fontSize: '15px',
                                                        lineHeight: '22px',
                                                    }}
                                                >
                                                    出産予定
                                                </Box>
                                            </div>
                                            <div className="form">
                                                <MuiStack
                                                    direction="row"
                                                    alignItems="center"
                                                    spacing={2}
                                                    sx={{
                                                        pl: '30px',
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: '110px',
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                                            disabled={
                                                                femaleStatus !==
                                                                'pregnant'
                                                            }
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: '15px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        年
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            width: '60px',
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            className={`${formCss.formText} ${formCss.textCenter}`}
                                                            disabled={
                                                                femaleStatus !==
                                                                'pregnant'
                                                            }
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: '15px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        月
                                                    </Box>
                                                </MuiStack>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="radio"
                                                    className={
                                                        formCss.formRadio
                                                    }
                                                    id="femaleStatus2"
                                                    checked={
                                                        femaleStatus ===
                                                        'possibility of pregnant'
                                                    }
                                                    onChange={() => {
                                                        setFemaleStatus(
                                                            'possibility of pregnant'
                                                        )
                                                    }}
                                                />
                                                <label htmlFor="femaleStatus2">
                                                    妊娠の可能性あり
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="radio"
                                                    className={
                                                        formCss.formRadio
                                                    }
                                                    id="femaleStatus3"
                                                    checked={
                                                        femaleStatus ===
                                                        'breastfeeding'
                                                    }
                                                    onChange={() => {
                                                        setFemaleStatus(
                                                            'breastfeeding'
                                                        )
                                                    }}
                                                />
                                                <label htmlFor="femaleStatus3">
                                                    授乳中
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="radio"
                                                    className={
                                                        formCss.formRadio
                                                    }
                                                    id="femaleStatus4"
                                                    checked={
                                                        femaleStatus ===
                                                        'nothing'
                                                    }
                                                    onChange={() => {
                                                        setFemaleStatus(
                                                            'nothing'
                                                        )
                                                    }}
                                                />
                                                <label htmlFor="femaleStatus4">
                                                    該当なし
                                                </label>
                                            </div>
                                        </RegistInput>
                                    </RegistBody>
                                </RegistSection>
                                <RegistSection>
                                    <RegistHeader>
                                        <h2 className="headerTitle">
                                            他の医療機関の通院状況などについて
                                            <br />
                                            お聞きします
                                        </h2>
                                    </RegistHeader>
                                    <RegistBody>
                                        <RegistInput>
                                            <div className="label">
                                                1.本日受診した以外の他の病院・他の科におかかりですか？
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="radio"
                                                    className={
                                                        formCss.formRadio
                                                    }
                                                    id="outpatient1"
                                                    value="no"
                                                    checked={
                                                        outpatient === 'no'
                                                    }
                                                    onChange={() => {
                                                        setOutpatient('no')
                                                    }}
                                                />
                                                <label htmlFor="outpatient1">
                                                    いいえ
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="radio"
                                                    className={
                                                        formCss.formRadio
                                                    }
                                                    id="outpatient2"
                                                    value="yes"
                                                    checked={
                                                        outpatient === 'yes'
                                                    }
                                                    onChange={() => {
                                                        setOutpatient('yes')
                                                    }}
                                                />
                                                <label htmlFor="outpatient2">
                                                    はい
                                                </label>
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                医療機関名
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="text"
                                                    className={formCss.formText}
                                                    disabled={
                                                        outpatient !== 'yes'
                                                    }
                                                />
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="form">
                                                <input
                                                    type="radio"
                                                    className={
                                                        formCss.formRadio
                                                    }
                                                    id="outpatient3"
                                                    value="no"
                                                    checked={
                                                        outpatient ===
                                                        'In hospital'
                                                    }
                                                    onChange={() => {
                                                        setOutpatient(
                                                            'In hospital'
                                                        )
                                                    }}
                                                />
                                                <label htmlFor="outpatient3">
                                                    入院中
                                                </label>
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                医療機関名
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="text"
                                                    className={formCss.formText}
                                                    disabled={
                                                        outpatient !==
                                                        'In hospital'
                                                    }
                                                />
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                2.
                                                現在服用しているお薬、健康食品はありますか？
                                                (お薬手帳をお持ちの方はご提示下さい)
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="radio"
                                                    className={
                                                        formCss.formRadio
                                                    }
                                                    id="taking1"
                                                    value="no"
                                                    checked={taking === 'no'}
                                                    onChange={() => {
                                                        setTaking('no')
                                                    }}
                                                />
                                                <label htmlFor="taking1">
                                                    いいえ
                                                </label>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="radio"
                                                    className={
                                                        formCss.formRadio
                                                    }
                                                    id="taking2"
                                                    value="yes"
                                                    checked={taking === 'yes'}
                                                    onChange={() => {
                                                        setTaking('yes')
                                                    }}
                                                />
                                                <label htmlFor="taking2">
                                                    はい
                                                </label>
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">薬品名</div>
                                            <div className="form">
                                                <input
                                                    type="text"
                                                    className={formCss.formText}
                                                    disabled={taking !== 'yes'}
                                                />
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                3.現在治療中の病気を選択してください。
                                            </div>
                                            <div className="form">
                                                <StackMulti>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment1"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment1">
                                                            高血圧
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment2"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment2">
                                                            糖尿病
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment3"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment3">
                                                            脂質異常症
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment4"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment4">
                                                            喘息
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment5"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment5">
                                                            狭心症・心筋梗塞
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment6"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment6">
                                                            不整脈
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment7"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment7">
                                                            心不全
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment8"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment8">
                                                            胃潰瘍
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment9"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment9">
                                                            十二指腸潰瘍
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment10"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment10">
                                                            前立腺疾患
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment11"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment11">
                                                            腎障害
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment12"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment12">
                                                            腎不全
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment13"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment13">
                                                            肝臓病
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment14"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment14">
                                                            緑内障
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment15"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment15">
                                                            脳梗塞
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="underTreatment16"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="underTreatment16">
                                                            認知症
                                                        </label>
                                                    </Item>
                                                </StackMulti>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="underTreatment17"
                                                    className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                    checked={underTreatmentOher}
                                                    onChange={() =>
                                                        setUnderTreatmentOher(
                                                            !underTreatmentOher
                                                        )
                                                    }
                                                />
                                                <label htmlFor="underTreatment17">
                                                    その他
                                                </label>
                                            </div>
                                            <div className="form">
                                                <Box
                                                    sx={{
                                                        pl: '30px',
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        className={
                                                            formCss.formText
                                                        }
                                                        disabled={
                                                            !underTreatmentOher
                                                        }
                                                    />
                                                </Box>
                                            </div>
                                        </RegistInput>
                                        <RegistInput>
                                            <div className="label">
                                                4.過去に治療していた病気を選択してください。
                                            </div>
                                            <div className="form">
                                                <StackMulti>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment1"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment1">
                                                            高血圧
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment2"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment2">
                                                            糖尿病
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment3"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment3">
                                                            脂質異常症
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment4"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment4">
                                                            喘息
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment5"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment5">
                                                            狭心症・心筋梗塞
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment6"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment6">
                                                            不整脈
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment7"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment7">
                                                            心不全
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment8"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment8">
                                                            胃潰瘍
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment9"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment9">
                                                            十二指腸潰瘍
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment10"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment10">
                                                            前立腺疾患
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment11"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment11">
                                                            腎障害
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment12"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment12">
                                                            腎不全
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment13"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment13">
                                                            肝臓病
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment14"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment14">
                                                            緑内障
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment15"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment15">
                                                            脳梗塞
                                                        </label>
                                                    </Item>
                                                    <Item>
                                                        <input
                                                            type="checkbox"
                                                            id="pastTreatment16"
                                                            className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                        />
                                                        <label htmlFor="pastTreatment16">
                                                            認知症
                                                        </label>
                                                    </Item>
                                                </StackMulti>
                                            </div>
                                            <div className="form">
                                                <input
                                                    type="checkbox"
                                                    id="pastTreatment17"
                                                    className={`${formCss.formCheckbox} ${formCss.minimum}`}
                                                    checked={pastTreatmentOher}
                                                    onChange={() =>
                                                        setPastTreatmentOher(
                                                            !pastTreatmentOher
                                                        )
                                                    }
                                                />
                                                <label htmlFor="pastTreatment17">
                                                    その他
                                                </label>
                                            </div>
                                            <div className="form">
                                                <Box
                                                    sx={{
                                                        pl: '30px',
                                                    }}
                                                >
                                                    <input
                                                        type="text"
                                                        className={
                                                            formCss.formText
                                                        }
                                                        disabled={
                                                            !pastTreatmentOher
                                                        }
                                                    />
                                                </Box>
                                            </div>
                                        </RegistInput>
                                    </RegistBody>
                                </RegistSection>
                                <RegistSection>
                                    <RegistHeader>
                                        <h2 className="headerTitle">
                                            その他気になることがございましたら
                                            <br />
                                            ご記入ください
                                        </h2>
                                    </RegistHeader>
                                    <RegistBody>
                                        <RegistInput>
                                            <div className="form">
                                                <textarea
                                                    rows={4}
                                                    className={
                                                        formCss.formTextarea
                                                    }
                                                    placeholder="薬局へ伝えることがある場合は入力してください。"
                                                ></textarea>
                                            </div>
                                        </RegistInput>
                                    </RegistBody>
                                </RegistSection>
                            </Regist>
                        </Box>
                        <div className="main-btm">
                            <ul className="main-link">
                                <li>
                                    <SubmitButton>登録する</SubmitButton>
                                </li>
                            </ul>
                        </div>
                    </form>
                </main>
            </DefaultLayout>
        </>
    )
}

export default QuestionInputPage
