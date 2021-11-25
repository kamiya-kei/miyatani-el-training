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

    field :user, UserType, null: true do
      argument :id, ID, required: true
    end
    def user(id:)
      user = context[:user]
      return if user.nil? # TODO: 管理者権限の確認

      User.find(id)
    end
    field :users, resolver: Resolvers::Users
    field :user_signed_in, resolver: Resolvers::UserSignedIn
  end
end
