class AddDoneToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :done_id, :integer, null: false, default: -1
  end
end
