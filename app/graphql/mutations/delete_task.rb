module Mutations
  class DeleteTask < BaseMutation
    field :task,   Types::TaskType, null: true

    argument :id, ID, required: true

    def resolve(id: nil)
      task = Task.find(id: id)
      task.destroy!
      {
        task: task
      }
    end
  end
end
