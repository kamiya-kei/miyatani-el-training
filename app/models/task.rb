class Task < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :done

  validates :title, presence: true
  validates :done_id, inclusion: { in: Done.pluck(:id) }
  validates :priority_number, inclusion: { in: [0, 1, 2] }

  def self.search(word:, target:, done_ids:, sort_type:, is_asc:)
    sort_key = sort_type.underscore # スネークケースに変換
    sort_val = is_asc ? 'ASC' : 'DESC'
    Task.
      where(done_id: done_ids).
      search_word("%#{word}%", target).
      order(sort_key => sort_val)
  end

  scope :search_word, ->(word_ptn, target) do
    case target
    when 'all'
      where('title LIKE ? OR description LIKE ?', word_ptn, word_ptn)
    when 'title'
      where('title LIKE ?', word_ptn)
    when 'description'
      where('description LIKE ?', word_ptn)
    end
  end
end
