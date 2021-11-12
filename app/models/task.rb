class Task < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :done

  validates :title, presence: true
  validates :done_id, inclusion: { in: Done.pluck(:id) }
end
