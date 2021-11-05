module Types
  class MutationType < Types::BaseObject
    field :update_task, mutation: Mutations::UpdateTask
    field :create_task, mutation: Mutations::CreateTask
  end
end
