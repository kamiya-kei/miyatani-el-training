class AddRoleToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :role_id, :integer, null: false, default: 0
  end
end
