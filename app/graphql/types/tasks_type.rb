module Types
  class TasksType < Types::BaseObject
    field :tasks,    [Types::TaskType], null: false
    field :count,    Int,               null: false
    field :max_page, Int,               null: false
  end
end
