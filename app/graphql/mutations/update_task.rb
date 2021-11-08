module Mutations
  class UpdateTask < BaseMutation
    field :task,   Types::TaskType, null: true
    field :result, Boolean,         null: true

    argument :id,          ID,     required: true
    argument :title,       String, required: false
    argument :description, String, required: false

    def resolve(**args)
      task = Task.find_by_id(args[:id])
      task&.update(args.except(:id))
      {
        task: task,
        result: task.present? && task.errors.blank?
      }
    end
  end
end
