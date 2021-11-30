module Mutations
  class SetLabel < BaseMutation
    # タスクにラベルを設定・解除するMutation
    field :task_label, Types::TaskLabelType, null: false

    argument :task_id,  ID,      required: true
    argument :label_id, ID,      required: true
    argument :checked,  Boolean, required: true

    def resolve(task_id:, label_id:, checked:)
      authenticate_user!

      # タスク・食べるがログイン中のユーザーのものか確認
      current_user.tasks.find(task_id)
      current_user.labels.find(label_id)

      if checked
        task_label = TaskLabel.create!(task_id: task_id, label_id: label_id)
      else
        task_label = TaskLabel.find_by(task_id: task_id, label_id: label_id)
        task_label.destroy!
      end
      { task_label: task_label }
    end
  end
end
