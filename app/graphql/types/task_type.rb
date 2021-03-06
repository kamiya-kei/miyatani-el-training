module Types
  class TaskType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :description, String, null: false
    field :done, DoneType, null: false
    field :done_id, ID, null: false
    field :priority_number, Int, null: false
    field :labels, [Types::LabelType], null: false
    field :deadline, GraphQL::Types::ISO8601DateTime, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
