module Resolvers
  class UserSignedIn < GraphQL::Schema::Resolver
    type Types::UserType, null: true

    def resolve
      context[:user]
    end
  end
end
