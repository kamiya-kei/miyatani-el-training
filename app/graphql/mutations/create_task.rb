module Mutations
  class CreateTask < BaseMutation
    field :task,   Types::TaskType, null: false

    argument :title,       String, required: true
    argument :description, String, required: false
    argument :deadline,    String, required: false
    argument :done,        ID,     required: false

    def resolve(**args)
      task = Task.create!(
        args.except(:done)
            .merge(done_id: args[:done])
      )
      {
        task: task
      }
    end
  end
end
