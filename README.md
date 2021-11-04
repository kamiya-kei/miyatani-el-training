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
