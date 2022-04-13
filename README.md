# MPP:薬局パレットライン ミニアプリ
＜開発環境＞ Next.js + TypeScript + Material UI

| ディレクトリ1 | ディレクトリ2 | ディレクトリ3 | 内容 |
|:-----------|:-----------|:-----------|:--------------------------|
| /public/ |  |  | 静的ファイル（img, iconなど） |
| /src/ | api/ |  | 簡易API（*.ts） |
|  | components/ | atoms/ | パーツコンポーネント（*.tsx, *.module.scss） |
|  |  | organisms/ | 機能があるコンポーネント（*.tsx, *.module.scss） |
|  |  | templates/ | ページのレイアウト（*.tsx） |
|  | hooks/ |  | カスタムフック（*.tsx） |
|  | libs/ |  | UIライブラリなどの設定ファイル（*.js, ...） |
|  | pages/ |  | Next.jsのページ（*.tsx） |
|  | providers/ |  | グローバル変数定義（*.tsx） |
|  | stores/ |  | ステート管理（*.ts） |
|  | styles/ |  | グローバルスタイル（*.scss） |
|  | types/ |  | カスタムタイプ宣言（*.ts） |
|  | utilities/ |  | 共通ファンクション（*.ts） |


## ルーティング
| カテゴリ | パス | 対応画面 |
|:-----------|:-----------|:-----------|
| ログイン | `/login/phone` | Login-1-3#1.携帯電話番号入力時パスコード入力画面 |
|  | `/login/mail` | Login-1-3#2.メールアドレス入力時パスコード入力画面 |
| 会員登録（携帯電話選択） | `/register/phone/policy` | Reg-2.規約同意画面 |
|  | `/register/phone/push` | Reg-3-1-1.携帯電話番号入力画面 |
|  | `/register/phone/code` | Reg-3-1-3.登録コード入力画面(携帯電話番号) |
| 会員登録（メールアドレス選択） | `/register/mail/policy` | Reg-2.規約同意画面 |
|  | `/register/mail/push` | Reg-3-2-1.メールアドレス入力画面 |
|  | `/register/mail/code` | Reg-3-2-3.登録コード入力画面(メール) |
| 会員登録（共通） | `/register/input` | Reg-4-1.携帯電話番号登録時ライフパレット会員登録画面 |
|  | `/register/secret` | Reg-4-2.秘密の質問登録画面 |
|  | `/register/finish` | Reg-4-4.会員登録完了画面 |
|  | `/register/family` | Reg-5.家族登録選択画面 |
|  | `/register/family/add/[id]` | Reg-6.家族情報登録画面 |
|  | `/register/pharmacy` | OEM-Reg-7#3.利用薬局検索 |
|  | `/register/pharmacy/detail/[pharmacyid]` | 利用薬局詳細画面 |
|  | `/register/cooperation` | OEM-Reg-8-2.薬局連携画面(薬局OEM) |
|  | `/register/finish/all` | OEM-Reg-8-3.全項目登録完了画面(薬局OEM) |
| 登録変更 | `/login/mail/change` | MP-xxx.メールアドレス変更画面​ |
|  | `/login/mail/change/view2` |  |
|  | `/login/mail/change/view3` |  |
|  | `/login/mail/change/view4` |  |
|  | `/login/mail/change/view5` |  |
|  | `/login/phone/change` | MP-xxx.電話番号変更画面​ |
|  | `/login/phone/change/view2` |  |
|  | `/login/phone/change/view3` |  |
|  | `/login/phone/change/view4` |  |
|  | `/login/phone/change/view5` |  |
| ホーム | `/home` | MP-A-1#2.ホーム画面 |
|  | `` |  |
| メッセージ | `/message` | MPP-B-1.メッセージメニュー画面 |
|  | `/message/prescription` | MPP-B-2-1.あなたへのメッセージ一覧 |
|  | `/message/prescription/detail/[messageid]` | MPP-B-2-2.あなたへのメッセージ |
| 利用薬局 | `/my-pharmacy/initial` | MPP-B-3-1.(かかりつけ薬局)利用薬局未登録時追加画面 |
|  | `/my-pharmacy` | MPP-B-3-2.利用薬局一覧画面 |
|  | `/my-pharmacy/message/[pharmacyid]` |  |
|  | `/my-pharmacy/settings` | MPP-B-3-4-1.利用薬局管理画面 |
|  | `/my-pharmacy/settings/edit` | ※削除画面 |
|  | `/my-pharmacy/add` | MPP-B-3-4-2.利用薬局追加画面 |
|  | `/my-pharmacy/detail/[pharmacyid]` | MPP-B-3-5.利用薬局詳細画面 |
|  | `/my-pharmacy/detail/[pharmacyid]/share` | MPP-B-3-6.利用薬局情報共有設定画面 |
| 家族管理 | `/family` | MPP-D-1.家族管理画面 |
|  | `/family/watching-family` | ※見守り家族タブ |
|  | `/family/[familyid]` | MPP-D-2-1.家族情報画面 |
|  | `/family/[familyid]/edit` | MPP-D-2-2.家族情報編集画面 |
|  | `/family/add` | MPP-D-3-1.家族追加画面 |
| 見守り家族 | `/family/watching-family/code` | MPP-D-1-2.家族登録用コード発行画面 |
|  | `/family/watching-family/lists` | MPP-D-4.あなたを見守るご家族一覧 |
|  | `/family/watching-family/push` | MPP-D-5.家族招待コード入力画面 |
|  | `` |  |
| オンライン服薬指導 | `/online` | MPP-SRA-A-1.申込一覧画面・お申込み履歴 |
|  | `/online/application` | MPP-SRA-B-1.申込サービス選択画面 |
|  | `/online/application/service/[serviceId]` | MPP-SRA-B-2.申込サービス詳細説明画面 |
|  | `/online/application/pharmacy` | MPP-SRA-B-3.薬局選択画面 |
|  | `/online/application/pharmacy/lists` | MPP-SRA-B-4.利用薬局リスト画面 |
|  | `/online/application/pharmacy/search` | MPP-SRA-B-5-1.薬局検索画面 |
|  | `/online/application/pharmacy/detail/[pharmacyId]` | MPP-SRA-B-5-2.薬局詳細画面 |
|  | `/online/application/patient` | MPP-SRA-B-6.利用者選択画面 |
|  | `/online/application/patient/input` | MPP-SRA-B-7.利用者基本情報入力画面 |
|  | `/online/application/detail` | MPP-SRA-B-8.申込み情報登録画面 |
|  | `/online/application/calendar` | MPP-SRA-B-9-1#1-1.希望日選択画面 |
|  | `/online/application/calendar/timetable/[dateId]` | MPP-SRA-B-9-1#1-2.希望時間枠選択画面 |
|  | `/online/application/payment` | MPP-SRA-B-9-1#2-1.支払方法登録画面 |
|  | `/online/application/insurance` | MPP-SRA-B-9-1#3.保険証登録画面 |
|  | `/online/application/insurance/camera` | 保険証登録画面 > 撮影 |
|  | `（初回フェーズでない）` | MPP-SRA-B-10.質問票登録画面 |
|  | `/online/application/finish` | MPP-SRA-B-11.申込み完了画面 |
|  | `/online/detail/[applicationId]` | MPP-SRA-C-1.申込詳細画面 |
|  | `/online/video/test` | MPP-SRA-D-1.ビデオ通話テスト案内画面 |
|  | `/online/video/test/preview` | MPP-SRA-D-2.ビデオ通話テスト画面 |
|  | `/settings/payment` | MPP-SET-SRA-1.お支払い情報画面 |
|  | `/settings/payment/credit` | MPP-SET-SRA-2.クレジットカード変更画面 |
