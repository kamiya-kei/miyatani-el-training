class AddUserReferenceToTasks < ActiveRecord::Migration[6.1]
  def change
    add_reference :tasks, :user
    remove_index :tasks, :created_at
    remove_index :tasks, :deadline
    remove_index :tasks, :done_id
    add_index :tasks, %i(user_id created_at)
    add_index :tasks, %i(user_id deadline)
    add_index :tasks, %i(user_id done_id)
    add_index :tasks, %i(user_id priority_number)
  end
end
