class Label < ApplicationRecord
  has_many :task_labels, dependent: :destroy
  has_many :tasks, through: :task_labels
  belongs_to :user

  with_options presence: true do
    validates :user_id
    validates :name, uniqueness: { scope: :user_id }
  end
end
