module Mutations
  class UpdateTask < BaseMutation
    field :task,   Types::TaskType, null: true

    argument :id,          ID,     required: true
    argument :title,       String, required: false
    argument :description, String, required: false
    argument :deadline,    String, required: false

    def resolve(**args)
      task = Task.find(args[:id])
      task.update!(args.except(:id))
      {
        task: task
      }
    end
  end
end
