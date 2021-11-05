module Mutations
  class CreateTask < BaseMutation
    field :task, Types::TaskType, null: false

    argument :title,       String, required: true
    argument :description, String, required: false

    def resolve(**args)
      task = Task.create(args)
      {
        task: task,
        result: task.errors.blank?
      }
    end
  end
end
