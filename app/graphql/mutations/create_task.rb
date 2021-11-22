module Mutations
  class CreateTask < BaseMutation
    field :task,   Types::TaskType, null: false

    argument :title,           String, required: true
    argument :description,     String, required: false
    argument :deadline,        String, required: false
    argument :done_id,         ID,     required: false
    argument :priority_number, Int,    required: false

    def resolve(**args)
      task = Task.create!(
        args.merge(user_id: User.first.id) # TODO: ログイン機能実装後修正
      )
      {
        task: task
      }
    end
  end
end
