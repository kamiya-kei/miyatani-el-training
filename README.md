# 研修課題(el-training)

el-training の[カリキュラム内容](https://github.com/kamiya-kei/miyatani-el-training/blob/main/docs/el-training.md)を Rails+React(TypeScript)+Graphql で行いました。

- URL: https://miyatani-el-training.herokuapp.com/
- テストアカウント
  - 【一般ユーザー】 ユーザー名: `test`, パスワード: `abc123`
  - 【管理ユーザー】 ユーザー名: `admin`, パスワード: `abc123`

# テーブル設計

## users テーブル

| Column             | Type    | Options     |
| ------------------ | ------- | ----------- |
| name               | string  | null: false |
| email              | string  | null: false |
| encrypted_password | string  | null: false |
| role_id            | integer | null: false |

Association

- has_many :tasks
- has_many :labels
- belongs_to :role (ActiveHash)

## tasks テーブル

| Column          | Type     | Options     |
| --------------- | -------- | ----------- |
| title           | string   | null: false |
| description     | text     |             |
| deadline        | datetime |             |
| done_id         | integer  | null: false |
| priority_number | integer  | null: false |
| user_id         | integer  | null: false |
| label_id        | integer  | null: false |

Association

- belongs_to: user
- has_many : task_labels
- belongs_to :done (ActiveHash)

## labels

| Column  | Type    | Options     |
| ------- | ------- | ----------- |
| name    | string  | null: false |
| user_id | integer | null: false |

Association

- has_many : task_labels
- belongs_to :user

## task_labels

| Column   | Type    | Options     |
| -------- | ------- | ----------- |
| task_id  | string  | null: false |
| label_id | integer | null: false |

Association

- belongs_to: task
- belongs_to: label

# デプロイの方法

```zsh
heroku login
heroku create アプリ名
heroku addons:create heroku-postgresql:hobby-dev # Postgresを使えるようにする
# Buildpacksにheroku/nodejsを追加し、heroku/rubyをheroku/nodejsの下にする
#  (package.jsonでnodejsのバージョン指定をする為)
git push heroku master
heroku run rails db:migrate
heroku open

```

# 開発環境

- ruby 3.0.2
- Rails 6.1.4.1
  - react-rails 2.6
  - graphql 1.12
- React 17.0
  - MUI(Material-UI) v5
