class AddIndexToTasks < ActiveRecord::Migration[6.1]
  def change
    add_index :tasks, :created_at
    add_index :tasks, :deadline
    add_index :tasks, :done_id
  end
end
