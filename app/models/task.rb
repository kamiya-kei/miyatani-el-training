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

  def self.search(user_id, options)
    params = self.search_params(options)
    Task.where(user_id: user_id).
      filter_by_label(params[:label_id]).
      filter_by_done_ids(params[:done_ids]).
      search_word("%#{params[:word]}%", params[:target]).
      order(params[:sort_type] => (params[:is_asc] ? 'ASC' : 'DESC'))
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

    where(id: TaskLabel.where(label_id: label_id).select(:task_id))
  end

  def self.search_params(options)
    {
      word: options.fetch(:word, ''),
      target: options.fetch(:target, 'all'),
      done_ids: options.fetch(:done_ids, [-1, 0, 1]),
      sort_type: options.fetch(:sort_type, 'created_at'),
      is_asc: options.fetch(:is_asc, false),
      label_id: options.fetch(:label_id, nil)
    }
  end
end
