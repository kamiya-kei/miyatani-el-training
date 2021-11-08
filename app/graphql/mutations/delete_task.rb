module Mutations
  class DeleteTask < BaseMutation
    field :task, Types::TaskType, null: false

    argument :id,          ID,     required: true

    def resolve(id: nil)
      task = Task.find(id)
      task.destroy
      {
        task: task,
        result: task.errors.blank?
      }
    end
  end
end
