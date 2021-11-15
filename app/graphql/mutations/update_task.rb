module Mutations
  class UpdateTask < BaseMutation
    field :task,   Types::TaskType, null: true

    argument :id,          ID,     required: true
    argument :title,       String, required: false
    argument :description, String, required: false
    argument :deadline,    String, required: false
    argument :done,        ID,     required: false

    def resolve(**args)
      task = Task.find(args[:id])
      task.update!(
        args.except(:id)
            .transform_keys(done: :done_id)
      )
      {
        task: task
      }
    end
  end
end
