module Mutations
  class CreateTask < BaseMutation
    field :task,   Types::TaskType, null: false

    argument :title,       String, required: true
    argument :description, String, required: false
    argument :deadline,    String, required: false
    argument :done_id,     ID,     required: false

    def resolve(**args)
      task = Task.create!(args)
      {
        task: task
      }
    end
  end
end
