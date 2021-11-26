module Mutations
  class UpdateTask < BaseMutation
    field :task,   Types::TaskType, null: true

    argument :id,              ID,     required: true
    argument :title,           String, required: false
    argument :description,     String, required: false
    argument :deadline,        String, required: false
    argument :done_id,         ID,     required: false
    argument :priority_number, Int,    required: false
    argument :label_ids,       [ID],   required: false

    def resolve(id:, label_ids: [], **args)
      user = context[:user]
      return if user.nil?

      task = Task.where(user_id: user.id).find(id)
      task.update!(args)
      task.reset_labels(label_ids)
      {
        task: task
      }
    end
  end
end
