module Mutations
  class CreateTask < BaseMutation
    field :task,   Types::TaskType, null: false

    argument :title,           String, required: true
    argument :description,     String, required: false
    argument :deadline,        String, required: false
    argument :done_id,         ID,     required: false
    argument :priority_number, Int,    required: false

    def resolve(**args)
      user = context[:user]
      return if user.nil?

      task = Task.create!(
        args.merge(user_id: user['id'])
      )
      {
        task: task
      }
    end
  end
end
