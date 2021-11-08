module Mutations
  class DeleteTask < BaseMutation
    field :task,   Types::TaskType, null: true
    field :result, Boolean,         null: true

    argument :id, ID, required: true

    def resolve(id: nil)
      task = Task.find_by(id: id)
      task&.destroy
      {
        task: task,
        result: task.present? && task.errors.blank?
      }
    end
  end
end
