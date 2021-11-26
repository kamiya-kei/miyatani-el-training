module Resolvers
  class Users < GraphQL::Schema::Resolver
    type [Types::UserType], null: false

    def resolve
      User.all
    end
  end
end
