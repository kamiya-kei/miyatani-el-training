class TaskLabel < ApplicationRecord
  belongs_to :task
  belongs_to :label

  with_options presence: true do
    validates :task_id
    validates :label_id, uniqueness: { scope: :task_id }
  end
end
