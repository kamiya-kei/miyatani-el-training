module Types
  class QueryType < Types::BaseObject
    include GraphqlHelper
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
      authenticate_admin!
      User.find(id)
    end
    field :users, resolver: Resolvers::Users
    field :user_signed_in, resolver: Resolvers::UserSignedIn

    field :label, LabelType, null: true do
      argument :id, ID, required: true
    end
    def label(id:)
      Label.find(id)
    end
    field :labels, resolver: Resolvers::Labels
  end
end
