# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_25_012311) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tasks", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "deadline"
    t.integer "done_id", default: -1, null: false
    t.integer "priority_number", default: 0, null: false
    t.bigint "user_id"
    t.index ["user_id", "created_at"], name: "index_tasks_on_user_id_and_created_at"
    t.index ["user_id", "deadline"], name: "index_tasks_on_user_id_and_deadline"
    t.index ["user_id", "done_id"], name: "index_tasks_on_user_id_and_done_id"
    t.index ["user_id", "priority_number"], name: "index_tasks_on_user_id_and_priority_number"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "role_id", default: 0, null: false
    t.index ["name"], name: "index_users_on_name", unique: true
  end

end
