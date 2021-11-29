module Mutations
  class DeleteTask < BaseMutation
    field :task,   Types::TaskType, null: true

    argument :id, ID, required: true

    def resolve(id: nil)
      authenticate_user!

      task = current_user.tasks.find(id)
      task.destroy!
      {
        task: task
      }
    end
  end
end
