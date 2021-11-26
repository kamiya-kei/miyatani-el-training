module Types
  class LabelType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :user_id, Integer, null: false
    field :user, UserType, null: false
    field :tasks, [TaskType], null: false
    field :tasks_count, Int, null: false
    def tasks_count
      object.tasks.size
    end
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
