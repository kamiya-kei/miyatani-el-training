module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :task, TaskType, null: true do
      argument :id, ID, required: true
    end
    def task(id:)
      Task.find(id)
    end
    field :tasks, resolver: Resolvers::Tasks
  end
end
