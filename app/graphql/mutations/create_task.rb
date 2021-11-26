module Mutations
  class CreateTask < BaseMutation
    field :task,   Types::TaskType, null: false

    argument :title,           String, required: true
    argument :description,     String, required: false
    argument :deadline,        String, required: false
    argument :done_id,         ID,     required: false
    argument :priority_number, Int,    required: false
    argument :label_ids,       [ID],   required: false

    def resolve(label_ids: [], **args)
      user = context[:user]
      return if user.nil?

      task = Task.create!(args.merge(user_id: user['id']))
      task.reset_labels(label_ids)
      {
        task: task
      }
    end
  end
end
