# テーブル設計

## usersテーブル

| Column             | Type   | Options     |
| ------------------ | ------ | ----------- |
| name               | string | null: false |
| email              | string | null: false |
| encrypted_password | string | null: false |


Association

* has_many :tasks

## tasksテーブル

| Column             | Type     | Options     |
| ------------------ | -------- | ----------- |
| title              | string   | null: false |
| description        | text     |             |
| deadline           | datetime |             |
| done               | integer  | null: false |
| priority_number    | integer  | null: false |
| user_id            | integer  | null: false |
| label_id           | integer  | null: false |

Association

* belongs_to: user
* has_many  : task_labels

## labels

| Column             | Type   | Options     |
| ------------------ | ------ | ----------- |
| name               | string | null: false |

Association

* has_many  : task_labels

## task_labels

| Column             | Type    | Options     |
| ------------------ | ------- | ----------- |
| task_id            | string  | null: false |
| label_id           | integer | null: false |


Association

* belongs_to: task
* belongs_to: label

# デプロイの方法

```zsh
heroku login
heroku create アプリ名
heroku addons:create heroku-postgresql:hobby-dev # Postgresを使えるようにする
git push heroku master
heroku run rails db:migrate
heroku open

```

# 開発環境

* ruby 3.0.2
* Rails 6.1.4.1
  * react-rails 2.6
  * graphql 1.12
* React 17.0
  * MUI(Material-UI) v5
