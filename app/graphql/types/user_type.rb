module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :role, RoleType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :tasks, [Types::TaskType], null: false
    field :tasks_count, Int, null: false
    def tasks_count
      object.tasks.size
    end
  end
end
