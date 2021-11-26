class Task < ApplicationRecord
  belongs_to :user
  has_many :task_labels, dependent: :destroy
  has_many :labels, through: :task_labels
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :done

  validates :title, presence: true
  validates :done_id, inclusion: { in: Done.pluck(:id) }
  validates :priority_number, inclusion: { in: [0, 1, 2] }

  def reset_labels(label_ids)
    self.task_labels.destroy_all
    return if label_ids.blank?
    self.task_labels.create(
      label_ids.map { |id| { label_id: id } }
    )
  end

  def self.search(word:, target:, done_ids:, sort_type:, is_asc:, label_id:)
    sort_key = sort_type.underscore # スネークケースに変換
    sort_val = is_asc ? 'ASC' : 'DESC'
    Task.
      filter_by_done_ids(done_ids).
      filter_by_label(label_id).
      search_word("%#{word}%", target).
      order(sort_key => sort_val)
  end

  scope :search_word, ->(word_ptn, target) do
    return if ['', '%%'].include?(word_ptn) # 検索ワード空文字の場合検索不要

    case target
    when 'all'
      where('title LIKE ? OR description LIKE ?', word_ptn, word_ptn)
    when 'title'
      where('title LIKE ?', word_ptn)
    when 'description'
      where('description LIKE ?', word_ptn)
    end
  end

  scope :filter_by_done_ids, ->(done_ids) do
    return if done_ids.count == 3 # 全てのステータスの場合フィルタリング不要

    where(done_id: done_ids)
  end

  scope :filter_by_label, ->(label_id) do
    return if label_id.blank? # 空の場合フィルタリング不要

    where(id: TaskLabel.where(label_id: label_id).pluck(:task_id))
  end
end
