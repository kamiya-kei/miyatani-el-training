module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :tasks, [Types::TaskType], null: false
    field :task_count, Int, null: false
    def task_count
      object.tasks.count
    end
  end
end
