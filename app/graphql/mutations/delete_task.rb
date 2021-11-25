module Mutations
  class DeleteTask < BaseMutation
    field :task,   Types::TaskType, null: true

    argument :id, ID, required: true

    def resolve(id: nil)
      user = context[:user]
      return if user.nil?

      task = Task.where(user_id: user['id']).find(id)
      task.destroy!
      {
        task: task
      }
    end
  end
end
